<template>
<!-- 不推荐使用document方式拿属性。推荐使用ref，在相应的元素上添加 ref="wrapper" -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll";

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      // 1.创建BScroll对象
      // 不推荐使用document方式拿属性。推荐使用ref，在相应的元素上添加 ref="wrapper"
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true, //设置为true，里面的div才能监听点击
        probeType: this.probeType
      })
      // 2.监听滚动的位置
      this.scroll.on('scroll', (position) => {
        // console.log(position);
        // 发出一个自定义事件，谁想用就可以直接使用
        this.$emit('scroll', position)
      })
    },
    methods: {
      /**
       * 封装一个scrollTo方法，用于返回页面顶部
       * 原生的 scrollTo(x, y, time, easing, extraTransform, isSlient)
       * @param x
       * @param y
       * @param time
       */
      scrollTo(x, y, time = 500) {
        this.scroll.scrollTo(x, y, time)
      }
    }
  }
</script>

<style scoped>

</style>
