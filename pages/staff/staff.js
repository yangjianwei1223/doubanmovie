// pages/staff/staff.js
var service = require( '../../service/douban/douban' ),
  utils = require( '../../common/utils/utils' ),
  _fn;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    staff: {},
    screen: {
      minHeight: 'auto'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    var self = this
    utils.showLoading()
    wx.getSystemInfo({
      complete: (res) => {
        this.setData({
          'screen.minHeight': res.windowHeight + 'px'
        })
      },
    }),
    service.getStaffDetail(query.id, function(data) {
      utils.hideLoading()
      wx.setNavigationBarTitle({
        title: data.name,
      })
      data.profession = data.professions.join('/').replace(/\/{2,}/g, '')
      _fn.render.call(self, data)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  preImage: function (event) {
    let list = event.currentTarget.dataset.imagelist.reduce((curr, item) =>{
      curr.push(item.image)
      return curr
    }, [])
    wx.previewImage({
      current: event.currentTarget.dataset.curr,
      urls: list,
    })
  }
})
_fn = {
  render: function(data) {
    this.setData({
      staff: data
    })
  }
}