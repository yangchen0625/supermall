import Vue from 'vue'
import VueRouter from "vue-router";

//懒加载
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')

//1.安装插件
Vue.use(VueRouter)

//2.创建router对象
const routes = [
  {
    path: '/',
    name: '首页',
    redirect: '/home'
  },
  {
    path: '/home',
    name: '首页',
    component: Home
  },
  {
    path: '/category',
    name: '分类',
    component: Category
  },
  {
    path: '/cart',
    name: '购物车',
    component: Cart
  },
  {
    path: '/profile',
    name: '个人',
    component: Profile
  },
  {
    path: '/detail/:iid', // 动态路由，进到详情页面时拿到该商品iid
    name: '详情',
    component: Detail
  }
]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default router
