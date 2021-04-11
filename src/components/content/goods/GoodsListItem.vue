<template>
  <div class="goods-item" @click="itemClick">
    <!--  @load 是在vue里通过load函数可以监听图片加载完成  -->
    <img :src="goodsItem.show.img" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      // 监听图片加载完成
      imageLoad() {
        // console.log('imageLoad');
        /**
         * $bus 事件总线。
         * 类似Vuex，
         * Vuex是状态管理，事件总线是事件管理
         * emit 发射出一个事件，然后在别的地方使用 on 接收
         */
        this.$bus.$emit('itemImageLoad')
      },
      // 监听每个商品的点击事件，跳转到详情页
      itemClick() {
        // console.log('跳转到详情页');
        /**
         *  使用push路由跳转，因为有返回上一页功能
         *  使用动态路由，/detail/:iid。
         *  在点击该商品时拿到此商品iid
         */
        this.$router.push('/detail/' + this.goodsItem.iid)

      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 45%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
