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
      // console.log(res)
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
    this._getLikeStatus()
  },
  onPrevious: function() {
    this._updateClassic('previous')
    this._getLikeStatus()
  },
  _updateClassic: function(nextOrPrevious) {
    let index = this.data.classicData.index
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this.setData({
        classicData: res,
        first: classicModel.isFirst(res.index),
        last: classicModel.isLast(res.index)
      })
    })
  },
  _getLikeStatus() {
    likeModel.getClassicLikeStatus(this.data.classicData.id, this.data.classicData.type, (res) => {
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