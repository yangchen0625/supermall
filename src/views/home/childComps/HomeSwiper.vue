<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  // import Swiper from "@/components/common/swiper/Swiper";
  // import SwiperItem from "@/components/common/swiper/SwiperItem";
  import {Swiper, SwiperItem} from '@/components/common/swiper'

  export default {
    name: "HomeSwiper",
    props: {
       banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLoad() {
        // 虽然有四张轮播图，但使事件只发送一次
        if (!this.isLoad) {
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>

</style>
