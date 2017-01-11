// pages/detail/detail.js
var Api = require('../../utils/api.js')
Page({
  data:{
    titile:'详情页',
    detail: {},
    hidden: false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    // this.fetchData(options.id);
    var self = this;
    wx.request({
      url: Api.getTopicByID(options.id, {mdrender:false}), 
      success: function(res){
        // success
        console.log(res);
        self.setData({
          hidden: 'hidden'
        });
        self.setData({
          detail: res.data.data
        });
      }
    })
  }
  // fecthData: function(id){
  //   var self = this;
  //   wx.request({
  //     url: Api.getTopicByID(id,{mdrender:false}), 
  //     success: function(res){
  //       // success
  //       console.log(res);
  //       self.setData({
  //         detail: res.data.data
  //       });
  //     }
  //   })
  // }
})