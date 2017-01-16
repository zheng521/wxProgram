// pages/topics/topics.js
var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');
Page({
  data:{
    title: '首页列表',
    postsList: [],
    hidden: false,
    page: 1,
    tab: 'all',
    allActive: 'active',
    goodActive: '',
    shareActive:'',
    askActive: '',
    jobActive: ''
  },
  onLoad: function () {
    this.fetchData();
  },
  onPullDownRefresh: function () {
    this.fetchData();
    console.log('下拉刷新', new Date());
  },
  fetchData: function(data) {
    var self = this;
    self.setData({
      hidden: false
    });
    if(!data) data = {};
    if(!data.page) data.page = 1;
    if(data.page === 1) {
      self.setData({
        postsList: []
      })
    }
    wx.request({
      url: Api.getTopics(data),
      method: 'GET',
      success: function(res){
        console.log(res);
        // success
        self.setData({
          // postsList: res.data.data
          postsList: self.data.postsList.concat(res.data.data.map(function(item) {
            item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
            return item;
          }))
        });
        setTimeout(function(){
          self.setData({
            hidden: true
          });
        },300)
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
    // 头部tap增加选中样式
    if(tab == 'all') {
      self.setData({allActive: 'active',goodActive: '', shareActive:'', askActive: '',jobActive: ''})
    }else if (tab == 'good') {
      self.setData({allActive: '',goodActive: 'active', shareActive:'', askActive: '',jobActive: ''})      
    }else if (tab == 'share') {
      self.setData({allActive: '',goodActive: '', shareActive:'active', askActive: '',jobActive: ''})      
    }else if(tab == 'ask'){
      self.setData({allActive: '',goodActive: '', shareActive:'', askActive: 'active',jobActive: ''})      
    }else {
      self.setData({allActive: '',goodActive: '', shareActive:'', askActive: '',jobActive: 'active'})      
    }
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
    var self = this
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
    var id = e.currentTarget.id,
    url = '../detail/detail?id=' + id;
    wx.navigateTo({
      url: url
    })
  }

})