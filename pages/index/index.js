//index.js


//推荐请求地址
const tuiUrl = "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
//排行榜请求地址
const paiUrl = "https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg";
//热门搜索
const hotKey = "https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg";
//搜索接口
const search = "https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?w=搜索的词";




Page({
  data: {
    nowNav: 0,
    tuiData: {},   //推荐的数据
    orderData: [],  //排行榜的数据
    ifLoading: true   //默认是显示loading图
  },
  onLoad: function () {
    var that = this;
    //推荐的请求
    wx.request({
      url: tuiUrl,
      method: 'GET', 
      success: function(res){
        // success
        console.log(res);
        var resData = res.data.data;
        //因为当前的this不是指向的的Page,所以要使用that.
        that.setData({
          tuiData: resData
        });
      }
    });


    //排行榜的请求
    wx.request({
      url: paiUrl,
      data: {
        format: 'json'
      },
      method: 'GET', 
      success: function(res){
        // success
        console.log(res.data.data.topList);  //拿到排行榜的数据
        that.setData({
          orderData: res.data.data.topList,
          ifLoading: false   //这里已经拿到数据了了，所以需要把把ifLoading 设置为为false
        })

      }
    })

  },


  //定义菜单切换的函数
  changeNav(e){
    //获取当前元素的的data-index的值  ＝＝＝＝ e.target.dataset.index
    //e.target ===表示当前元素
   let index = e.target.dataset.index;

   this.setData({
     nowNav: index
   });

   //判断排行榜的数据有没有，如果有就把ifLoading设置为为false
   if(this.data.orderData.length){
     this.setData({
       ifLoading: false
     })
   };
   
  }


})








