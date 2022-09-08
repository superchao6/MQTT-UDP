// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    device:null,
    get_data:{"Kp1":0,"Ki1":0,"Kd1":0,"Kp2":0,"Ki2":0,"Kd2":0},
    deviceName : null,
    connecte : 0,
  }
})
