 // page/component/new-pages/cart/cart.js
// getApp
const utli = require('../util/util.js')
Page({
  data: {
    carts:[],               // 购物车列表
    hasList:false,          // 列表是否有数据
    toNum:0, 
    totalPrice:0,           // 总价，初始为0
    toNum:0,//初始数量
    selectAllStatus:false,    // 全选状态，默认全选
    obj:{
        name:"hello"
    }
  },
  onShow() {
    
    let carts = wx.getStorageSync('carts');
    if (carts){
      this.setData({
        hasList: true,
        carts:carts
      });
      // console.log(carts)
    }
      
    this.getTotalPrice();
  },
  onHide(){
    let data = this.data.carts.filter(item=>item.selected);
    wx.setStorageSync("orders", data);
  },
  /**
   * 当前商品选中事件
   */
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    const selected = carts[index].selected;//判断选中的id
    carts[index].selected = !selected;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
    this.updata()
  },
 updata(){
   wx.setStorageSync("carts", this.data.carts)
 },
  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    carts.splice(index,1);
    this.setData({
      carts: carts
    });
    if(!carts.length){
      this.setData({
        hasList: false
      });
    }else{
      this.getTotalPrice();
    }
    this.updata()
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();
    this.updata()
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    num = num+1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
    this.updata()
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let carts = this.data.carts;
    let num = carts[index].num;
    if(num <= 1){
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
    this.updata()
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    // console.log(carts)
    let total = 0;
    let tonum = 0;
    console.log(carts.filter(item => item.selected === true));
    total = carts.filter(item => item.selected === true).reduce((prev, next) =>{
      tonum +=  next.num;
      return prev + next.num * parseInt(next.picTxt.slice(1));
    },0)
    this.setData({                                // 最后赋值到data中渲染到页面
      toNum: tonum,
      totalPrice: total.toFixed(2),//toFixed() 把 Number 四舍五入为指定小数位数的数字
    });
  },
  toMine(){
    // let carts = this.data.carts;
    // // console.log(wx.getStorageSync('carts'))
    // let arrs = wx.getStorageSync('orders') || [];

    // if (carts.some((item) => item.id == carts.id)) {
    //   console.log(this.data.num)
    //   arrs.find((item) => item.id == carts.id).num += this.data.num;
    // } else {
    //   arrs.push({ ...carts, num: this.data.num });
    // }
    // wx.setStorageSync("orders", arrs);
    }
})