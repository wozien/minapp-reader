// pages/movies/movie-more/movie-more.js

const app = getApp();
const utils = require('../../../utils/utils.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: '',
    movies: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const category = options.category;
    this.setData({ category})

    let path;
    switch(category) {
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

    this.getMoviesData(path);
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

  getMoviesData: function (pathName) {
    const url = `${app.globalData.doubanBaseUrl}/${pathName}`;
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
    const movies = [];
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

    this.setData({movies});
  }
})