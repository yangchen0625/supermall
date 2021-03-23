<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  //父传子,接收App.vue中 tab-bar-item 组件里的path
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
      // isActive: true
    }
  },
  computed: {
    isActive() {
      // 拿到当前活跃路由的path，将其与当前页面的path比较（即上方props里拿到的的path），若一致，则表示点击了当前路由，isActive为true
      return this.$route.path.indexOf(this.path) !== -1
      // return this.$route.path === this.path
    },
    activeStyle() {
      // 先拿到isActive，看当前路由是不是活跃，若是，则将color的值赋为上方props里动态获取的activeColor
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path).catch(err => {console.log(err)})
    }
  }
}
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
  }

</style>
