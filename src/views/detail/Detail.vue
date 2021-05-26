<template>
<!-- 详情页组件 -->
  <div class="detail">
    <!--  导航栏  -->
    <detail-nav-bar></detail-nav-bar>
    <scroll class="content">
      <!--  详情页轮播图  -->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <!--  商品基本信息  -->
      <detail-base-info :goods="goodsInfo"></detail-base-info>
      <!--  店家信息  -->
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <!--  商品图片  -->
      <detail-image-info :detail-info="detailInfo"></detail-image-info>
      <!--  商品参数  -->
      <detail-params-info :param-info="itemParams"></detail-params-info>
    </scroll>

  </div>
</template>

<script>
  import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
  import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
  import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
  import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
  import DetailImageInfo from "@/views/detail/childComps/DetailImageInfo";
  import DetailParamsInfo from "@/views/detail/childComps/DetailParamsInfo";

  import Scroll from "@/components/common/scroll/Scroll";

  import {getDetail, Goods, GoodsParams, Shop} from "@/network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailImageInfo,
      DetailParamsInfo,

      Scroll
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goodsInfo: {},
        shopInfo: {},
        detailInfo: {},
        itemParams: {},
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
        this.goodsInfo = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)

        //3.创建店铺信息对象
        this.shopInfo = new Shop(res.result.shopInfo)

        //4.取出详情信息
        this.detailInfo = res.result.detailInfo;

        //5.取出尺寸参数信息
        this.itemParams = new GoodsParams(res.result.itemParams.info, res.result.itemParams.rule || {});
      })


    }
  }
</script>

<style scoped>
  .detail {
    height: 100vh;
    background-color: #fff;
    position: relative;
    z-index: 1;
  }

  .content {
    background-color: #fff;
    height: calc(100% - 44px);
  }
</style>
