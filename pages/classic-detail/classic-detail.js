// pages/classic-detail/classic-detail.js
import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'

let classicModel = new ClassicModel
let likeModel = new LikeModel

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData: null,
    likeStatus: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    classicModel.getDetail(options.id, options.type, (res) => {
      this.setData({
        classicData: res
      })
    })
  },
  onLike: function (event) {
    console.log(event)
    let behaviour = event.detail.behaviour
    likeModel.like(behaviour, this.data.classicData.id, this.data.classicData.type)
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