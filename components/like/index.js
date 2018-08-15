// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLiked: {
      type: Boolean
    },
    count: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    like: 'images/like_active.png',
    unlike: 'images/like_normal.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function(event) {
      let liked = this.properties.isLiked
      let count = this.properties.count
      // console.log(liked)
      this.setData({
        isLiked: !liked,
        count: liked ? count - 1 : count + 1
      })

      let behaviour = this.properties.isLiked ? 'like' : 'cancel'
      this.triggerEvent('like', {
        behaviour: behaviour
      },)
    }
  }
})
