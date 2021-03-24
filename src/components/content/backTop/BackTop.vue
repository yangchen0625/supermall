<template>
  <div class="back-top" @Click="backClick">
    <img src="~assets/img/common/top.png">
  </div>
</template>

<script>
export default {
  name: "BackTop",
  methods: {
    backClick() {

    }
  }
}
</script>

<style scoped>
  .back-top {
    position: fixed;
    right: 8px;
    bottom: 55px;
  }
  .back-top img {
    width: 60px;
    height: 60px;
  }
</style>
