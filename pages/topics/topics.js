// pages/topics/topics.js
var Api = require('../../utils/api.js');
Page({
  data:{
    title: '首页列表',
    postsList: []
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log('123');
    this.fetchData();
  },
  fetchData: function(data) {
    if(!data) data = {};
    if(!data.page) data.page = 1;
    var that = this;
    wx.request({
      url: Api.getTopics(data),
      method: 'GET',
      success: function(res){
        // success
        console.log(res);
        that.setData({postsList: res.data.data})
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onTapTag: function(e) {
    var self = this;
    var tab = e.currentTarget.id;
    self.setData({
      tab: tab
    });
    if(tab !== 'all') {
      this.fetchData({tab: tab});
    }else {
      this.fetchData();
    }
  },
  lower: function (e) {
    var self = this;
    self.setData({
      page: self.data.page + 1
    });
    if(self.data.tab !== 'all') {
      this.fetchData({tab:self.data.tab, page:self.data.page})
    } else {
      this.fetchData({page: self.data.page})
    }
  },
  redictDetail: function(e) {
    console.log('详情页');
    var id = e.currentTarget.id,
    url = '../detail/detail?id=' + id;
    wx.navigateTo({
      url: url
    })
  }

})