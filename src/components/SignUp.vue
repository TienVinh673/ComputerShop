<template>
    <form @submit.prevent="register">
      <h1>Đăng ký</h1>
      <label for="hovaten">Họ và Tên</label>
      <input v-model="infoSignUp.hovaten" type="text" id="hovaten" />
      <br /><br />
  
      <label for="tenDangNhap">Tên đăng nhập</label>
      <input v-model="infoSignUp.tenDangNhap" type="text" id="tenDangNhap" />
      <br /><br />

      <label for="password">Mật khẩu</label>
      <input v-model="infoSignUp.password" type="password" id="password" />
      <br /><br />
  
      <label for="confirmPassword">Nhập lại mật khẩu</label>
      <input v-model="infoSignUp.confirmPassword" type="password" id="confirmPassword" />
      <br /><br />
  
      <button type="submit">Đăng ký</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        infoSignUp: {
          hovaten: "",
          tenDangNhap: "",
          password: "",
          confirmPassword: "",
        },
        users: JSON.parse(localStorage.getItem("user")) || []
      };
    },
    methods: {
      register() {
        const { hovaten, tenDangNhap, password, confirmPassword } = this.infoSignUp;
        if (hovaten == "" || tenDangNhap == "" || password == "" || confirmPassword == "") {
          alert("Vui lòng nhập thông tin đầy đủ");
          return;
        }
        if (password !== confirmPassword) {
          alert("Vui lòng nhập mật khẩu trùng khớp");
          return;
        }
        const newUser = {
          fullName : hovaten,
          userName: tenDangNhap,
          password : password
        };
        this.users.push(newUser);
        localStorage.setItem("user", JSON.stringify(this.users));
        alert("Đăng ký thành công!");
        this.$router.push('/signIn');
        this.infoSignUp = {
          hovaten: "",
          tenDangNhap: "",
          password: "",
          confirmPassword: "",
        };
      },
    },
  };
  </script>  
<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
form {
  width: 500px;
  display: inline-block;
  padding: 30px;
  margin: 30px 0px;
  border-radius: 10px;
  background: linear-gradient(
    145deg,
    rgb(112, 234, 13),
    rgb(239, 239, 3),
    rgb(2, 247, 198)
  );
}
form input,
button {
  display: block;
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  font-size: 26px;
  padding-left: 10px;
}
form label {
  float: left;
  font-size: 24px;
  font-weight: bold;
}
button {
  background: orange;
}
button:hover {
  transform: scale(0.9);
  cursor: pointer;
  background: red;
  transition: 0.5s;
}
</style>
