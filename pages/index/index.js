//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    console.log('this is first');
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      console.log(userInfo.nickName);
      //更新数据
      that.setData({
        userInfo:userInfo
      })
      that.setData({
        motto: '欢迎你"' + userInfo.nickName + '"来到cnode小程序体验社区'
      })
    })
  }
})
