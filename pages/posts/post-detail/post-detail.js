const mockData = require('../../../data/post-data.js');
const app = getApp();

// 文章收藏对象的缓存key
const POST_COLLECTED = 'POST_COLLECTED';

// pages/detail/post-detail.js
Page({

  data: {
    postId: '',
    // 文章详情数据
    postData: {},
    // 当前文章是否收藏
    collected: false,
    // 音乐播放状态
    playing: false
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

    if(app.globalData.playPostId === postId && app.globalData.playing) {
      this.setData({
        playing: true
      })
    }

    this.onAudioOperate();
  },

  onAudioOperate: function() {
    const self = this;
    // 音乐播放监听
    wx.onBackgroundAudioPlay(function () {
      self.setData({
        playing: true
      });
      app.globalData.playing = true;
      app.globalData.playPostId = self.data.postId;
    })

    wx.onBackgroundAudioPause(function () {
      self.setData({
        playing: false
      })
      app.globalData.playing = false;
    })
  },

  onCollected: function() {
    const postCollected = wx.getStorageSync(POST_COLLECTED)
    const collected = !(postCollected[this.data.postId] || false)
    this.setData({ collected })
    // 修改缓存
    postCollected[this.data.postId] = collected
    wx.setStorageSync(POST_COLLECTED, postCollected)
    // 显示提示框
    wx.showToast({
      title: collected ? '收藏成功' : '取消成功',
    })
  },

  onShare: function() {
    const itemList = [
      '分享到朋友圈',
      '分享到好友',
      '分享到qq'
    ]

    wx.showActionSheet({
      itemList,
      itemColor: "#405f80",
      success: function(res) {
        if(res.tapIndex !== undefined) {
          wx.showModal({
            title: itemList[res.tapIndex],
            content: '是否把该文章' + itemList[res.tapIndex]
          })
        }
      }
    })
  },

  onPlayMusic: function() {
    if(this.data.playing) {
      wx.pauseBackgroundAudio();
    } else {
      const music = this.data.postData.music;
      wx.playBackgroundAudio({
        dataUrl: music.url,
        title: music.title,
        coverImgUrl: music.coverImg
      })
    }

    this.setData({
      playing: !this.data.playing
    })
  }
})