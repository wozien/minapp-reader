// pages/movies/movies.js

const utils = require('../../utils/utils.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 热门电影
    hotMovies: {},
    // 即将上映
    comeMovies: {},
    // top电影
    topMovies: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getMoviesData('v2/movie/in_theaters', 'hot');
    this.getMoviesData('v2/movie/coming_soon', 'come');
    this.getMoviesData('v2/movie/top250', 'top');
  },

  getMoviesData: function(pathName, type) {
    const url = `${app.globalData.doubanBaseUrl}/${pathName}?start=0&count=3`;
    const self = this;
    // 请求
    wx.request({
      url,
      header: {
        'Content-Type': 'json'
      },
      success: function(res) {
        // console.log(res);
        self.processMoviesData(res.data, type);
      }
    })
  },

  processMoviesData: function (moviesData, type) {
    const movies = [];
    const typeMaps = {
      'hot': '正在热映',
      'come': '即将上映',
      'top': '豆瓣高分'
    }
    moviesData.subjects.forEach(sub => {
      let title = sub.title;
      if(title.length > 6) {
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

    const tempData = {};
    tempData[`${type}Movies`] = {
      movies,
      categoryTitle: typeMaps[type]
    } 

    this.setData(tempData);
  }
})