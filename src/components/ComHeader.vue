<template>
  <div class="header-container">
    <header class="header">
      <div class="container">
        <!-- Logo -->
        <div class="logo">
          <img src="@/assets/logo.png" alt="Computer Logo" />
        </div>

        <!-- Navigation -->
        <nav>
          <ul>
            <li><router-link to="/">Trang Chủ</router-link></li>
            <li><router-link to="/sanpham">Sản Phẩm</router-link></li>
            <li><router-link to="/gioithieu">Giới Thiệu</router-link></li>
          </ul>
        </nav>

        <!-- CTA (Cart and User Info) -->
        <div class="cta">
  <div class="cart-login-wrapper">
    <!-- Cart Icon -->
    <span class="cart-icon">
      <router-link to="/cart" style="text-decoration: none; font-size: 40px;">🛒</router-link>
    </span>
    <span class="cart-count"></span>

    <!-- User Info -->
    <div v-if="currentUser">
      <span class="user-info">Xin chào, {{ currentUser.name }}</span>
      <button @click="dangXuat" class="cta-button">Đăng Xuất</button>
    </div>
    <div v-else>
      <router-link to="/signIn" class="cta-button">Đăng Nhập</router-link>
      <router-link to="/signUp" class="cta-button">Đăng Ký</router-link>
         </div>
        </div>
       </div>
      </div>
    </header>

    <!-- Main Content -->
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentUser: JSON.parse(localStorage.getItem("user")) || null, // Người dùng hiện tại
    };
  },
  methods: {
    dangXuat() {
      localStorage.removeItem("currentUser");
      this.currentUser = null;
      this.$router.push("/signIn");
    },
  },
};
</script>

<style scoped>
.header-container {
  width: 100%;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #17bf4ca2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo img {
  height: 150px;
}

nav ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

nav ul li {
  margin: 0 15px;
}

nav ul li a {
  text-decoration: none;
  color: #000;
  font-weight: bold;
  transition: color 0.3s ease;
}

nav ul li a:hover {
  color: #fcb034;
}

.cta-button {
  padding: 10px 20px;
  background-color: #fcb034;
  color: #fff;
  border-radius: 25px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  text-decoration: none;
  border: none;
  cursor: pointer;
}

.cta-button:hover {
  background-color: #ffa726;
  transform: scale(1.1);
}

.cart-login-wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
}

.cart-button {
  position: relative;
  padding: 5px 10px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.2rem;
}

.cart-count {
  position: absolute;
  top: -5px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.8rem;
}
</style>
