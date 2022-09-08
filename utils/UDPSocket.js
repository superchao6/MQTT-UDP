export class UDPSocket {
    constructor() {
        this.connection = {};
    }

    // 创建一个UDP实例
    establish(monitor) {
        this.connection = wx.createUDPSocket();
        // 绑定指定端口
        const port = this.connection.bind(monitor)
        console.log('连接成功' + port + '端口');
    }

    // 监听端口函数
    onListening(success, failure, open, cmd, mac) {
        // 开启监听
        this.connection.onListening((res) => {
        open(res)
        console.log(res);
        })
        // 监听回调函数
        this.connection.onMessage((res) => {
            console.log(res);
    
            //以下为我对数据的处理，使用到了我的一个tool.js,里面包含了对字节数组的处理
            //需要的可以到我的个人博客获取www.meinaodai.top
    
            // // 做空包筛查
            // if (res.message) {
            //     var packet = tool.analysis(res.message)
            //     // 做数据空包处理
            //     if (packet) {
            //         // 做数据筛查
            //         // console.log(tool.Screening(packet, cmd, mac));
            //         success(tool.Screening(packet, cmd, mac))
            //         console.log(packet);
            //         console.log('------------------------');
            //     }
            // }
        })
        // debug
        this.connection.onError((err) => {
            failure(err)
        })
    }

    // 发送消息
    send(message) {
        this.connection.send({
        address: '255.255.255.255',
        port: 20015,
        message
        })
    }

    // 关闭搜索事件
    UDPclose() {
        this.connection.close()
        console.log('UDP关闭');
    }
}