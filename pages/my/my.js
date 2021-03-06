// pages/my/my.js
import {ClassicModel} from '../../models/classic.js'
import {BookModel} from '../../models/book.js'

let classicModel = new ClassicModel
let bookModel = new BookModel

Page({

  /**
   * 页面的初始数据
   */
  data: {
    likeData: null,
    userInfo: null,
    count: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onPreview: function(event) {
    console.log(event)
    wx.navigateTo({
      url: '../classic-detail/classic-detail?id=' + event.detail.id + '&type=' + event.detail.type
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
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
              this.setData({
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
    classicModel.getFavor((res) => {
      this.setData({
        likeData: res
      })
    })
    bookModel.getLikeCount((res) => {
      this.setData({
        count: res.count
      })
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
  
  }
})