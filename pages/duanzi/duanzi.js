var detail = '../content/content'
Page({
  data: {
    list: [],
    maxtime: '',
    loadingHidden: false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.requestData('newlist');

  },
  onReachBottom: function () {
    console.log('onLoad')
    var that = this
    that.requestData('list')
  },

  /**
   * 加载数据
   */
  requestData: function (a) {
    var that = this;
    wx.request({
      url: 'https://api.budejie.com/api/api_open.php',
      data: {
        a: a,
        c: 'data',
        // 上一页的maxtime作为加载下一页的条件，
        maxtime: this.data.maxtime,
        type: '29',
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          // 拼接数组
          list: [...that.data.list,...res.data.list].map(item=>{
              item.passtime = item.passtime.substring(0,10)
              return item
          }),
          loadingHidden: true,
          maxtime: res.data.info.maxtime
        })

      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})