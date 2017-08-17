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
          var item = {
            src: res.data.data.f_img,
            previous: res.data.data.previous,
            next: res.data.data.next,
            mhid: options.id,
            st: parseInt(options.st)
          }
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

    var that = this;
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
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
    var ts = new Date().getTime()
    if (timeStamp != 0) {
      if (!(1 < (ts - timeStamp) / 1000)) {
        return
      } else {
        timeStamp = ts
      }
    } else {
      timeStamp = ts
    }
    var sort = 0
    var that = this
    var len = that.data.list.length
    if (len > 0) {
      var st = that.data.list[0].previous
      var mhid = that.data.list[0].mhid
      if (st > 0) {
        wx.showLoading({
          title: "加载上一章",
          mask: true
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
            wx.hideLoading()
          },
          fail: function () {
            wx.hideLoading()
          },
          complete: function () {
            console.log(that.data.list)
          }
        })
      }

      if (st == 0) {
        that.setData({ ab: true })
      }
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var ts = new Date().getTime()
    if (timeStamp != 0) {
      if (!(1 < (ts - timeStamp) / 1000)) {
        return
      } else {
        timeStamp = ts
      }
    } else {
      timeStamp = ts
    }
    var sort = 0
    var that = this
    var len = that.data.list.length
    if (len > 0) {
      var st = that.data.list[len - 1].next
      var mhid = that.data.list[len - 1].mhid
      if (st > 0) {
        wx.showLoading({
          title: "加载下一章",
          mask: true
        })
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
                that.setData({ list: newlist })

                wx.setStorage({
                  key: "sort",
                  data: st
                })
              }
            }
            wx.hideLoading()
          },
          fail: function () {
            wx.hideLoading()
          },
          complete: function () {
            console.log(that.data.list)
          }
        })
      }

      if (st == 0) {
        that.setData({ bb: true })
      }
    }
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
        wx.showLoading({
          title: "加载上一章",
          mask: true
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
            wx.hideLoading()
          },
          fail: function () {
            wx.hideLoading()
          },
          complete: function () {
            console.log(that.data.list)
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
        wx.showLoading({
          title: "加载下一章",
          mask: true
        })
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
                that.setData({ list: newlist })

                wx.setStorage({
                  key: "sort",
                  data: st
                })
              }
            }
            wx.hideLoading()
          },
          fail: function () {
            wx.hideLoading()
          },
          complete: function () {
            console.log(that.data.list)
          }
        })
      }

      if (st == 0) {
        that.setData({ bb: true })
      }
    }
  },

  scroll: function (e) {
    this.setData({
      scrollTop: e.detail.scrollTop
    });
  },
})