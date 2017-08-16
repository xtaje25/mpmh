const config = require('../../config')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    info: {},
    sort: 0,
    mhid: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.request({
      url: config.imgListUrl,
      success: function (res) {
        if (res.data.status == 1) {
          that.setData({ list: res.data.data })
        }
      }
    })

    wx.request({
      url: config.mhInfoUrl,
      success: function (res) {
        if (res.data.status == 1) {
          that.setData({ info: res.data.data })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'sort',
      success: function (res) {
        that.setData({ sort: res.data })
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
  onShareAppMessage: function (e) {
    var that = this;
    return {
      title: that.data.info.f_catalog,
      desc: that.data.info.f_about,
      path: '/pages/dir/dir',
      success: function (res) {

      },
      fail: function (res) {

      }
    }
  },

  showimg: function (e) {
    var id = e.currentTarget.dataset.id
    var st = e.currentTarget.dataset.st
    wx.navigateTo({
      url: "/pages/details/details?id=" + id + "&st=" + st,
    })
  }
})