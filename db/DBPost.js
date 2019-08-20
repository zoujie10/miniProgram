// ES6
class DBPost{
  constructor(postId){
    this.storageKeyName = 'postList';
    this.postId = postId;
    console.log(postId);
  }

  getAllPostData(){
    var res = wx.getStorageSync(this.storageKeyName);
    if(!res){
      res = require('../data/data.js').postList;
      this.execSetStorageSync(res);
    }
    return res;
  }

  getPostItemById(){
    var postsData = this.getAllPostData();
    var len = postsData.length;
    for (var i = 0;i<len;i++){
      if(postsData[i].postId == this.postId){
        return {
            index:i,
            data:postsData[i]
        }
      }
    }
  }

  execSetStorageSync(data){
    wx.setStorageSync(this.storageKeyName, data);
  }
};
export{DBPost}


// var DBPost = function(){
//   this.storageKeyName='postList';//本地缓存文件键值
// }

// DBPost.prototype={
//   //得到全部文章信息
//   getAllPostData:function(){
//     var res = wx.getStorageSync(this.storageKeyName);
//     // if(!res){
//       console.log("getAllPostData method")
//       res = require('../data/data.js').postList;
//       this.execSetStorageSync(res);
//     // }
//   },

//   //本地缓存 保存/更新
//   execSetStorageSync:function(data){
//     wx.setStorageSync(this.storageKeyName, data);
//   },

// };
// module.exports = {
//   DBPost:DBPost
// };