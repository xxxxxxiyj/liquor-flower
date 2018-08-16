// components/search/search.js
import {HTTP} from '../../util/http.js'
import {SearchModel} from '../../models/search.js'

let http = new HTTP()
let searchModel = new SearchModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyKey: [],
    hotKeyword: [],
    finished: false,
    books: [],
    val: ''
  },

  attached: function () {
    this.setData({
      historyKey: searchModel.getHistoryKey()  
    })
    searchModel.getHotKeyword((res) => {
      this.setData({
        hotKeyword: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel: function() {
      this.triggerEvent('cancel')
    },
    onDelete: function() {
      this.setData({
        finished: false,
        val: ''
      })
    },
    onConfirm: function(event) {
      let val = event.detail.value || event.detail.text
      this.setData({
        finished: true,
        val: val
      })
      http.request({
        url: '/book/search',
        data: {
          summary: 1,
          q: val
        },
        success: (res) => {
          // console.log(res)
          this.setData({
            books: res.books
          })
        }
      })
      searchModel.addHistoryKey(val)
    }
  }
})
