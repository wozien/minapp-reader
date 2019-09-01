const mockData = require('../../data/post-data.js');

// 文章收藏对象的缓存key
const POST_COLLECTED = 'POST_COLLECTED';

// pages/detail/post-detail.js
Page({

  data: {
    postId: '',
    // 文章详情数据
    postData: {},
    // 当前文章是否收藏
    collected: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const postId = options.id;
    const postList = mockData.postList;
    if(postId && postList.length) {
      const postData = postList.find(post => post.postId == postId)
      if(postData) {
        this.setData({postId, postData})
      }
    }

    const postCollected = wx.getStorageSync(POST_COLLECTED)
    if(postCollected) {
      const collected = postCollected[postId]
      if(collected) {
        this.setData({ collected })
      }
    } else {
      wx.setStorageSync(POST_COLLECTED, {})
    }
  },

  onCollected: function() {
    const postCollected = wx.getStorageSync(POST_COLLECTED)
    const collected = !(postCollected[this.data.postId] || false)
    this.setData({ collected })
    // 修改缓存
    postCollected[this.data.postId] = collected
    wx.setStorageSync(POST_COLLECTED, postCollected)
  } 
})