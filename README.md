# supermall(yc的个人学习项目)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 项目目录
```
--- src
	--- assests
	--- common
	--- components
	--- network
	--- router
	--- store
	--- views
	--- App.vue
	--- main.js


特别说明
--- components
     --- common  完全公共的组件，也可以在其他项目中使用
     --- content 公共组件，但仅对本项目使用，里面有本项目的业务相关代码

```

### 解决首页中Better-scroll可滚动区域的问题
```
1.Better-Scroll在决定有多少区域可以滚动时，是根据scrollerHeight属性决定
  而scrollerHeight属性是根据放在Better-Scroll的content中的子组件高度决定
  但是我们的首页中，刚开始在计算scrollHeight属性时是没有将图片计算在内
  所以计算出来的高度是错误的
  后来图片加载进来之后有了新的高度，但是scrollerHeight属性并没有进行更新
  所以滚动出现了问题

2.如何解决？
  监听每一张图片是否加载完成，只要有一张图片加载完成，执行一次refresh()

  如何监听图片加载完成？
    原生js监听图片   img.onload = function() {}
    vue中监听  @load='方法'
  调用scroll的refresh()

3.如何将GoodListItem.vue中的事件传入Home.vue中
  涉及到非父子组件通信，所以这里使用事件总线
    bus -> 总线
    Vue.prototype.$bus = new Vue()
    this.$bus.$emit('事件名称',参数)
    this.$bus.$on('事件名称',回调函数(参数))

4.对于refresh调用非常频繁的问题，进行防抖操作
 （本来执行很频繁的事情，让他延时一会，等看它待会还要不要执行，如果还要执行，就合并到一起，再一起等，
   等到delay时间内没有下一次函数过来了，就执行某一函数）
  防抖函数 debounce / 节流 throttle
  防抖函数起作用的过程：
    如果我们直接执行refresh，那么refresh函数会被执行30次
    可以将refresh函数传入到debounce函数中，生成一个新的函数
    之后再调用非常频繁的时候，就使用新生成的函数
    而新生成的函数，并不会很频繁的调用，如果下一次执行来的很快，就会将上一次取消掉

    debounce(func, delay) {
      let timer = null
      return function(...args) {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
    }
```

### 上拉加载更多功能
```
1.监听滚动到底部

```
