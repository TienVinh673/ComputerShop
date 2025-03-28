<template>
  <div class="home-container">
    <!-- Thêm hình ảnh với kích thước tùy chỉnh -->
    <img src="@/assets/home.png" alt="Home Image" class="home-image" />

    <!-- Danh sách sản phẩm với background thu hẹp -->
    <div class="product-container">
      <h1>TẤT CẢ SẢN PHẨM</h1>
      <Product v-for="item in products" :key="item.id" :product="item" />
    </div>
  </div>
</template>

<style scoped>
.home-image {
  max-width: 100%; /* Đảm bảo ảnh không vượt quá chiều rộng của container */
  height: auto; /* Giữ tỉ lệ khung hình */
  display: block;
  margin: 0 auto; /* Canh giữa ảnh nếu cần */
}

.home-container {
  background-color: #aff3aa; /* Màu nền bao quanh phần chính của trang */
  padding: 20px;
}

.product-container {
  background-color: #e89667; /* Màu nền của phần tử chứa sản phẩm */
  padding: 20px;
  margin: 0 auto; /* Canh giữa phần tử sản phẩm */
  width: 60%; /* Thu hẹp chiều rộng của background sản phẩm */
  border-radius: 8px; /* Tùy chọn bo góc */
}
</style>

<script>
import Product from './ComProduct.vue'
import items from '../data/items'
export default {
  name: 'ComHome',
  components: {
    Product
  },
  data() {
    return {
      products: items
    }
  }
}
</script>
