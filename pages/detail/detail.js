// pages/detail/detail.js
var Api = require('../../utils/api.js')
var util = require('../../utils/util.js')
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
        console.log(res);
        res.data.data.create_at = util.getDateDiff(new Date(res.data.data.create_at));
        res.data.data.replies = res.data.data.replies.map(function(item){
          item.create_at = util.getDateDiff(new Date(item.create_at));
          return item;
        });
        // success
        self.setData({
          detail: res.data.data
        });
        setTimeout(function() {
          self.setData({
            hidden: true
          })
        }, 300);
      }
    })
  }
})