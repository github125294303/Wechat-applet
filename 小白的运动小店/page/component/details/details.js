// page/component/details/details.js
const utli = require('../util/util.js')
Page({
  data: {
    goods: {},
    num: 1,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false
  },
  onLoad: function (options) {// 页面初始化 options为页面跳转所带来的参数
    utli.ajax().then((data) => {
      this.setData({
        goods: data.data.filter((item) => options.id == item.id)[0]
      })
    });
  },
  //数量增加
  addCount() {
    let num = this.data.num;
    num = ++num;
    this.setData({
      num: num
    })
  },
//添加到购物车
  addToCart(e) {
    let goods = this.data.goods;
    // console.log(wx.getStorageSync('carts'))
    let arr = wx.getStorageSync('carts') || [];
    
    if (arr.some((item)=>item.id==goods.id)){
      console.log(this.data.num)
      arr.find((item) => item.id == goods.id).num+=this.data.num;
    }else{
      arr.push({...goods,num:this.data.num});
    }

      wx.setStorageSync("carts", arr);



    const self = this;
    const num = this.data.num;
    let total = this.data.totalNum;
    self.setData({
      show: true
    })
    setTimeout(function() {
      self.setData({
        show: false,
        scaleCart: true
      })
      setTimeout(function() {
        self.setData({
          scaleCart: false,
          hasCarts: true,
          totalNum: num + total
        })
      }, 200)
    }, 300)
  },


  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    console.log(e)
    this.setData({
      curIndex: index
    })
  }

})