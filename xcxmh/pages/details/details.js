const config = require('../../config')

var a = true
var b = true

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: "",
    previous: 0,
    next: 0,
    mhid: 0,
    screenHeight: 0,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: config.imgInfolUrl,
      data: { id: options.id, st: options.st },
      success: function (res) {
        if (res.data.status == 1) {
          var item = { src: res.data.data.f_img, previous: res.data.data.previous, next: res.data.data.next, mhid: options.id }
          var newlist = that.data.list
          newlist.push(item)
          that.setData({ list: newlist })
        }
      }
    })

    wx.setStorage({
      key: "sort",
      data: options.st
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({ screenHeight: res.windowHeight })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  showimg: function (e) {
    var id = e.currentTarget.dataset.id
    var st = e.currentTarget.dataset.st
    wx.redirectTo({
      url: "/pages/details/details?id=" + id + "&st=" + st,
    })
  },

  // 滚动到顶部/左边
  upper: function (e) {
    var sort = 0
    var that = this
    var len = that.data.list.length
    if (len > 0) {
      var st = that.data.list[0].previous
      var mhid = that.data.list[0].mhid
      console.log("st:" + st)
      if (a && st > 0) {
        a = false
        wx.request({
          url: config.imgInfolUrl,
          data: { id: that.data.list[0].mhid, st: st },
          success: function (res) {
            if (res.data.status == 1) {
              var item = { src: res.data.data.f_img, previous: res.data.data.previous, next: res.data.data.next, mhid: mhid }
              var newlist = that.data.list
              newlist.push(item)
              that.setData({ list: newlist })

              wx.setStorage({
                key: "sort",
                data: st
              })
            }
          },
          complete: function () {
            a = true
          }
        })
      }
    }
  },

  // 滚动到底部/右边
  lower: function (e) {
    var sort = 0
    var that = this
    var len = that.data.list.length
    if (len > 0) {
      var st = that.data.list[len - 1].next
      var mhid = that.data.list[len - 1].mhid
      if (b && st > 0) {
        b = false
        wx.request({
          url: config.imgInfolUrl,
          data: { id: that.data.list[len - 1].mhid, st: st },
          success: function (res) {
            if (res.data.status == 1) {
              var item = { src: res.data.data.f_img, previous: res.data.data.previous, next: res.data.data.next, mhid: mhid }
              var newlist = that.data.list
              newlist.push(item)
              that.setData({ list: newlist })

              wx.setStorage({
                key: "sort",
                data: st
              })
            }
          },
          complete: function () {
            b = true
          }
        })
      }
    }
  }
})