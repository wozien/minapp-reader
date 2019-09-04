Page({
  onTap: function() {
    // 这里必须用swtichTab
    // wx.redirectTo({
    //   url: '../posts/posts',
    // })

    wx.switchTab({
      url: '../posts/posts',
    })
  }

})