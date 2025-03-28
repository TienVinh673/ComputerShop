import { createWebHistory,createRouter } from "vue-router";
import Home from '@/components/ComHome.vue'
import SanPham from '@/components/ComSanPham.vue'
import GioiThieu from '@/components/ComGioiTh.vue'
import ComCart from "@/components/ComCart.vue";
import SignIn from "@/components/SignIn.vue";
import SignUp from "@/components/SignUp.vue";
const routes=[
    // đối tượng trang chủ
    {
        path:"/",
        name:"Home",
        component:Home
    },
    // đường link ko phải là trang chủ path:"/ten"
    {
        path:"/sanpham",
        name:"SanPham",
        component:SanPham
    },
    {
        path:"/gioithieu",
        name:"GioiThieu",
        component:GioiThieu
    },
    {
        path:"/cart",
        name:"gioHang",
        component:ComCart
    },
    {
        path : '/signIn',
        name : "dangNhap",
        component: SignIn
    },
    {
        path : '/signUp',
        name : "dangKy",
        component: SignUp
    }
]
// tạo đối tượng router
const router=createRouter({
    history:createWebHistory(),
    routes
})
export default router