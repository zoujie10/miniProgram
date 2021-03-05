Page({
  data: {
    fileTypeList: [
      { type: 'pdf', iconurl: '/images/icon/wx_app_pdf.png', title: 'pdf类型' },
      { type: 'word', iconurl: '/images/icon/wx_app_word.png', title: 'word类型' },
      { type: 'excel', iconurl: '/images/icon/wx_app_exl.png', title: 'excel类型' },
      { type: 'ppt', iconurl: '/images/icon/wx_app_ppt.png', title: 'ppt类型' }
    ],
  },
  downloadFile: function (event) {
    var type = event.currentTarget.dataset.type,
      url = 'https://coding.net/u/airbreak/p/wx_app_files/git/raw/master/top10.';//失效 pdf html
    switch (type) {
      case "pdf":
        url += 'pdf';
        break;
      case "word":
        url += 'docx';
        break;
      case "excel":
        url += 'xlsx';
        break;
      default:
        url += 'pptx';
        break;
    }
    //下载文件资源到本地
    wx.downloadFile({
      url: url,
      success: function (res) {
        var filePath = res.tempFilePath;
        console.log(filePath);
        wx.openDocument({//预览文件只在真机上有效，在开发工具中是没有效果的。
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          },
          fail: function (res) {
            console.log(res)
          }, complete: function (res) {
            console.log(res);
          }
        })
      },
      fail: function () {
        console.log('下载失败');
      }
    })
  },
});