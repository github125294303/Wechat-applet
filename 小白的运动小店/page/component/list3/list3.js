// page/component/list/list.js
const utli = require('../util/util.js')
Page({
  data: {
    pageIndex: 1,//请求页面下标
    pageSize: 8,//每页展示数量
    pageCount: 0,//总页数
    amount: 0,//总条数
    logs3: [],
    flag: false,
    text: "加载中........."
  },
  onLoad: function (options) {
    utli.ajax().then((data)=>{
      this.setData({
        array3:data.data.filter((item)=>item.classId==3),
        amount:Math.ceil(data.data.filter((item)=>item.classId==3).length/this.data.pageSize)
      });
      this.fenye()
    })
    // 页面初始化 options为页面跳转所带来的参数
  },
  fenye(){
    let  { pageIndex, pageSize, amount, array3 } = this.data;
    this.setData({
      logs3:[...this.data.logs3,...array3.slice((pageIndex-1)*pageSize,(pageIndex*pageSize))],
      pageIndex:++this.data.pageIndex
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
  },
  onReachBottom: function () {//上拉触底事件
    if (this.data.flag) {
      return;
    }
    let { pageIndex, amount } = this.data;
    if (pageIndex > amount) {
      this.setData({
        text: "已经加载全部了",
        flag: true
      });
      return;
    }
    this.setData({
      flag: true
    });
    setTimeout(() => {
      this.setData({
        flag: false
      });
      this.fenye();
    }, 1000);
  }
})