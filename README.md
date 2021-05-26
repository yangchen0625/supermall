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
    · 如果我们直接执行refresh，那么refresh函数会被执行30次
    · 可以将refresh函数传入到debounce函数中，生成一个新的函数
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
  if (this.pullUpLoad) {
    this.scroll.on('pullingUp',() => {
      // console.log('上拉加载更多');
      // 将上拉加载更多事件传出去，告诉别的组件做（上拉加载更多）动作
      this.$emit('pullingUp')
    })
  }

2.在Home.vue的<scroll></scroll>中添加
  :pull-up-load="true"
  @pullingUp="loadMore"

  // 自定义事件，上拉加载更多
  loadMore() {
    // console.log('上拉加载更多');
    this.getHomeGoods(this.currentType)
    this.$refs.scroll.scroll.refresh()
  }

3.在getHomeGoods方法中添加
  // 在把数据加载完后，使用BScroll里的finishPullUp方法，才能进行下一次加载（这里finishPullUp方法已经在Scroll组件里封装好）
  this.$refs.scroll.finishPullUp()
```

### TabControl的吸顶效果
```
1.获取到tabControl的offsetTop属性（获取当前元素定位的父元素位置）

必须知道滚动到多少时开始有吸顶效果，这个时候就需要获取tabControl的offsetTop
· 但是如果直接在mounted中获取tabControl的offsetTop，那么值是不正确的
· 如何获取正确的值？
  · 监听HomeSwiper中img的加载完成
  · 加载完成后，发出事件，在Home.vue中获取正确的值
  · 补充：为了不让HomeSwiper多次发出事件，可以使用isLoad的变量进行状态的记录
  · 注意：这里不进行多次调用的debounce的区别

2.监听滚动，动态改变tabControl的样式
  问题：动态改变tabControl的样式时会出现两个问题：
    一、下面的商品内容会突然上移
    二、tabControl虽然设置了fixed，但是也随着Better-Scroll一起滚出去了
  其他方案来解决停留问题：
    · 在最上面，多复制一份PlaceHolderTabControl组件对象（用于占位），利用它来实现停留效果
    · 当用户滚动到一定位置，PlaceHolderTabControl显示出来
    · 当用户滚动没有达到一定位置时，PlaceHolderTabControl隐藏
```

### 让Home保持原来的状态
```
1.让Home不要随意销毁
  · keep-alive
2.让Home中的的内容保持原来的位置
  · 离开时，保持一个位置信息saveY
  · 进来时，将位置设置为原来保存的位置信息即可
    # 注意：最好回来时进行一次refresh()
```

```
详情页实现思路
1.点击商品进入详情页
2.解决首页保持位置状态
3.详情页的导航栏实现
4.请求详情的数据
5.轮播图的实现
6.商品基本信息的展示

```


