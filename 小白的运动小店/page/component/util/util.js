//ajax封装 一般工具类都放在util文件夹下面
let ajax = (url = "https://www.easy-mock.com/mock/5c1c8982598a9d0a0141adc9/shops", data, method = 'GET') => {
  //http://192.168.38.135:8881
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,// 仅为示例，并非真实的接口地址
      data:{},//这个data是传到后台的，现在相当于往后台传的是空
      method: 'get',
      success: resolve,
      fail: reject
    })
  })
}
let fn = () => {
  console.log(1)
}
export { ajax, fn }