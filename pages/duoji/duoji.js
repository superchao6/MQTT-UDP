// pages/duoji/duoji.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        canvas_width: 350,
        canvas_height: 300,
        currentValue: 50,
        angle:0,
        x:0,
        y:0,
        udp_send:'',
        slider_value:0,
    },

    draw(){
        wx.createSelectorQuery()
        .select('#myCanvas')
          .fields({ node: true, size: true })
          .exec((res) => {
            // Canvas 对象
            const canvas = res[0].node
            this.canvas = canvas
            // Canvas 画布的实际绘制宽高
            const width = res[0].width
            const height = res[0].height
    
            // 创建canvas渲染上下文
            const ctx = canvas.getContext('2d')

            // 初始化画布大小
            const dpr = wx.getWindowInfo().pixelRatio
            canvas.width = width * dpr
            canvas.height = height * dpr
            ctx.scale(dpr, dpr)

            // 清空画布
            ctx.clearRect(0, 0, width, height)

            var width1 = this.data.canvas_width*(50/350)
            var width2 = this.data.canvas_width*(250/350)
            var width3 = this.data.canvas_width - width1 - width2
            var height1 = this.data.canvas_height/3

            //左上左下 灰色
            ctx.fillStyle = "#D3D3D3";            
            ctx.fillRect(0, 0, width1, height1);        
            ctx.fillRect(0, height1*2, width1, height1);
            //左中 右 蓝色
            ctx.fillStyle = '#4169E1';
            ctx.fillRect(0, height1, width1, height1);
            ctx.fillRect(width2 + width1, 0, width3, this.data.canvas_height);
            //中中 黄色
            ctx.fillStyle = "#FAFAD2";
            ctx.fillRect(width1, 0, width2, this.data.canvas_height);
            //右 绿色
            ctx.fillStyle = "#90EE90";
            // ctx.fillRect(width2 + width1, 0, width3, this.data.canvas_height);
            //绘制直线
            ctx.beginPath()
            ctx.strokeStyle = '#90EE90'
            ctx.setLineDash([5, 10], 5)
            // ctx.lineDashOffset="2"
            // this.data.y = (250+x)*Math.tan(this.data.angle)
            ctx.lineWidth = '4'
            ctx.lineCap = 'round'         
            ctx.moveTo(width1, this.data.canvas_height/2)
            ctx.lineTo(width1 + width2 + 20, this.data.canvas_height/2 + this.data.x)   
            ctx.fill()
            ctx.stroke()

            //舵机端
            ctx.beginPath()
            ctx.fillStyle = "#1C1C1C";
            ctx.arc(width1, this.data.canvas_height/2, 10, 0, 2*Math.PI,false)
            ctx.fill()
            //目标端
            ctx.beginPath()
            ctx.fillStyle = "#EE3B3B";
            ctx.arc(width1 + width2 + 20, this.data.canvas_height/2 + this.data.x, 8, 0, 2*Math.PI,false)
            ctx.fill()
        })
    },

    sliderchanging(res){

        this.data.udp_send.send({
            address: "192.168.0.101",
            port: 3002,
            message: '{"y":"' + this.data.x + '","d":"0","s":"0","t":"0"}'//{"y":"xx","d":"xx","s":"xx","t":"xx"}
        })

        console.log(res.detail.value)
        this.setData({
            slider_value:res.detail.value,
            x:res.detail.value
        })
        this.draw()
        console.log(this.data.x)
    },

    sliderchange(res){

        this.data.udp_send.send({
            address: "192.168.0.101",
            port: 3002,
            message: '{"y":"' + this.data.x + '","d":"0","s":"0","t":"0"}'//{"y":"xx","d":"xx","s":"xx","t":"xx"}
        })

        console.log(res.detail.value)
        this.setData({
            slider_value:res.detail.value,
            x:res.detail.value
        })
        this.draw()
        console.log(this.data.x)
    },

    input_x(res){
        console.log(res)
    },

    tap2_0(){
        this.setData({
            slider_value:this.data.slider_value + 2,
            x:this.data.x + 2
        })
        this.draw()
        this.data.udp_send.send({
            address: "192.168.0.101",
            port: 3002,
            message: '{"y":"' + this.data.x + '","d":"0","s":"0","t":"0"}'//{"y":"xx","d":"xx","s":"xx","t":"xx"}
        })
    },

    tap5_0(){
        this.setData({
            slider_value:this.data.slider_value + 5,
            x:this.data.x + 5
        })
        this.draw()
        this.data.udp_send.send({
            address: "192.168.0.101",
            port: 3002,
            message: '{"y":"' + this.data.x + '","d":"0","s":"0","t":"0"}'//{"y":"xx","d":"xx","s":"xx","t":"xx"}
        })
    },

    tap10_0(){
        this.setData({
            slider_value:this.data.slider_value + 10,
            x:this.data.x + 10
        })
        this.draw()
        this.data.udp_send.send({
            address: "192.168.0.101",
            port: 3002,
            message: '{"y":"' + this.data.x + '","d":"0","s":"0","t":"0"}'//{"y":"xx","d":"xx","s":"xx","t":"xx"}
        })
    },

    tap20_0(){
        this.setData({
            slider_value:this.data.slider_value + 20,
            x:this.data.x + 20
        })
        this.draw()
        this.data.udp_send.send({
            address: "192.168.0.101",
            port: 3002,
            message: '{"y":"' + this.data.x + '","d":"0","s":"0","t":"0"}'//{"y":"xx","d":"xx","s":"xx","t":"xx"}
        })
    },

    tap2_1(){
        this.setData({
            slider_value:this.data.slider_value - 2,
            x:this.data.x - 2
        })
        this.draw()
        this.data.udp_send.send({
            address: "192.168.0.101",
            port: 3002,
            message: '{"y":"' + this.data.x + '","d":"0","s":"0","t":"0"}'//{"y":"xx","d":"xx","s":"xx","t":"xx"}
        })
    },

    tap5_1(){
        this.setData({
            slider_value:this.data.slider_value - 5,
            x:this.data.x - 5
        })
        this.draw()
        this.data.udp_send.send({
            address: "192.168.0.101",
            port: 3002,
            message: '{"y":"' + this.data.x + '","d":"0","s":"0","t":"0"}'//{"y":"xx","d":"xx","s":"xx","t":"xx"}
        })
    },

    tap10_1(){
        this.setData({
            slider_value:this.data.slider_value - 10,
            x:this.data.x - 10
        })
        this.draw()
        this.data.udp_send.send({
            address: "192.168.0.101",
            port: 3002,
            message: '{"y":"' + this.data.x + '","d":"0","s":"0","t":"0"}'//{"y":"xx","d":"xx","s":"xx","t":"xx"}
        })
    },

    tap20_1(){
        this.setData({
            slider_value:this.data.slider_value - 20,
            x:this.data.x - 20
        })
        this.draw()
        this.data.udp_send.send({
            address: "192.168.0.101",
            port: 3002,
            message: '{"y":"' + this.data.x + '","d":"0","s":"0","t":"0"}'//{"y":"xx","d":"xx","s":"xx","t":"xx"}
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const info = wx.getWindowInfo()
        console.log(info)
        this.setData({
            canvas_width:info.windowWidth,
            canvas_height:this.data.canvas_width*(300/350)
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.draw()
                
        this.data.udp_send = wx.createUDPSocket();//创建UDP发送实例

        this.data.udp_send.bind(4001)//4002
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
        this.data.udp_send.close()
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
    
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})