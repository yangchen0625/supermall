<template>
  <tab-bar>
    <!--   activeColor 设置该组件活跃时的颜色，默认为红色  -->
    <tab-bar-item path="/home" activeColor="red">
      <img slot="item-icon" src="~@/assets/img/tabbar/home.svg">
      <img slot="item-icon-active" src="~@/assets/img/tabbar/home_active.svg">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img slot="item-icon" src="~@/assets/img/tabbar/category.svg">
      <img slot="item-icon-active" src="~@/assets/img/tabbar/category_active.svg">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="item-icon" src="~@/assets/img/tabbar/shopcart.svg">
      <img slot="item-icon-active" src="~@/assets/img/tabbar/shopcart_active.svg">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="item-icon" src="~@/assets/img/tabbar/profile.svg">
      <img slot="item-icon-active" src="~@/assets/img/tabbar/profile_active.svg">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  /*文件名起了别名，可以不加 @/ */
  import TabBar from "@/components/common/tabbar/TabBar";
  import TabBarItem from "@/components/common/tabbar/TabBarItem";

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
