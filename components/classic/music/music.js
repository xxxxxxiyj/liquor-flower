// components/classic/music/music.js
import {
  classicBeh
} from '../classic_beh.js'

let musicMgr = wx.getBackgroundAudioManager()

Component({
  behaviors: [classicBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    src: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    music: 'images/music_tag.png',
    waittingUrl: 'images/player_waitting.png',
    playingUrl: 'images/player_playing.png'
  },

  attached: function() {
    this._checkState()
    this._monitorSwitch()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function() {
      if (!this.data.playing) {
        musicMgr.src = this.properties.src
        this.setData({
          playing: true
        })
      } else {
        musicMgr.pause()
        this.setData({
          playing: false
        })
      }
    },
    _checkState() {
      if(musicMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (this.data.src == musicMgr.src) {
        if(!musicMgr.paused) {
          this.setData({
            playing: true
          })
        }
      }
    },
    _monitorSwitch() {
      musicMgr.onPlay(() => {
        this._checkState()
      })
      musicMgr.onPause(() => {
        this._checkState()
      })
      musicMgr.onStop(() => {
        this._checkState()
      })
      musicMgr.onEnded(() => {
        this._checkState()
      })
    }
  }
})