// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:['山东省','青岛市','崂山区'],
      tmp:0,
      cond_txt:'未知',
      cond_code:'999',
      hum:0,
      pres:0,
      vis:0,
      wind_dir:0,
      wind_spd:0,
      wind_sc:0,
    localID:101120202
  },

  getLocationID(city,area){
    var that=this
    wx.request({
      url: 'https://geoapi.qweather.com/v2/city/lookup?',
      method:"GET",
      data:{
      location:area,
      adm:city,
      key:'a206001c12e449c6bb6dc6c83ef9ab4f'
      },
        success:function(res){
          that.getWeather(res.data.location[0].id)
          that.setData({
            localID:res.data.location[0].id
        })
      }
    })
  },

  regionChange: function(e) {
    this.setData({region:e.detail.value});
    this.getLocationID(e.detail.value[1],e.detail.value[2])
    this.getWeather(this.localID);
  },

  onLoad: function (options) {
    this.getLocationID('青岛市','崂山区')
    this.getWeather(101120202)
  },

  getWeather: function(id) {
    var that = this;
    wx.request({
      url: 'https://devapi.qweather.com/v7/weather/now?',
      data:{
        location:id,
        key:'a206001c12e449c6bb6dc6c83ef9ab4f'
      },
      success:function(res) {
        var resdata = res.data.now
        console.log(resdata);
        that.setData({
          tmp:resdata.temp,
          cond_txt:resdata.text,
          cond_code:resdata.icon,
          hum:resdata.humidity,
          pres:resdata.pressure,
          vis:resdata.vis,
          wind_dir:resdata.windDir,
          wind_spd:resdata.windSpeed,
          wind_sc:resdata.windScale  
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  

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
    
  }
})