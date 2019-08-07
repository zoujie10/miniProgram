// pages/post/post.js
Page({
  doSomeThing: function () {
    console.log("do some thing")
  },
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载 一个页面只会加载一次
   */
  onLoad: function (options) {
    console.log("onLoad:页面被加载")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成 调用一次代表视图层已经准备好，可以和视图层进行交互
   */
  onReady: function () {
    console.log("onReady:页面被渲染")
  },

  /**
   * 生命周期函数--监听页面显示 每次打开页面都会调用
   */
  onShow: function () {
    console.log("onShow:页面被显示")
    this.doSomeThing()
  },

  /**
   * 生命周期函数--监听页面隐藏 
   */
  onHide: function () {
    console.log("onHide:页面被隐藏")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

 
})