    <template>
    <form @submit.prevent="login" action="">
        <h1>Đăng nhập</h1>
        <label for="">Tên đăng nhập</label>
        <input v-model="userName" type="text" id="username" />
        <br>
        <label for="">Mật khẩu</label>
        <input v-model="password" type="text" id="password" />
        <br>
        <button type="submit">Đăng nhập</button>
        <a href=""><router-link to="/signUp">Tạo tài khoản</router-link></a>
    </form>
    </template>

    <script>
    export default {
        data(){
            return{
                user : JSON.parse(localStorage.getItem("user")) || [],
                userName : '',
                password : '',
            }
        },
        methods:{
            login() {
  let exist = this.user.find(user => {
    return user.userName === this.userName && user.password === this.password;
  });
  if (exist) {
    localStorage.setItem("user", JSON.stringify(exist));  // Lưu thông tin người dùng vào localStorage
    alert("Đăng nhập thành công");
    this.currentUser = exist; // Cập nhật thông tin người dùng hiện tại
    this.$router.push('/');  // Chuyển hướng đến trang chủ hoặc trang mong muốn
  } else {
    alert("Tên Đăng nhập hoặc mật khẩu không tồn tại");
  }
}
        }
    };
    </script>

    <style scoped>
    *{padding: 0;margin: 0;box-sizing: border-box;}
    form{
        max-width: 400px;
        border-radius: 10px;
        background: rgb(3, 203, 244);
        margin: 40px auto;
        text-align: left;
        padding:10px 20px;
        line-height: 50px;
    }
    h1{
        text-align: center;
    }
    input,button{
        width: 100%;
        height: 40px;
        border:none;
        outline: none;
        font-size: 20px;
        padding-left: 10px;
    }
    button{
        margin-top:40px;
        cursor: pointer;
        background: orange;
        border-radius: 8px;
        font-size: 24px;
    }
    label{
        font-size: 20px;
        font-weight: bold;
    }
    a{
        text-decoration: none;
        display: flex;
        justify-content: center;
    }
    </style>
