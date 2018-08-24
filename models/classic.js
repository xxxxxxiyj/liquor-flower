import {
  HTTP
} from '../util/http.js'
class ClassicModel extends HTTP {
  getLatest(callback) {
    this.request({
      url: '/classic/latest',
      success: (res) => {
        callback(res)
        wx.setStorageSync('lastIndex', res.index)
      }
    })
  }

  // index: 当前页面id 
  getClassic(index, nextOrPrevious, callback) {
    let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (classic) {
      callback(classic)
    } else {
      this.request({
        url: '/classic/' + index + '/' + nextOrPrevious,
        success: (res) => {
          wx.setStorageSync(key, res)
          callback(res)
        }
      })
    } 
  }

  getFavor(callback) {
    this.request({
      url: '/classic/favor',
      success: (res) => {
        callback(res)
      }
    })
  }
  getDetail(artId, artType, callback) {
    this.request({
      url: `/classic/${artType}/${artId}`,
      success: (res) => {
        callback(res)
      }
    })
  }

  isFirst(index) {
    return index == 1
  }

  isLast(index) {
    return index == wx.getStorageSync('lastIndex')
  }

  _getKey(key) {
    return 'classic-' + key
  }
}

export {
  ClassicModel
}