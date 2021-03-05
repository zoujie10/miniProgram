var order = ['red', 'yellow', 'blue', 'green', 'red',
'SlateGray','GoldEnrod']
Page({
  data: {
    toView: 'green',
    scrollTop: 0
  },
  upper: function(e) {
    console.log(e)//顶部
  },
  lower: function(e) {
    console.log(e)//触底
    this.setData({
      scrollTop:0
    })
  },
  scroll: function(e) {
    console.log(e)//滑动事件
  },

  //每次点击左边的按钮，垂直scroll-view将滑动一个方块的距离；每次点击右边的按钮，垂直scroll-view下的子元素将移动10
  //scroll-into-view指定一个scroll-view内某子元素的id，被指定的子元素的顶部将对齐滚动区域的顶部。所以当我们在js中不断变换scroll-into-view的取值时，就会出现“一格一格跳动”的效果。每变换一次，scroll-into-view就会被指定一个新的子元素id，同时这个子元素将被移动到scroll-view的顶部。scroll-top指定的是垂直滚动条的位置，每次点击click me to scroll按钮都会将scroll-top的值增加10，这样滚动条的位置就会向下移动10，scroll-view的子元素也将一起向下移动10
  tap: function(e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  }
})
