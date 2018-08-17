// components/preview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    preview: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function() {
      this.triggerEvent('predetail', {
        id: this.properties.preview.id,
        type: this.properties.preview.type
      })
    }
  }
})
