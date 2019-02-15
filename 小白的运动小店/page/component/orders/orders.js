// page/component/orders/orders.js
Page({
  data:{
    address:{},//放个人信息的
    hasAddress: false,//默认这个框不显示
    total:0,
    orders:[]
  },
onLoad(){
 
},
  onReady() {
    this.getTotalPrice();
  },
  
  onShow:function(){
    let orders = wx.getStorageSync('carts');
    console.log(orders)
    this.setData({
      orders: orders.filter((item) => item.selected)
    })
    const self = this;
    wx.getStorage({
      key:'address',
      success(res) {
        console.log(res)
        self.setData({
          address: res.data,
          hasAddress: true
        })
      }
    })
  },
  updata() {
    wx.setStorageSync("carts", this.data.orders)
  },
// 删除商品
  delList(e){
    console.log
    const index = e.currentTarget.dataset.id;
    let orders = this.data.orders;
    orders.splice(index, 1);
    this.setData({
      orders: orders
    });
    let arr = wx.getStorageSync("carts")||[];
    arr.find(item => item.id == e.target.dataset.id).selected = false;
    wx.setStorageSync("carts", arr)
  },
  /**
   * 计算总价
   */
  getTotalPrice() {
    let orders = this.data.orders;
    let tota = 0;
    tota = orders.filter(item => item.selected === true).reduce((prev, next) => {
      return prev + next.num * parseInt(next.picTxt.slice(1));
    }, 0)
    this.setData({
      total: tota
    })
  },

  toPay() {
    if(this.data.orders.length==0){
      wx.showModal({
        title: '提示',
        content: '您还没有商品，请添加',
        text: 'center'
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '想付钱？想买东西？就不让你买！(除非...你加我微信，咱们聊聊)',
        text: 'center'
      })
    }
    
  }
})