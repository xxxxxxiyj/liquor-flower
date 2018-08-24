// pages/classic/classic.js
import {ClassicModel} from '../../models/classic.js'
import {LikeModel} from '../../models/like.js'

let classicModel = new ClassicModel
let likeModel = new LikeModel
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData: null,
    likeStatus: null,
    last: true,
    first: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res) => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classicData: res
      })
    })
  },
  onLike: function (event) {
    let behaviour = event.detail.behaviour
    likeModel.like(behaviour, this.data.classicData.id, this.data.classicData.type)
  },
  onNext: function() {
    this._updateClassic('next')
  },
  onPrevious: function() {
    this._updateClassic('previous')
  },
  _updateClassic: function(nextOrPrevious) {
    let index = this.data.classicData.index
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classicData: res,
        first: classicModel.isFirst(res.index),
        last: classicModel.isLast(res.index)
      })
    })
  },
  // 获取喜欢状态，喜欢状态不可直接从缓存中读取
  _getLikeStatus(id, type) {
    likeModel.getClassicLikeStatus(id, type, (res) => {
      this.setData({
        likeStatus: res
      })
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
    wx.showNavigationBarLoading()
    wx.startPullDownRefresh({
      success: (err) => {
        let artId = this.data.classicData.id
        let artType = this.data.classicData.type
        classicModel.getDetail(artId, artType, (res) => {
          this.setData({
            classicData: res
          })
          wx.setStorageSync(`classic-${artId}`, res)
        })
      }
    })
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
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