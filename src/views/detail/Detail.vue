<template>
<!-- 详情页组件 -->
  <div id="detail">
    <!--  导航栏  -->
    <detail-nav-bar></detail-nav-bar>
    <!--  详情页轮播图  -->
    <detail-swiper :top-images="topImages"></detail-swiper>
    <!--  商品基本信息  -->
    <detail-base-info :goods="goods"></detail-base-info>
    <!--  店家信息  -->
    <detail-shop-info :shop="shop"></detail-shop-info>
  </div>
</template>

<script>
  import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
  import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
  import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
  import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";

  import {getDetail, Goods, Shop} from "@/network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {}
      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid
      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        console.log(res);
        //1.获取顶部轮播图数据
        this.topImages = res.result.itemInfo.topImages

        //2.获取商品信息
        this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)

        //3.创建店铺信息对象
        this.shop = new Shop(res.result.shopInfo)
      })


    }
  }
</script>

<style scoped>

</style>
