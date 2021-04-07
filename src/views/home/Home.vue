<template>
  <div id="home">
    <!-- 导航栏   -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <!--  使用better-scroll实现滚动  -->
    <!-- probe-type="3" 表示实时监听
         @scroll表示拿到Scroll里的自定义事件，监听滚动的位置-->
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true">
<!--            @pullingUp="loadMore">-->
      <!-- 轮播图 -->
      <home-swiper :banners="banners"></home-swiper>
      <!--  推荐信息  -->
      <recommend-view :recommends="recommends"></recommend-view>
      <!--  热卖信息  -->
      <feature-view></feature-view>
      <!--    流行，新款，精选    -->
      <!--  @tabClick 监听TabControl里的自定义事件。相当于 v-on:tabClick   -->
      <tab-control class="tab-control"
                   :titles="['流行','新款','精选']"
                   @tabClick="tabClick">
      </tab-control>
      <!--  商品信息  -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!--  返回顶部按钮  -->
    <!--  直接监听该组件的点击
          .native 监听组件根元素的原生事件 （组件本身不能直接被监听）-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

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
  import BackTop from "@/components/content/backTop/BackTop";

  import Scroll from "@/components/common/scroll/Scroll";

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
      GoodsListItem,
      BackTop,
      Scroll
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
        currentType: 'pop', // 默认为pop
        isShowBackTop: false //判断返回顶部按钮的显示与隐藏
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
    mounted() {
      const refresh = this.debounce(this.$refs.scroll.refresh, 100)
      // 监听GoodListItem中发射到事件总线中的 图片加载完成 事件
      this.$bus.$on('itemImageLoad', () => {
        // 调用Scroll.vue中的refresh()方法
        // this.$refs.scroll && this.$refs.scroll.refresh()
        refresh()
      })
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
      // 防抖动函数
      debounce(func, delay) {
        let timer = null
        return function(...args) {
          if (timer) {
            clearTimeout(timer)
          }
          timer = setTimeout(() => {
            func.apply(this, args)
          }, delay)
        }
      },
      // TableControl.vue中发出的自定义事件
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
      // 返回顶部，组件监听方法
      backClick() {
        /**
         *  通过给组件设置ref属性，可以拿到该组件对象
         *  拿到Scroll.vue中data里的scroll
         *  第一个scroll是ref中的，第二个scroll是子组件data里的,第三个scrollTo是调用方法
         */
        // this.$refs.scroll.scroll.scrollTo(0, 0, 500)
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      // 自定义事件，监听滚动的位置
      contentScroll(position) {
        this.isShowBackTop = (-position.y) > 1000
      },
      // 自定义事件，上拉加载更多
      // loadMore() {
      //   // console.log('上拉加载更多');
      //   this.getHomeGoods(this.currentType)
      //   this.$refs.scroll.scroll.refresh()
      // },
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
          // 在把数据加载完后，使用BScroll里的finishPullUp方法，才能进行下一次加载（这里finishPullUp方法已经在Scroll组件里封装好）
          // this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
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

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  margin-top: 44px;*/
  /*  overflow: hidden;*/
  /*}*/
</style>
