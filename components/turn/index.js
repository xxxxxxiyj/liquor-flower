// components/turn/index.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    last: Boolean,
    first: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftSrc: 'images/left.png',
    leftDisSrc: 'images/left_disable.png',
    rightSrc: 'images/right.png',
    rightDisSrc: 'images/right_disable.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft: function () {
      if (!this.properties.last) {
        this.triggerEvent('left') 
      }
    },
    onRight: function() {
      if (!this.properties.first) {
        this.triggerEvent('right')
      }
    }
  }
})
