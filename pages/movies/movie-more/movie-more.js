// pages/movies/movie-more/movie-more.js

const app = getApp();
const utils = require('../../../utils/utils.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: '',
    movies: [],
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const category = options.category;
    this.setData({ category });
    this.getMoviesData();
  },

  onReady: function() {
    const typeMaps = {
      'hot': '正在热映',
      'come': '即将上映',
      'top': '豆瓣高分'
    };

    // 动态设置导航栏标题
    wx.setNavigationBarTitle({
      title: typeMaps[this.data.category]
    })
  },

  // 页面触底触发
  onReachBottom: function() {
    this.getMoviesData();
    wx.showNavigationBarLoading();
  },

  // 下拉刷新
  onPullDownRefresh: function() {
    this.setData({
      movies: [],
      total: 0
    });
    this.getMoviesData();
    wx.showNavigationBarLoading();
  },

  getUrl: function () {
    let path;
    let url;
    switch (this.data.category) {
      case 'hot':
        path = '/v2/movie/in_theaters';
        break;
      case 'come':
        path = '/v2/movie/coming_soon';
        break;
      case 'top':
        path = '/v2/movie/top250';
        break;
    }
    url = `${app.globalData.doubanBaseUrl}/${path}`;
    if(this.data.total) {
      url += `?start=${this.data.total}&count=20`;
    }
    return url;
  },

  getMoviesData: function () {
    const url = this.getUrl();
    const self = this;
    // 请求
    wx.request({
      url,
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        // console.log(res);
        self.processMoviesData(res.data);
      }
    })
  },

  processMoviesData: function(moviesData) {
    wx.hideNavigationBarLoading();
    if (!moviesData.subjects.length) return;

    const movies = this.data.movies.slice();
    moviesData.subjects.forEach(sub => {
      let title = sub.title;
      if (title.length > 6) {
        title = title.substring(0, 6) + '...';
      }
      movies.push({
        title,
        stars: utils.startToArray(sub.rating.stars),
        average: sub.rating.average,
        coverImg: sub.images.large,
        id: sub.id
      })
    })

    this.setData({
      movies,
      total: this.data.total + 20
    });
  }
})