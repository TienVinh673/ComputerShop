<template>
    <div class="checkout-container">
      <h2>Giỏ Hàng</h2>
      
      <!-- Kiểm tra nếu giỏ hàng trống -->
      <div v-if="gioHang.length === 0">
        <p>Giỏ hàng của bạn hiện đang trống.</p>
      </div>
  
      <!-- Hiển thị giỏ hàng nếu có sản phẩm -->
      <div v-else>
        <table class="cart-table">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Tổng cộng</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in gioHang" :key="item.id">
              <td>{{ item.ten }}</td>
              <td>{{ item.gia.toLocaleString() }} đ</td>
              <td>
                <button @click="giamSoLuong(item)">-</button>
                {{ item.soLuong }}
                <button @click="tangSoLuong(item)">+</button>
              </td>
              <td>{{ (item.gia * item.soLuong).toLocaleString() }} đ</td>
              <td><button @click="xoaSanPham(item)">Xóa</button></td>
            </tr>
          </tbody>
        </table>
  
        <!-- Tổng tiền và nút thanh toán -->
        <div class="cart-summary">
          <p><strong>Tổng tiền:</strong> {{ tongTien.toLocaleString() }} đ</p>
          <button @click="thanhToan" class="checkout-button">Thanh Toán</button>
        </div>
        
        <!-- Thông báo thanh toán thành công -->
        <p v-if="thongBao" class="success-message">{{ thongBao }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        gioHang: [], // Giỏ hàng
        thongBao: '' // Thông báo thanh toán
      };
    },
    computed: {
      // Tính tổng tiền cho giỏ hàng
      tongTien() {
        return this.gioHang.reduce((tong, item) => tong + item.gia * item.soLuong, 0);
      }
    },
    methods: {
      // Hàm tăng số lượng sản phẩm
      tangSoLuong(item) {
        item.soLuong++;
      },
      // Hàm giảm số lượng sản phẩm
      giamSoLuong(item) {
        if (item.soLuong > 1) {
          item.soLuong--;
        } else {
          this.xoaSanPham(item);
        }
      },
      // Xóa sản phẩm khỏi giỏ hàng
      xoaSanPham(item) {
        this.gioHang = this.gioHang.filter((sanPham) => sanPham.id !== item.id);
      },
      // Hàm xử lý thanh toán
      thanhToan() {
        if (this.gioHang.length > 0) {
          this.thongBao = "Thanh toán thành công!";
          this.gioHang = []; // Xóa giỏ hàng sau khi thanh toán
        } else {
          this.thongBao = "Giỏ hàng của bạn đang trống.";
        }
      }
    },
    mounted() {
      // Lấy dữ liệu giỏ hàng từ localStorage hoặc API (nếu có)
      const cartData = JSON.parse(localStorage.getItem("gioHang")) || [];
      this.gioHang = cartData;
    },
    watch: {
      // Lưu lại giỏ hàng vào localStorage mỗi khi thay đổi
      gioHang: {
        handler(newCart) {
          localStorage.setItem("gioHang", JSON.stringify(newCart));
        },
        deep: true
      }
    }
  };
  </script>
  
  <style scoped>
  .checkout-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .cart-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .cart-table th, .cart-table td {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }
  
  .cart-summary {
    margin-top: 20px;
    text-align: right;
  }
  
  .checkout-button {
    padding: 10px 20px;
    background-color: #fcb034;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .checkout-button:hover {
    background-color: #ffa726;
  }
  
  .success-message {
    color: green;
    margin-top: 10px;
  }
  </style>
  