import {HTTP} from '../util/http.js'
class SearchModel extends HTTP {
  getHotKeyword(callback) {
    this.request({
      url: '/book/hot_keyword',
      success: (res) => {
        callback(res)
      }
    })
  }
}

export {SearchModel}