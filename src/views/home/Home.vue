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
    <!--  热卖信息  -->
    <feature-view></feature-view>
    <tab-control class="tab-control"
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick">
    <!--  @tabClick 监听TabControl里的自定义事件。相当于 v-on:tabClick   -->
    </tab-control>
    <!--  商品信息  -->
    <goods-list :goods="showGoods"></goods-list>
    <ui>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
    </ui>
    <router-view></router-view>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "@/views/home/childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import TabControl from "@/components/content/tabControl/TabControl";
  import GoodsList from "@/components/content/goods/GoodsList";
  import GoodsListItem from "@/components/content/goods/GoodsListItem";

  import {getHomeMultidata, getHomeGoods} from "@/network/home"; //没有default导出，就需要{}引入

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      GoodsListItem
    },
    // 将网络请求拿到的数据res保存起来
    // 可以去浏览器中Vue Devtools插件查看data里的result是否真正保存了数据
    data() {
      return {
        // result: null,
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop' // 默认为pop
      }
    },
    // 使用生命周期函数，等首页组件创建完后，发送网络请求
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    computed: {
      // 点击不同商品类别，显示不同商品信息
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /**
       * 事件监听相关的方法
      */
      tabClick(index) {
        // console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },

      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // 将请求的数据赋给data里定义好的result变量（若不赋值，res的内容会被回收）
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        /*
        *   对于已经存在的属性和方法，用 . 和[] 得到的结果一致
        *   对于不存在的属性和方法，用 . 会创造这个新的属性或方法、
        *   而用 [] 的方式访问不会创建新的属性和方法
        * */
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // 将res结果中的list数据赋给data中goods里对应的list
          this.goods[type].list.push(...res.data.list)
          // 每次该类型（type）多一种数据，page + 1
          this.goods[type].page += 1
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
</style>
