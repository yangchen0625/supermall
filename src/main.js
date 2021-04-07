import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 声明一个$bus原型，赋值为Vue实例。（Vue实例可以做为事件总线）
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
