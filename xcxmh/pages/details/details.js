const config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: "",
    previous: 0,
    next: 0,
    mhid: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id + ":" + options.st)
    var that = this;
    wx.request({
      url: config.imgInfolUrl,
      data: { id: options.id, st: options.st },
      success: function (res) {
        if (res.data.status == 1) {
          that.setData({ src: res.data.data.f_img, previous: res.data.data.previous, next: res.data.data.next, mhid: options.id })
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
  }
})