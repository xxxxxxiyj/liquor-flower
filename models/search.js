import {HTTP} from '../util/http.js'
class SearchModel extends HTTP {
  max = 10
  key = 'q'

  getHotKeyword(callback) {
    this.request({
      url: '/book/hot_keyword',
      success: (res) => {
        callback(res)
      }
    })
  }
  getHistoryKey() {
    return wx.getStorageSync(this.key)
  }
  addHistoryKey(key) {
    let keywords = this.getHistoryKey()
    if(keywords) {
      if(keywords.indexOf(key) == -1) {
        let length = keywords.length
        if(length >= this.max) {
          keywords.pop()
        }
        keywords.unshift(key)
      }
      wx.setStorageSync(this.key, keywords)
    } else {
      keywords = [key]
      wx.setStorageSync(this.key, keywords)
    }
  }
}

export {SearchModel}