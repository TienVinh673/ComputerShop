<template>
  <div class="about-page">
    <!-- Section: Về Chúng Tôi -->
    <section class="about-us">
      <h2>Về Chúng Tôi</h2>
      <p>Trang web bán Laptop uy tín hàng đầu</p>
    </section>

    <!-- Section: Đội Ngũ -->
    <section class="team">
      <h3>Đội Ngũ Của Chúng Tôi</h3>
      <div class="team-content">
        <img src="@/assets/team-photo.png" alt="Team Photo" />
        <p>
          Giàu kinh nghiệm và luôn luôn lắng nghe mọi yêu cầu của khách hàng
        </p>
      </div>
    </section>

    <!-- Section: Giá Trị Cốt Lõi -->
    <section class="core-values">
      <h3>Giá Trị Cốt Lõi</h3>
      <div class="values">
        <div class="value-card">
          <i class="fas fa-coffee"></i>
          <h4>Chất Lượng</h4>
          <p>Cam kết luôn có sản phẩm mới nhất</p>
        </div>
        <div class="value-card">
          <i class="fas fa-heart"></i>
          <h4>Đam Mê</h4>
          <p>Luôn luôn làm việc với sự nhiệt tình</p>
        </div>
        <div class="value-card">
          <i class="fas fa-users"></i>
          <h4>Phục Vụ</h4>
          <p>Luôn lắng nghe và đáp ứng mọi nhu cầu của khách hàng</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "ComGioiTh",
};
</script>

<style scoped>
.about-page {
  text-align: center;
  color: #5a3824; /* màu nâu gần giống với mẫu */
  background-color: #f5f5f5; /* Đặt màu nền cho toàn bộ trang */
  padding: 20px;
}

.banner img {
  width: 100%;
  height: auto;
}

.about-us {
  margin-top: 20px;
  background-color: #f9f9f9; /* Màu nền cho phần 'Về Chúng Tôi' */
  padding: 20px;
  border-radius: 8px;
}

.about-us h2 {
  font-size: 2em;
  color: #5a3824;
}

.about-us p {
  font-size: 1.2em;
  color: #a5694f;
}

.team {
  margin: 40px 0;
  background-color: #b5f5c5; /* Màu nền cho phần 'Đội Ngũ' */
  padding: 20px;
  border-radius: 8px;
}

.team-content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.team-content img {
  width: 60%;
  border-radius: 10px;
  margin-bottom: 20px;
}

.core-values {
  margin: 40px 0;
  background-color: #9af1a5; /* Màu nền cho phần 'Giá Trị Cốt Lõi' */
  padding: 20px;
  border-radius: 8px;
}

.values {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.value-card {
  background: #aff3aa;
  padding: 20px;
  border-radius: 10px;
  width: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.value-card i {
  font-size: 2em;
  color: #5a3824;
  margin-bottom: 10px;
}

.value-card h4 {
  font-size: 1.2em;
  color: #5a3824;
}

.value-card p {
  font-size: 0.9em;
  color: #a5694f;
}
</style>
