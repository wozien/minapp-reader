// pages/movies/movie-detail/movie-detail.js
const app = getApp();
const util = require('../../../utils/utils.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const movieId = options.id;
    const self = this;
    
    if(movieId) {
      const url = app.globalData.doubanBaseUrl + '/v2/movie/subject/' + movieId;
      wx.request({
        url,
        success: function(res) {
          self.processMovieData(res.data);
        }
      })
    }
  },

  processMovieData: function(data) {
    const director = {
      avatar: "",
      name: "",
      id: ""
    }
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large

      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }
    const movie = {
      movieImg: data.images ? data.images.large : "",
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      generes: data.genres.join("、"),
      stars: util.startToArray(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: util.convertToCastString(data.casts),
      castsInfo: util.convertToCastInfos(data.casts),
      summary: data.summary
    }
    this.setData({movie})
  },

  onPreviewImg: function(ev) {
    const src = ev.currentTarget.dataset.src;
    wx.previewImage({
      urls: [src],
      current: src
    })
  }
  
})
