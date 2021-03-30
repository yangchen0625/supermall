<template>
<!-- 导航栏（页面顶部） -->
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
  /*
    NavBar导航组件使用 flex弹性布局
    关于 flex 教学详见：http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html
  */
  .nav-bar {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    /*
      box-shadow用法
        box-shadow: h-shadow v-shadow blur spread color inset;
          h-shadow	必需。水平阴影的位置。允许负值
          v-shadow	必需。垂直阴影的位置。允许负值
          blur	可选。模糊距离
          spread	可选。阴影的尺寸
          color	可选。阴影的颜色。请参阅 CSS 颜色值
          inset	可选。将外部阴影 (outset) 改为内部阴影。
    */
    box-shadow: 0 1px 1px 1px rgba(100, 100, 100, .1);
  }

  .left, .right {
    width: 60px;
  }

  .center {
    flex: 1;   /*默认填满中间*/
  }
</style>
