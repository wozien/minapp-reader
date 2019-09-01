const postData = require('../../data/post-data.js');

// pages/posts/posts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    posts: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      posts: postData.postList || []
    })
  },

  onPostTap: function(e) {
    const postId = e.currentTarget.dataset.postId;
    wx.navigateTo({
      url: `../detail/post-detail?id=${postId}`
    })
  }
})