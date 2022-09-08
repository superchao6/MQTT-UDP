const app = getApp();
var send_topic = '/gxnxOzmI2IX/PID1.1/user/wx_to_esp_massage'
// 检测接收的数据是否为json格式
function testJson(str) {
    try {
        let jsonObj = JSON.parse(str);
        if ("string" === typeof str && "object" === typeof jsonObj) {
            return true;
        }
    } catch (error) {
    }
    return false; 
}
Page({
    data: {
        timer:'',

        showModal: false,
        showName:null,
        show_pid:null,
        show_id:null,
        input_temporary:null,

        accuracy: [
            {value: 0.01, name: 0},
            {value: 0.1, name: 1, checked: 'true'},
            {value: 1, name: 2},
            {value: 10, name: 3},
          ],
        accuracy_index:1,

        PID1:[
            {id:0,name:'Kp1', value:null },
            {id:1,name:'Ki1', value:null },
            {id:2,name:'Kd1', value:null },
        ],
        PID2:[
            {id:0,name:'Kp2', value:null },
            {id:1,name:'Ki2', value:null },
            {id:2,name:'Kd2', value:null },
        ],
    },

    showDialogBtn: function(e) {
        // console.log(e.currentTarget.dataset.name + e.currentTarget.dataset.pid)
        this.setData({
            showName:e.currentTarget.dataset.name,
            show_pid:e.currentTarget.dataset.pid,
            show_id:e.currentTarget.dataset.id,
            showModal: true
        })
        console.log("showName:"+this.data.showName)
        console.log("show_pid:"+this.data.show_pid)
    },
    hideModal: function () {
        this.setData({
          showModal: false
        });
    },
    onCancel: function () {
        this.setData({
            input_temporary:null
        })
        this.hideModal();
    },
    onConfirm: function (e) {
        console.log(e.currentTarget.dataset.name)
        if(this.data.show_pid==1){
            var data = this.data.PID1;
            var num = this.data.input_temporary
            data[this.data.show_id].value=Math.round((num) * 100) / 100;
            this.setData({
                PID1:data
            })
        }
        else if(this.data.show_pid==2){
            var data = this.data.PID2;
            var num = this.data.input_temporary
            data[this.data.show_id].value=Math.round((num) * 100) / 100;
            this.setData({
                PID2:data
            })
        }
        this.setData({
            show_pid:null,
            input_temporary:null
        })
        this.hideModal();
        app.device.publish(send_topic, this.getPostData());//通过mqtt向主题发布消息
    },
    input_value(e){
        console.log(e.detail.value)
        this.setData({
            input_temporary:e.detail.value
        })
    },
    add_pid1(e){
        // console.log(e)
        var data = this.data.PID1;
        console.log("index:" + e.currentTarget.dataset.pid1)
        if(e.currentTarget.dataset.pid1 == 0){
            var num=data[e.currentTarget.dataset.pid1].value + this.data.accuracy[this.data.accuracy_index].value
            data[e.currentTarget.dataset.pid1].value=Math.round((num) * 100) / 100;
            this.setData({
                PID1:data
            })
        }else if(e.currentTarget.dataset.pid1 == 1){
            var num=data[e.currentTarget.dataset.pid1].value + this.data.accuracy[this.data.accuracy_index].value
            data[e.currentTarget.dataset.pid1].value=Math.round((num) * 100) / 100;
            this.setData({
                PID1:data
            })
        }else if(e.currentTarget.dataset.pid1 == 2){
            var num=data[e.currentTarget.dataset.pid1].value + this.data.accuracy[this.data.accuracy_index].value
            data[e.currentTarget.dataset.pid1].value=Math.round((num) * 100) / 100;
            this.setData({
                PID1:data
            })
        }
      console.log(this.data.PID1[e.currentTarget.dataset.pid1].value)
      app.device.publish(send_topic, this.getPostData());//通过mqtt向主题发布消息
    },
    add_pid2(e){
        var data = this.data.PID2;
        console.log("index:" + e.currentTarget.dataset.pid2)
        if(e.currentTarget.dataset.pid2 == 0){
            var num=data[e.currentTarget.dataset.pid2].value + this.data.accuracy[this.data.accuracy_index].value
            data[e.currentTarget.dataset.pid2].value=Math.round((num) * 100) / 100;
            this.setData({
                PID2:data
            })
        }else if(e.currentTarget.dataset.pid2 == 1){
            var num=data[e.currentTarget.dataset.pid2].value + this.data.accuracy[this.data.accuracy_index].value
            data[e.currentTarget.dataset.pid2].value=Math.round((num) * 100) / 100;
            this.setData({
                PID2:data
            })
        }else if(e.currentTarget.dataset.pid2 == 2){
            var num=data[e.currentTarget.dataset.pid2].value + this.data.accuracy[this.data.accuracy_index].value
            data[e.currentTarget.dataset.pid2].value=Math.round((num) * 100) / 100;
            this.setData({
                PID2:data
            })
        }
      console.log(this.data.PID2[e.currentTarget.dataset.pid2].value)
      app.device.publish(send_topic, this.getPostData());//通过mqtt向主题发布消息
    },
    minus_pid1(e){
        var data = this.data.PID1;
        console.log("index:" + e.currentTarget.dataset.pid1)
        if(e.currentTarget.dataset.pid1 == 0){
            var num=data[e.currentTarget.dataset.pid1].value - this.data.accuracy[this.data.accuracy_index].value
            data[e.currentTarget.dataset.pid1].value=Math.round((num) * 100) / 100;
            this.setData({
                PID1:data
            })
        }else if(e.currentTarget.dataset.pid1 == 1){
            var num=data[e.currentTarget.dataset.pid1].value - this.data.accuracy[this.data.accuracy_index].value
            data[e.currentTarget.dataset.pid1].value=Math.round((num) * 100) / 100;
            this.setData({
                PID1:data
            })
        }else if(e.currentTarget.dataset.pid1 == 2){
            var num=data[e.currentTarget.dataset.pid1].value - this.data.accuracy[this.data.accuracy_index].value
            data[e.currentTarget.dataset.pid1].value=Math.round((num) * 100) / 100;
            this.setData({
                PID1:data
            })
        }
        app.device.publish(send_topic, this.getPostData());//通过mqtt向主题发布消息
    },
    minus_pid2(e){
        var data = this.data.PID2;
        console.log("index:" + e.currentTarget.dataset.pid2)
        if(e.currentTarget.dataset.pid2 == 0){
            var num=data[e.currentTarget.dataset.pid2].value - this.data.accuracy[this.data.accuracy_index].value
            data[e.currentTarget.dataset.pid2].value=Math.round((num) * 100) / 100;
            this.setData({
                PID2:data
            })
        }else if(e.currentTarget.dataset.pid2 == 1){
            var num=data[e.currentTarget.dataset.pid2].value - this.data.accuracy[this.data.accuracy_index].value
            data[e.currentTarget.dataset.pid2].value=Math.round((num) * 100) / 100;
            this.setData({
                PID2:data
            })
        }else if(e.currentTarget.dataset.pid2 == 2){
            var num=data[e.currentTarget.dataset.pid2].value - this.data.accuracy[this.data.accuracy_index].value
            data[e.currentTarget.dataset.pid2].value=Math.round((num) * 100) / 100;
            this.setData({
                PID2:data
            })
        }
        app.device.publish(send_topic, this.getPostData());//通过mqtt向主题发布消息
    },
    radioChange(e) {
        console.log(e.detail.value)
        this.setData({
            accuracy_index:e.detail.value
        })
    },
    //app.device.publish(send_topic, this.getPostData());//通过mqtt向主题发布消息
    // 得到需要发送的json格式的数据
    getPostData(){
        var payloadJson = {
            Kp1: this.data.PID1[0].value,
            Ki1: this.data.PID1[1].value,
            Kd1: this.data.PID1[2].value,

            Kp2: this.data.PID2[0].value,
            Ki2: this.data.PID2[1].value,
            Kd2: this.data.PID2[2].value,
        }
        console.log("payloadJson " + JSON.stringify(payloadJson))//打印即将发送的json数据
        return JSON.stringify(payloadJson);//返回json数据
    },
    getData: function () {
        var data1 = this.data.PID1;
        var data2 = this.data.PID2;
        var return_data = app.get_data
        if(testJson(return_data)){    
          var result = JSON.parse(return_data)
          data1[0].value = Math.round((result.Kp1) * 100) / 100
          data1[1].value = Math.round((result.Ki1) * 100) / 100
          data1[2].value = Math.round((result.Kd1) * 100) / 100
          data2[0].value = Math.round((result.Kp2) * 100) / 100
          data2[1].value = Math.round((result.Ki2) * 100) / 100
          data2[2].value = Math.round((result.Kd2) * 100) / 100
        }
        this.setData({
            PID1:data1,
            PID2:data2
        })
      },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this;
        this.setData({                    //每隔1s刷新一次
            timer: setInterval(function () {
              _this.getData();
          }, 800)
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

    }
})