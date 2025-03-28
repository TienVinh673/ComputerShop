<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>STT</th>
          <th>Tên sản phẩm</th>
          <th>Giá</th>
          <th>Hình ảnh</th>
          <th>Số lượng</th>
          <th>Xóa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cart" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.ten || 'Tên không xác định' }}</td>
          <td>{{ item.gia ? item.gia.toLocaleString() + 'đ' : 'Không xác định' }}</td>
          <td>
            <img :src="item.hinhAnh || 'default-image.png'" alt="Hình sản phẩm" />
          </td>
          <td>
            <input
              type="number"
              min="1"
              v-model.number="item.soLuong"
              @change="capNhatSoLuong(index, item.soLuong)"
            />
          </td>
          <td @click="xoaSanPham(index)">Xóa</td>
        </tr>
      </tbody>
    </table>

    <!-- Phần tổng tiền và thanh toán -->
    <div v-if="cart.length > 0" class="checkout-section">
      <p><strong>Tổng tiền: {{ tongTien.toLocaleString() }}đ</strong></p>
      <button @click="thanhToan" class="checkout-button">Thanh Toán</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: [], // Giỏ hàng
    };
  },
  computed: {
    tongTien() {
      return this.cart.reduce(
        (tong, item) => tong + (item.gia || 0) * (item.soLuong || 1),
        0
      );
    },
  },
  mounted() {
    this.taiDuLieuGioHang(); // Tải dữ liệu giỏ hàng khi component được mount
  },
  methods: {
    taiDuLieuGioHang() {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      this.cart = storedCart.map(item => ({
        ten: item.ten || 'Tên không xác định',
        gia: item.gia || 0,
        hinhAnh: item.hinhAnh || '',
        soLuong: item.soLuong || 1
      }));
    },
    capNhatSoLuong(index, soLuongMoi) {
      if (soLuongMoi <= 0) {
        this.xoaSanPham(index);
      } else {
        this.cart[index].soLuong = soLuongMoi;
        this.capNhatLocalStorage();
      }
    },
    xoaSanPham(index) {
      this.cart.splice(index, 1);
      this.capNhatLocalStorage();
    },
    capNhatLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    thanhToan() {
      alert(
        `Cảm ơn bạn đã mua hàng! Tổng tiền của bạn là ${this.tongTien.toLocaleString()}đ.`
      );
      this.cart = [];
      this.capNhatLocalStorage();
    },
  },
};
</script>

<style scoped>
/* Tổng quát */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  text-align: left;
  background-color: #f9f9f9;
}

/* Đầu bảng */
thead {
  background-color: #4CAF50;
  color: white;
}

thead th {
  padding: 10px;
  border: 1px solid #ddd;
}

/* Dòng dữ liệu */
tbody tr {
  border: 1px solid #ddd;
  transition: background-color 0.3s ease;
}

tbody tr:hover {
  background-color: #f1f1f1;
}

tbody,
thead {
  text-align: center;
}

tbody td {
  padding: 10px;
  border: 1px solid #ddd;
}

/* Ảnh */
td img {
  width: 100px;
  height: auto;
  border-radius: 5px;
}

/* Input số lượng */
td input {
  width: 50px;
  height: 30px;
  padding: 5px;
  font-size: 16px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
}

td:last-child {
  text-align: center;
  color: #ff0000;
  font-weight: bold;
  cursor: pointer;
}

td:last-child:hover {
  text-decoration: underline;
}

td,
th {
  font-size: 24px;
}

/* Phần thanh toán */
.checkout-section {
  margin-top: 20px;
  text-align: right;
}

.checkout-button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.checkout-button:hover {
  background-color: #45a049;
}
</style>
