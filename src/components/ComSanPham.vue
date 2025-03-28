<template>
  <div class="main-container">
    <div class="product-container">
      <!-- Sidebar Lọc -->
      <div class="sidebar">
        <h3>Tìm kiếm</h3>
        <div>
          <label>Hãng:</label>
          <select v-model="danhMucChon" @change="locSanPham">
            <option value="">Tất cả</option>
            <option value="lenovo">Lenovo</option>
            <option value="acer">Acer</option>
          </select>
        </div>
        <div style="margin-top: 15px">
          <label>Tên sản phẩm:</label>
          <input
            type="text"
            v-model="tenSanPham"
            @input="locSanPham"
            placeholder="Tìm kiếm theo tên..."
          />
        </div>
        <div style="margin-top: 15px">
          <label>Giá: {{ giaToiDa.toLocaleString() }} đ</label>
          <input
            type="range"
            min="0"
            max="50000000"
            v-model="giaToiDa"
            @input="locSanPham"
          />
        </div>
      </div>

      <!-- Danh sách sản phẩm -->
      <div class="product-list">
        <h2>{{ danhMucChon || "Tất cả sản phẩm" }}</h2>
        <div class="product-grid">
          <template v-if="currentProducts.length > 0">
            <div
              v-for="sanPham in currentProducts"
              :key="sanPham.id"
              class="product-card"
            >
              <img
                :src="sanPham.hinhAnh"
                :alt="sanPham.ten"
                class="product-image"
              />
              <h3>{{ sanPham.ten }}</h3>
              <p>{{ sanPham.moTa }}</p>
              <p class="price">{{ sanPham.gia.toLocaleString() }} đ</p>
              <div class="quantity-control">
                <button @click="giamSoLuong(sanPham)">-</button>
                <span>{{ sanPham.soLuong || 0 }}</span>
                <button @click="tangSoLuong(sanPham)">+</button>
              </div>
              <button class="add-to-cart" @click="themVaoGioHang(sanPham)">
                Thêm vào giỏ hàng
              </button>
            </div>
          </template>
          <div v-else>
            <p>Không tìm thấy sản phẩm phù hợp.</p>
          </div>
        </div>

        <!-- Phân trang -->
        <div class="pagination" v-if="totalPages > 1">
          <button @click="prevPage" :disabled="currentPage === 1">
            &laquo;
          </button>
          <span
            v-for="page in totalPages"
            :key="page"
            :class="['page-number', { active: page === currentPage }]"
            @click="goToPage(page)"
            >{{ page }}</span
          >
          <button @click="nextPage" :disabled="currentPage === totalPages">
            &raquo;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      danhMucChon: "",
      tenSanPham: "",
      giaToiDa: 50000000,
      currentPage: 1,
      itemsPerPage: 4,
      sanPhams: [
        {
          id: 1,
          ten: "Laptop gaming Lenovo LOQ 15IAX9",
          moTa: "i5-12450HX,16GB,512GB SSD, RTX 4050",
          gia: 24490000,
          hinhAnh: require("@/assets/san_pham/san_pham_1.png"),
          danhMuc: "lenovo",
          soLuong: 0,
        },
        {
          id: 2,
          ten: "Laptop gaming Acer Predator Helios Neo PHN16",
          moTa: "i5-13500HX,8GB,512GB SSD, RTX 4050",
          gia: 34990000,
          hinhAnh: require("@/assets/san_pham/san_pham_2.png"),
          danhMuc: "acer",
          soLuong: 0,
        },
        {
          id: 3,
          ten: "Laptop gaming Lenovo Legion 5 15IRX9 83JJ000FVN",
          moTa: "i7-13650H,24GB,512GB SSD, RTX 4060",
          gia: 37990000,
          hinhAnh: require("@/assets/san_pham/san_pham_3.png"),
          danhMuc: "lenovo",
          soLuong: 0,
        },
        {
          id: 4,
          ten: "Laptop gaming Acer Nitro 5",
          moTa: "i5-13420H,8GB,512GB SSD, GTX 2050",
          gia: 18990000,
          hinhAnh: require("@/assets/san_pham/san_pham_4.png"),
          danhMuc: "acer",
          soLuong: 0,
        },
        {
          id: 5,
          ten: "Laptop gaming Lenovo LOQ 15ARP9",
          moTa: "R5-7235HS,24GB,512GB SSD, RTX 3050",
          gia: 21490000,
          hinhAnh: require("@/assets/san_pham/san_pham_5.png"),
          danhMuc: "lenovo",
          soLuong: 0,
        },
        {
          id: 6,
          ten: "Laptop gaming Acer Aspire 7 A715 42G R05G",
          moTa: "R5-5500H,8GB,512GB SSD, RTX 1650",
          gia: 13990000,
          hinhAnh: require("@/assets/san_pham/san_pham_6.png"),
          danhMuc: "acer",
          soLuong: 0,
        },
        {
          id: 7,
          ten: "Laptop gaming Lenovo Legion Pro 5 16IRX9",
          moTa: "i9-14900HX,32GB,1TB SSD, RTX 4060",
          gia: 27990000,
          hinhAnh: require("@/assets/san_pham/san_pham_7.png"),
          danhMuc: "lenovo",
          soLuong: 0,
        },
        {
          id: 8,
          ten: "Laptop gaming Acer Swift X14 SFX14 71G 78SY",
          moTa: "i7-13700H,32GB,1TB SSD, GTX 4050",
          gia: 39990000,
          hinhAnh: require("@/assets/san_pham/san_pham_8.png"),
          danhMuc: "acer",
          soLuong: 0,
        },
      ],
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },
    filteredProducts() {
      return this.sanPhams.filter((sanPham) => {
        const dungDanhMuc = this.danhMucChon
          ? sanPham.danhMuc.toLowerCase() === this.danhMucChon.toLowerCase()
          : true;
        const dungTen = this.tenSanPham
          ? sanPham.ten.toLowerCase().includes(this.tenSanPham.toLowerCase())
          : true;
        const dungGia = sanPham.gia <= this.giaToiDa;
        return dungDanhMuc && dungTen && dungGia;
      });
    },
    currentProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProducts.slice(start, end);
    },
  },
  methods: {
    locSanPham() {
      this.currentPage = 1;
    },
    tangSoLuong(sanPham) {
      sanPham.soLuong++;
    },
    giamSoLuong(sanPham) {
      if (sanPham.soLuong > 0) sanPham.soLuong--;
    },
    themVaoGioHang(sanPham) {
      const user = JSON.parse(localStorage.getItem("user")); // Lấy thông tin người dùng từ localStorage
      if (!user) {
        alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
        this.$router.push("/signIn"); // Chuyển hướng người dùng tới trang đăng nhập nếu chưa đăng nhập
        return;
      }
      if (sanPham.soLuong > 0) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const index = cart.findIndex((item) => item.id === sanPham.id);
        if (index !== -1) {
          cart[index].soLuong += sanPham.soLuong;
        } else {
          cart.push({ ...sanPham });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Sản phẩm đã được thêm vào giỏ hàng!");
        sanPham.soLuong = 0; // Reset số lượng sau khi thêm
      } else {
        alert("Vui lòng chọn số lượng sản phẩm!");
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goToPage(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style scoped>
.main-container {
  background-color: #c0f686;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  max-width: 1200px;
}

.product-container {
  display: flex;
  gap: 20px;
}

.sidebar {
  width: 280px;
  padding: 25px;
  background-color: #f8f8f8;
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
}

.product-list {
  flex: 1;
  display: flex;
  flex-direction: column; /* Đặt sản phẩm và phân trang theo chiều dọc */
}

.product-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product-card {
  width: calc(33.333% - 20px);
  border: 1px solid #ddd;
  padding: 15px;
  text-align: center;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.price {
  color: red;
  font-weight: bold;
  margin-bottom: 10px;
}

.quantity-control {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.add-to-cart {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #8b4513;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.add-to-cart:hover {
  background-color: #a0522d;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center; /* Căn giữa phân trang */
  gap: 5px;
}

.page-number {
  padding: 5px 10px;
  cursor: pointer;
  border: 1px solid #a0522d;
  border-radius: 3px;
}

.page-number.active {
  background-color: #a0522d;
  color: white;
}

.pagination button {
  padding: 5px 10px;
  background-color: #a0522d;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 3px;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.sidebar div {
  margin-bottom: 15px; /* Tạo khoảng cách giữa các phần tử trong sidebar */
}
</style>
