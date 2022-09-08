// var UDP = require("../../utils/UDPSocket.js")
var encoding = require("../../utils/encoding");
Page({
    
    /**
     * 页面的初始数据
     */
    data: {
        Local_IP:'',
        Other_IP:'192.168.0.101',//A:192.168.0.188;B:192.168.0.101
        receive_port:'3001',
        send_port:'3002',
        connecte_flag:false,
        connecte_show:"连接",
        inputing_massage:'',
        send_massage:'',
        listen_massage:'',
        udp_listen:'',
        udp_send:'',
    },

    change_Local_IP(e){
        console.log("本地IP：" + e.detail)
        this.setData({
            Local_IP:e.detail
        })
    },

    change_other_IP(e){
        console.log("从机IP：" + e.detail)
        this.setData({
            Other_IP:e.detail
        })
    },

    change_receive_port(e){
        console.log("接收端口号：" + e.detail)
        console.log(e.detail)
        this.setData({
            receive_port:e.detail
        })
    },

    change_send_port(e){
        console.log("发送端口号：" + e.detail)
        this.setData({
            send_port:e.detail
        })
    },

    change_connecte_button(){
        if(this.data.connecte_flag == false){
            this.data.udp_listen = wx.createUDPSocket();//创建UDP接收实例
            this.data.udp_send = wx.createUDPSocket();//创建UDP发送实例

            var port = this.data.udp_listen.bind(Number(this.data.receive_port));//监听端口号
            console.log(port)

            this.data.udp_listen.onListening((res) => {
                console.log("监听中...");
                console.log(res);
            })
            this.data.udp_listen.onError((error) => {
                console.log(error)
            })
            this.data.udp_listen.onMessage((res) => {
                console.log("监听内容:");
                console.log(res);
                //gbk转utf-8
                let x = new Uint8Array(res.message);
                // var str = new TextDecoder('gbk').decode(x);
                var str = new encoding.TextDecoder('gbk').decode(x);
                this.setData({
                    listen_massage:str
                })
                console.log(str)
            })
            this.setData({
                connecte_flag:true,
                connecte_show:"断开"
            })
        }else{
            this.data.udp_listen.close()
            this.data.udp_send.close()
            this.setData({
                connecte_flag:false,
                connecte_show:"连接"
            })
        }
    },

    send_UDP_data(){
        if(this.data.connecte_flag == true){
            // this.data.send_massage = Utf8ToUnicode(this.data.inputing_massage);
            this.data.send_massage = this.data.inputing_massage
            this.data.udp_send.bind(4001)//4002
            this.data.udp_send.send({
                address: this.data.Other_IP,
                port: this.data.send_port,
            //   message: '{"1":"589","2":"589","3":"589","4":"589","5":"589","6":"589"}'
                message: this.data.send_massage
            })
            console.log("OK!")
        }else{
            wx.showToast({
                title: '未建立连接',
                icon: 'error',
                duration: 1500
            })
        }
    },

    get_Local_IP(){
        let that = this;
        wx.getLocalIPAddress({
            success (res) {
                var localip = res.localip
                console.log(localip)
                that.setData({
                    Local_IP:localip
                })
            }
        })
    },

    input_massage(e){
        console.log(e.detail.value)
        this.data.inputing_massage = e.detail.value
    },


    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        wx.getLocalIPAddress({
            success (res) {
                var localip = res.localip
                console.log(localip)
                that.setData({
                    Local_IP:localip
                })
            }
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

function Utf8ToUnicode(strUtf8)
{
        var bstr = "";
        var nTotalChars = strUtf8.length;        // total chars to be processed.
        var nOffset = 0;                                        // processing point on strUtf8
        var nRemainingBytes = nTotalChars;        // how many bytes left to be converted
        var nOutputPosition = 0;
        var iCode, iCode1, iCode2;                        // the value of the unicode.

        while (nOffset < nTotalChars)
        {
                iCode = strUtf8.charCodeAt(nOffset);
                if ((iCode & 0x80) == 0)                        // 1 byte.
                {
                        if ( nRemainingBytes < 1 )                // not enough data
                                break;

                        bstr += String.fromCharCode(iCode & 0x7F);
                        nOffset ++;
                        nRemainingBytes -= 1;
                }
                else if ((iCode & 0xE0) == 0xC0)        // 2 bytes
                {
                        iCode1 =  strUtf8.charCodeAt(nOffset + 1);
                        if ( nRemainingBytes < 2 ||                        // not enough data
                                 (iCode1 & 0xC0) != 0x80 )                // invalid pattern
                        {
                                break;
                        }

                        bstr += String.fromCharCode(((iCode & 0x3F) << 6) | (         iCode1 & 0x3F));
                        nOffset += 2;
                        nRemainingBytes -= 2;
                }
                else if ((iCode & 0xF0) == 0xE0)        // 3 bytes
                {
                        iCode1 =  strUtf8.charCodeAt(nOffset + 1);
                        iCode2 =  strUtf8.charCodeAt(nOffset + 2);
                        if ( nRemainingBytes < 3 ||                        // not enough data
                                 (iCode1 & 0xC0) != 0x80 ||                // invalid pattern
                                 (iCode2 & 0xC0) != 0x80 )
                        {
                                break;
                        }

                        bstr += String.fromCharCode(((iCode & 0x0F) << 12) |
                                        ((iCode1 & 0x3F) <<  6) |
                                        (iCode2 & 0x3F));
                        nOffset += 3;
                        nRemainingBytes -= 3;
                }
                else                                                                // 4 or more bytes -- unsupported
                        break;
        }

        if (nRemainingBytes != 0)
        {
                // bad UTF8 string.
                return "";
        }

        return bstr;
}