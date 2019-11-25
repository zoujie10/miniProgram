// ES6
class DBPost {
  constructor(postId) {
    this.storageKeyName = 'postList';
    this.postId = "0";
    console.log(postId);
  }

  getAllPostData() {
    var res = wx.getStorageSync(this.storageKeyName);
    if (!res) {
      res = require('../data/data.js').postList;
      this.execSetStorageSync(res);
    }
    return res;
  }

  getPostItemById() {
    var postsData = this.getAllPostData();
    var len = postsData.length;
    for (var i = 0; i < len; i++) {
      if (postsData[i].postId == this.postId) {
        return {
          index: i,
          data: postsData[i]
        }
      }
    }
  }

  execSetStorageSync(data) {
    wx.setStorageSync(this.storageKeyName, data);
  }

  collectOn(){
    return this.updatePostData("collect");
  }
  
  //更新本地的点在、评论信息、收藏、阅读量
  updatePostData(category) {
    var itemData = this.getPostItemById(),
      postData = itemData.data,
      allPostData = this.getAllPostData();

    switch (category) {
      case "collect":
        //处理收藏
        if (!postData.collectionStatus) {
          //当前状态是未收藏
          postData.collectionNum++;
          postData.collectionStatus = true;
        } else {
          //如果当前状态是收藏
          postData.collectionNum--;
          postData.collectionStatus = false;
        }
        break;
      default:
        break;
    }
    //更新缓存数据库
    allPostData[itemData.index] = postData;
    this.execSetStorageSync(allPostData);
    return postData;
  }

};

export {
  DBPost
}


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