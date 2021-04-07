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
      },
      // BSrcoll的 上拉加载更多 选项
      // pullUpLoad: {
      //   type: Boolean,
      //   default: false
      // }
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
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      // 2.监听滚动的位置
      this.scroll.on('scroll', (position) => {
        // console.log(position);
        // 发出一个自定义事件，谁想用就可以直接使用
        this.$emit('scroll', position)
      })

      //3.监听上拉事件
      // this.scroll.on('pullingUp',() => {
      //   // console.log('上拉加载更多');
      //   // 将上拉加载更多事件传出去，告诉别的组件做（上拉加载更多）动作
      //   this.$emit('pullingUp')
      // })
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
      },
      finishPullUp() {
        // BScroll原生方法 finishPullUp 完成上拉加载
        this.scroll.finishPullUp()
      },
      refresh() {
        // BScroll原生方法 refresh，刷新界面
        // 增加一个判断，防止refresh()找不到报错
        // console.log('---');
        this.scroll && this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>
