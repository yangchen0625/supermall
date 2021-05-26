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

### 详情页实现思路
```
1.点击商品进入详情页
2.解决首页保持位置状态
3.详情页的导航栏实现
4.请求详情的数据
5.轮播图的实现
6.商品基本信息的展示

```


## 自己的一些心里想法
```
   2020年10月中旬学校的课程就结束了，基本上可以找工作了，我也是那时候就去实习了。
   其实那个时候自己水平挺差的，学校里都没讲过什么，就连spring框架都没有讲过，只是
让我们看了一下简短的视频，然后让我们直接去用框架做一个小项目。就几集的视频怎么可能
看懂spring，所以当时也是蒙混过关，基本上所以同学都是这样。
   可能是当时运气还行，找到了一份Java开发的实习，当时一进去就给我一个demo，让我去
做，是一个前后端分离的demo，这也是我第一次接触这种项目，是SpringBoot + React，
当时就是完全看不懂，根本无从下手，我只好让带我的师傅从头到尾给我讲了一遍，我粗略地
了解了这种项目地构造，但其实还是难以下手，我只能照着里面其他写好地功能模块去做，但
是我也看不懂，很多都是硬着头皮去写，写了也不懂什么意思。
   慢慢地，我最后还是把这个demo做完了，但是超了一点时间，但是这时候因为带我地那个
师傅出差去了，于是组长把我临时分到了另一个组去，结果这个组的人又让我做一个demo，
后端还是SpringBoot，但是前端换成Vue了，又是一个新的语言，我又开始了慢慢的摸索，
同样还是硬着头皮去写，不会的就照着其他模块去写，遇到bug解决不了就问公司里的前辈，
一点一点，慢慢地磨出来了。但这，只是一个开始。
   demo做完之后，组长就直接让我上项目，我有点吃惊，我一个刚进公司没多久的实习生，
就直接上项目了？但没有办法，上级的指示还得去做，虽说这是一个二次迭代开发得项目，
但对这种新人来说还是不好下手，这也是一个前后端分离项目，也是SpringBoot + Vue，
同时使用了Ant Design框架，是一个已经上线的项目。整体来说还是比较复杂，里面的联
系对新人来说难以理清楚，很复杂，我也是照着其他做好的模块去模仿着做，因为我根本不懂
Vue的语法，没有学习过，我就只能模仿去做，一点点的堆码做弄。
   公司的作息时间是8:30~17:30，但是技术部的人一般都是七点左右走，刚开始去的时候
事不多，也基本上都是六点半左右走，到了赶项目的时候，都是八九点左右，有时九十点才走。
记得最搞笑的一次，我待到半夜12点半，因为组长说必须做完，我就一直待着改bug，最后公
司只剩我一个人，我出去把公司门锁了，下到楼底，发现写字楼大门已经关了，出不去了，我
就跑到消防通道去躺着，当时还是冬天，从1点半躺到2点，实在是睡不着，然后坐着看电影，
看了一个半小时，手机快没电了，然后继续躺，还是无法入睡，就在这时候听见电梯有响声，
我猜可能是巡逻的保安，就没去理他，过了一会突然想到写字楼好像有地下停车场，坐电梯好
像能下去，我就马上去电梯，发现真可以到地下几层，然后就从停车场出去了，已经快4点了，
然后叫了一辆滴滴，坐了半小时回家，直接躺床上睡觉。七点又起来继续上班去了。。。
   说来也是一段奇幻的经历，

   未完待续。。。

```


