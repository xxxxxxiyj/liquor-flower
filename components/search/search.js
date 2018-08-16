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
    hotKeyword: [],
    finished: false,
    books: []
  },

  attached: function () {
    searchModel.getHotKeyword((res) => {
      console.log(res)
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
    onConfirm: function(event) {
      this.setData({
        finished: true
      })
      let val = event.detail.value
      http.request({
        url: '/book/search',
        data: {
          summary: 1,
          q: val
        },
        success: (res) => {
          console.log(res)
          this.setData({
            books: res.books
          })
        }
      })
    }
  }
})
