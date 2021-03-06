// pages/post/post-detail/post-detail.js
var app = getApp();
console.log(app)
import {
  DBPost
} from '../../../db/DBPost.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var postId = options.postId;
    console.log("detail--view", postId);
    this.dbPost = new DBPost(postId);
    this.postData = this.dbPost.getPostItemById().data;
    this.setData({
      post: this.postData
    })
    this.addReadingTimes();//文章阅读计数
    this.setMusicMonitor();//监听音乐播放器
    this.initMusicStatus();
    this.setAniation();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log(this.postData.title);
    wx.setNavigationBarTitle({
      title: this.postData.title,
    })
  },

  setAniation: function () {
    //定义动画  创建动画实例
    var animationUp = wx.createAnimation({
      //动画的效果
      timingFunction: 'ease-in-out'
      //“linear”“ease”“ease-in”“ease-in-out”“ease-out”“step-start”“step-end”
    })

    this.animationUp = animationUp
  },
  initMusicStatus() {
    var currentPostId = this.postData.postId;
    if (app.globalData.g_isPlayingMusic &&
      app.globalData.g_currentMusicPostId === currentPostId) {

      // 如果全局播放的音乐是当前文章的的音乐，才将图标状态设置为正在播放
      this.setData({
        isPlayingMusic: true
      })
    }
    else {
      this.setData({
        isPlayingMusic: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    //音乐播放器 退出停止
    // wx.stopBackgroundAudio({
    //   success: (res) => {
    //     this.setData({
    //       isPlayingMusic : false
    //     })
    //   },
    // })
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
  // onShareAppMessage: function() {

  // },

  onUpTap: function (event) {
    var newData = this.dbPost.up();

    this.setData({
      'post.upStatus': newData.upStatus,
      'post.upNum': newData.upNum
    }),

    this.animationUp.scale(2).step();
    this.setData({
      animationUp: this.animationUp.export()
    })
    setTimeout(function () {
      this.animationUp.scale(1).step();
      this.setData({
        animationUp: this.animationUp.export()
      })
    }.bind(this), 300);
  },


  //阅读量+1
  addReadingTimes:function(){
    this.dbPost.addReadingTimes();
  },

  onMusicTap: function (event) {
    if (this.data.isPlayingMusic) {
      wx.pauseBackgroundAudio({
        complete: function () {
          console.log('complete')
      },
      success: function () {
          console.log('success')
      },
      fail: function () {
          console.log('fail')
      }
      });
      this.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
    }
    else {
      wx.playBackgroundAudio({
        dataUrl: this.postData.music.url,
        title: this.postData.music.title,
        coverImgUrl: this.postData.music.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = this.postData.postId;
    }
  },

  setMusicMonitor: function () {
    var that = this;
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
    });

    wx.onBackgroundAudioPlay(function (event) {
      // 只处理当前页面的音乐播放。
      if (app.globalData.g_currentMusicPostId === that.postData.postId) {
        that.setData({
          isPlayingMusic: true
        })
      }
      app.globalData.g_isPlayingMusic = true;
    });

    wx.onBackgroundAudioPause(function () {
      // 只处理当前页面的音乐暂停。
      if (app.globalData.g_currentMusicPostId == that.postData.postId) {
        that.setData({
          isPlayingMusic: false
        })
      }
      app.globalData.g_isPlayingMusic = false;
    });
  },

//注意，分享按钮是页面的行为，而不是应用程序的行为，每个页面都可以调用分享API并设置自己的分享参数。
  onShareAppMessage: function () {
    return {
      title: this.postData.title,
      desc: this.postData.content,
      path: "/pages/post/post-detail/post-detail"
    }
  }
})