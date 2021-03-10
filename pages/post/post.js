// pages/post/post.js
// var DBPost = require("../../db/DBPost.js").DBPost;
import {DBPost} from '../../db/DBPost.js';
var dbPost = new DBPost();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    products :[]
  },

  /**
   * 生命周期函数--监听页面加载 一个页面只会加载一次
   */
  onLoad: function(options) {
    console.log("onLoad:页面被加载")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成 调用一次代表视图层已经准备好，可以和视图层进行交互
   */
  onReady: function() {
    console.log("onReady:页面被渲染")
  },

  /**
   * 生命周期函数--监听页面显示 每次打开页面都会调用
   */
  onShow: function() {
    console.log("onShow:页面被显示")
    this.doSomeThing()
    this.processDoubanData()
  },
  doSomeThing: function() {
    var templateData = [{
      message: 'Picture--1',
      postId:"1",
    }, {
      message: 'Picture--2',
      postId: "2",
    }]
    this.setData({
      postList:dbPost.getAllPostData(),
      templateData: templateData
    })
  },

  processDoubanData: function (moviesDouban) {
    var products = [];
    for (var idx = 0;idx < 10;idx++) {
      var subject = idx;
      var title = "Product";
      var coverStr;
      if(idx == 0){
          coverStr = "/images/avatar/avatar-1.png"; 
      }else if(idx==1){
        coverStr = "/images/avatar/avatar-2.png"; 
      }else if (idx == 2){
        coverStr = "/images/avatar/avatar-3.png"; 
      }else{
        coverStr = "/images/avatar/avatar-4.png";
      }
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        // stars: util.convertToStarsArray(subject.rating.stars),
        title: title+idx,
        // average: subject.rating.average,
        coverageUrl: coverStr,
        movieId: idx
      }
      products.push(temp)
    }

    var totalMovies = []
    totalMovies = this.data.products.concat(products);
    this.setData({
      products: totalMovies
    });
    wx.stopPullDownRefresh();
    //隐藏loading状态
    wx.hideNavigationBarLoading();
  },

  /**
   * 生命周期函数--监听页面隐藏 
   */
  onHide: function() {
    console.log("onHide:页面被隐藏")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  
  onTapToDetail(event){
    var postId = event.currentTarget.dataset.postId;
    console.log(postId);
    wx.navigateTo({
      url: 'post-detail/post-detail?postId='+postId,
      // url: 'post-detail/post-detail',
    })
  },

 // target 和currentTarget
  // target指的是当前点击的组件 和currentTarget 指的是事件捕获的组件
  // target这里指的是image，而currentTarget指的是swiper
  onSwiperTap: function (event) {
    var postId = event.target.dataset.postId;
    wx.navigateTo({
      url: "post-detail/post-detail?postId=" + postId
    })
  },

  onCollectionTap(event) {
    //dbPost对象已在onLoad函数里被保存到了this变量中，无需再次实例化
    // var dbPost = new DBPost();
    
    var newData = dbPost.collectOn();
    //重新绑定数据。注意，不要将整个newData全部作为setData的参数，
    //应当有选择地更新部分数据
    console.log(newData.collectionStatus, newData.collectionNum);
    this.setData({
      "postList[0].collectionStatus" : newData.collectionStatus,
      "postList[0].collectionNum": newData.collectionNum
    })
    wx.showToast({
      title: newData.collectionStatus ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success",
      mask: true
    })
  },
  
//点赞
  onUpTap(event){
    var newData = dbPost.clickUp();
    this.setData({
      "postList[0].upStatus": newData.upStatus,
      "postList[0].upNum" :newData.upNum
    })

    wx.showToast({
      title: newData.upStatus ? "点赞成功" : "取消点赞",
      duration: 1000,
      icon: "success",
      mask: true
    })
  },

//评论
onCommentTap(event){
var id = event.currentTarget.dataset.postId;
wx.navigateTo({
  // url: 'post-comment/post-commend?id=' + id,
  url: 'post-comment/post-comment',
})
},

onPullDownRefresh: function (event) {
  
  //刷新页面后将页面所有初始化参数恢复到初始值
  this.data.movies = [];
   this.processDoubanData()
  //显示loading状态
  wx.showNavigationBarLoading();
}

})