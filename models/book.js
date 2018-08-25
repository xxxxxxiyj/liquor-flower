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
  getLikeCount(callback) {
    this.request({
      url: '/book/favor/count',
      success: (res) => {
        callback(res)
      }
    })
  }

  getLikeStatus(id, callback) {
    this.request({
      url: `/book/${id}/favor`,
      success: (res) => {
        callback(res)
      }
    })
  }

  getComment(id, callback) {
    this.request({
      url: `/book/${id}/short_comment`,
      success: (res) => {
        callback(res)
      }
    })
  }
}

export { BookModel }