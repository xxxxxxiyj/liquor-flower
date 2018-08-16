import {
  HTTP
} from '../util/http.js'

class LikeModel extends HTTP {
  like(behaviour, artID, artType) {
    let url = behaviour == 'like' ? 'like' : 'like/cancel'
    this.request({
      url,
      method: 'POST',
      data: {
        art_id: artID,
        type: artType
      }
    })
    // console.log(artID, artType)
  }

  getClassicLikeStatus(artID, artType, callback) {
    this.request({
      url: `classic/${artType}/${artID}/favor`,
      success: (res) => {
        callback(res)
      }
    })
  }
}

export {
  LikeModel
}