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
    more: {
      type: String,
      observer: '_loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyKey: [],
    hotKeyword: [],
    finished: false,
    empty: false,
    ending: false,
    books: [],
    val: '',
    loading: false,
    loadingCenter: false,
    start: 0,
    count: 20
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
      this._initPagination()
      let val = event.detail.value || event.detail.text
      this.setData({
        finished: true,
        loadingCenter: true,
        val: val
      })
      http.request({
        url: '/book/search',
        data: {
          summary: 1,
          q: val,
          start: this.data.start
        },
        success: (res) => {
          this._setMoreData(res.books)
          this.setData({
            loadingCenter: false
          })
          if(res.count == 0) {
            this.setData({
              empty: true
            })
          }
        }
      })
      searchModel.addHistoryKey(val)
    },
    _setMoreData: function(data) {
      if(!data) {
        this.data.ending = true
        if(!this.data.books) {
          this.setData({
            empty: true
          })
        }
      }
      let temp = this.data.books.concat(data)
      let newStart = this.data.start + this.data.count
      // this.data.start += this.data.count
      this.setData({
        books: temp,
        start: newStart
      })
      return true
    },
    _loadMore: function() {
      // console.log('val:', this.data.val)
      if(!this.data.val) return
      // if(!this.data.ending) return
      this.setData({
        loading: true
      })
      http.request({
        url: 'book/search',
        data: {
          q: this.data.val,
          start: this.data.start,
          summary: 1,
        },
        success: (res) => {
          this._setMoreData(res.books)
          this.setData({
            loading: false
          })
        }
      })
    },
    _initPagination: function() {
      // 每次搜索前将数据初始化
      this.setData({
        ending: false,
        loading: false,
        finished: false,
        start: 0,
        books: []
      })
    }
  }
})
