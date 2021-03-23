<template>
  <div class="goods">
    <!--  遍历goods，把每一个商品赋给GoodsItem组件里的data  -->
    <goods-list-item v-for="item in goods" :goods-item="item"></goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from "@/components/content/goods/GoodsListItem";

  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props: {
      // 此处拿到的是 goods[type].list, 数组类型
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    /*padding: 2px;*/
  }

</style>
