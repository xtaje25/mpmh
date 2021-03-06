const config = require('../../config')

var timeStamp = 0

function contains(arr, obj) {
  var i = arr.length;
  while (i--) {
    if (arr[i].st === obj.st) {
      return true;
    }
  }
  return false;
}

Page({
  data: {
    screenHeight: 0,
    scrollTop: 0,
    scrollHeight: 0,
    intoview: "",
    ab: false,
    bb: false,
    loading: false,
    showarr: [],
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: config.imgInfolUrl2,
      data: { id: options.id, st: options.st },
      success: function (res) {
        if (res.data.status == 1) {
          var newlist = []
          for (var i = 0; i < res.data.data.length; i++) {
            var item = {
              src: res.data.data[i].f_img,
              previous: res.data.data[i].previous,
              next: res.data.data[i].next,
              mhid: options.id,
              st: parseInt(options.st)
            }
            newlist = that.data.list
            newlist.push(item)
          }
          that.setData({ list: newlist })
        }
      }
    })

    wx.setStorage({
      key: "sort",
      data: options.st
    })

    wx.getSystemInfo({
      success: function (res) {
        that.setData({ screenHeight: res.windowHeight })
      }
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
  onPullDownRefresh: function (e) {
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

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
    if (timeStamp != 0) {
      if (!(1 < (e.timeStamp - timeStamp) / 1000)) {
        return
      } else {
        timeStamp = e.timeStamp
      }
    } else {
      timeStamp = e.timeStamp
    }
    var sort = 0
    var that = this
    var len = that.data.list.length
    if (len > 0) {
      var st = that.data.list[0].previous
      var mhid = that.data.list[0].mhid
      if (st > 0) {
        wx.showToast({
          title: '上一章',
          icon: 'loading',
          duration: 2000
        })
        wx.request({
          url: config.imgInfolUrl,
          data: { id: that.data.list[0].mhid, st: st },
          success: function (res) {
            if (res.data.status == 1) {
              var item = {
                src: res.data.data.f_img,
                previous: res.data.data.previous,
                next: res.data.data.next,
                mhid: mhid,
                st: st
              }
              var newlist = that.data.list
              if (!contains(newlist, item)) {
                newlist.unshift(item)
                that.setData({ list: newlist, intoview: 'id' + item.next })

                wx.setStorage({
                  key: "sort",
                  data: st
                })
              }
            }
          },
          fail: function () {

          },
          complete: function () {

          }
        })
      }

      if (st == 0) {
        that.setData({ ab: true })
      }
    }
  },

  // 滚动到底部/右边
  lower: function (e) {
    if (timeStamp != 0) {
      if (!(1 < (e.timeStamp - timeStamp) / 1000)) {
        return
      } else {
        timeStamp = e.timeStamp
      }
    } else {
      timeStamp = e.timeStamp
    }
    var sort = 0
    var that = this
    var len = that.data.list.length
    if (len > 0) {
      var st = that.data.list[len - 1].next
      var mhid = that.data.list[len - 1].mhid
      if (st > 0) {
        that.setData({ loading: true })
        wx.request({
          url: config.imgInfolUrl,
          data: { id: that.data.list[len - 1].mhid, st: st },
          success: function (res) {
            if (res.data.status == 1) {
              var item = {
                src: res.data.data.f_img,
                previous: res.data.data.previous,
                next: res.data.data.next,
                mhid: mhid,
                st: st
              }
              var newlist = that.data.list
              if (!contains(newlist, item)) {
                newlist.push(item)
                that.setData({ list: newlist, loading: false })

                wx.setStorage({
                  key: "sort",
                  data: st
                })
              }
            }
          },
          fail: function () {
            that.setData({ loading: false })
          },
          complete: function () {

          }
        })
      }

      if (st == 0) {
        that.setData({ bb: true })
      }
    }
  },

  scroll: function (e) {
    var that = this
    this.setData({
      scrollTop: e.detail.scrollTop,
      scrollHeight: e.detail.scrollHeight / that.data.list.length
    });
  },
})