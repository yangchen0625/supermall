<template>
  <div id="detail">
    <!--  导航栏  -->
    <detail-nav-bar></detail-nav-bar>
    <!--  详情页轮播图  -->
    <detail-swiper :top-images="topImages"></detail-swiper>
  </div>
</template>

<script>
  import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
  import DetailSwiper from "@/views/detail/childComps/DetailSwiper";

  import {getDetail} from "@/network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper
    },
    data() {
      return {
        iid: null,
        topImages: [],
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
      })
    }
  }
</script>

<style scoped>

</style>
