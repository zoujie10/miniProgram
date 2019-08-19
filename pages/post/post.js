// pages/post/post.js
// var DBPost = require("../../db/DBPost.js").DBPost;
import {DBPost} from '../../db/DBPost.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // object:{
    //     date: "August 09 2019"
    // },
    // title:"旺仔旺铺首页",
    // postImg:"/images/post/bannarPicture.png",
    // avatar:"/images/post/avatar_women.png",
    // content: "虚弱的窗帘留不住,房里的黑夜也要走,清晨唤醒了我,照亮昨夜的梦,一直到这时候,你的爱就像彩                 虹雨后的天空绚烂却教人迷惑蓝绿黄红你的爱就像彩虹我张开了手却只能抱诅。",
    // readingNum:{
    //   array:[108,107,106]
    // },
    // collectionNum:108,
    // commentNum:7
    
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
  },
  doSomeThing: function() {
    // var wantwantData = {
    //   object: {
    //     date: "August 09 2019"
    //   },
    //   title: "旺仔旺铺首页",
    //   postImg: "/images/post/bannarPicture.png",
    //   avatar: "/images/post/avatar_women.png",
    //   content: "虚弱的窗帘留不住,房里的黑夜也要走,清晨唤醒了我,照亮昨夜的梦,一直到这时候,你的爱就像彩                 虹雨后的天空绚烂却教人迷惑蓝绿黄红你的爱就像彩虹我张开了手却只能抱诅。",
    //   readingNum: {
    //     array: [108, 107, 106]
    //   },
    //   collectionNum: 108,
    //   commentNum: 7
    // }
    // this.setData({
    //   // title : "旺仔牛奶",
    //   // "readingNum.array[1]": 99,
    //   // "object.date":"August 10 2019"
    //   postData: wantwantData
    // })
    var templateData = [{
      message: 'Picture1',
      postId:"1",
    }, {
      message: 'Picture2',
      postId: "2",
    }, {
      message: 'Picture3',
      postId: "3",
    }]

    // var postList = [{
    //   object: {
    //     date: "August 09 2019"
    //   },
    //   title: "旺仔旺铺首页",
    //   postImg: "/images/post/bannarPicture.png",
    //   avatar: "/images/post/avatar_women.png",
    //   content: "虚弱的窗帘留不住,房里的黑夜也要走,清晨唤醒了我,照亮昨夜的梦,一直到这时候,你的爱就像彩                 虹雨后的天空绚烂却教人迷惑蓝绿黄红你的爱就像彩虹我张开了手却只能抱诅。",
    //   readingNum: {
    //     array: [108, 107, 106]
    //   },
    //   collectionNum: 108,
    //   commentNum: 7
    // },
    
    //   {
    //     object: {
    //       date: "August 10 2019"
    //     },
    //     title: "旺仔旺铺新品",
    //     postImg: "/images/post/postPicture@3x.png",
    //     avatar: "/images/avatar/WeChat@3x.png",
    //     content: "因商品享受”7天无理由退换“服务，则推广费将在用户收货7天后且未发生退货的情况下发放至您的CEO账户。收入到账后，您可以马上提现，每日限提现5次，上限2,000元。提现过程中产生的费用皆由微信或支付宝平台收取，如有疑问，可联系客服咨询。",
    //     readingNum: {
    //       array: [10, 10, 106]
    //     },
    //     collectionNum: 108,
    //     commentNum: 9
    //   },

    //   {
    //     object: {
    //       date: "August 11 2019"
    //     },
    //     title: "旺仔旺铺严选",
    //     postImg: "/images/post/post1Picture@3x.png",
    //     avatar: "/images/post/avatar_women.png",
    //     content: "因商品享受”7天无理由退换“服务，则推广费将在用户收货7天后且未发生退货的情况下发放至您的CEO账户。收入到账后，您可以马上提现，每日限提现5次，上限2,000元。提现过程中产生的费用皆由微信或支付宝平台收取，如有疑问，可联系客服咨询。",
    //     readingNum: {
    //       array: [8, 17, 106]
    //     },
    //     collectionNum: 108,
    //     commentNum: 11
    //   },
    // ]
    // this.setData({
    //   postList: postList,
    //   templateData: templateData
    // })

    var dbPost= new DBPost();
    this.setData({
      postList:dbPost.getAllPostData(),
      templateData: templateData
    })
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
    })
  },

})