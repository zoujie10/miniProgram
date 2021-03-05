/* 
* 校验签名，防止篡改
*/
Page({
 data: {},
 onTap: function () {
   wx.login({
     success: function (loginRes) {
       wx.getUserInfo({
         success: function (userRes) {
           console.log(JSON.parse(userRes.rawData))
           wx.request({
             url: "http://localhost:8080/wxopen/wxcheckuserinfo.php",
             data: {
               code: loginRes.code,
               signature:userRes.signature,
               rawData:userRes.rawData
             },
             success: function (res) {
               console.log(res.data);
             }
           })
         }
       })
     }
   })
 }
})