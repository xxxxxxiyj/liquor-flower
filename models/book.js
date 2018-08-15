import { HTTP } from '../util/http.js'
class BookModel extends HTTP {
  getHotList(callback) {
    this.request({
      url: '/book/hot_list',
      success: (res) => {
        callback(res)
      }
    })
  }
  getDetail(id, callback) {
    this.request({
      url: '/book/' + id + '/detail',
      success: (res) => {
        callback(res)
      }
    })
  }
}

export { BookModel }