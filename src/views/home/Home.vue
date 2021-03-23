<template>
  <div id="home">
    <!-- 导航栏   -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 轮播图 -->
    <home-swiper :banners="banners"></home-swiper>
    <!--  推荐信息  -->
    <recommend-view :recommends="recommends"></recommend-view>
    <router-view></router-view>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "@/views/home/childComps/RecommendView";

  import {getHomeMultidata} from "@/network/home"; //没有default导出，就需要{}引入

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView
    },
    // 将网络请求拿到的数据res保存起来
    // 可以去浏览器中Vue Devtools插件查看data里的result是否真正保存了数据
    data() {
      return {
        // result: null,
        banners: [],
        recommends: []
      }
    },
    // 使用生命周期函数，等首页组件创建完后，发送网络请求
    created() {
      // 1.请求多个数据
      getHomeMultidata().then(res => {
        // 将请求的数据赋给data里定义好的result变量（若不赋值，res的内容会被回收）
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: white;
  }
</style>
