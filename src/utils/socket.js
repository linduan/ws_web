const socketMap = new Map()

export default class Socket {
  // 构造时根据端口号判断是否已经构建
  constructor (port, Vue) {
    this.bus = Vue.$bus
    console.log(Vue)
    if (socketMap.has(port)) {
      this.ws = socketMap.get(port)
    } else {
      this.ws = this.init(port)
    }
  }
  // socket初始化
  init (port) {
    const ws = new WebSocket(`ws://localhost:${port}/`)

    // webSocket 连接事件
    ws.onopen = res => {
      console.log('websock连接成功：', res.type)
    }

    // webSocket 接收到消息
    ws.onmessage = res => {
      const {data} = res
      try {
        this.bus.emit('onmessage', JSON.parse(data))
      } catch (e) {
        this.bus.emit('onmessage', data)
      }
    }

    // webScoket 关闭事件
    ws.onclose = () => {
      this.bus.emit('onclose', 'close')
      console.log('websock关闭...')
    }

    // webScoket 关闭事件
    ws.onerror = e => {
      this.bus.emit('onerror', e)
      console.log('websocket异常...', e)
    }

    // 记录socket
    socketMap.set(port, ws)
    return ws
  }
  /*  发送消息
  **  @param msg
  **  用于传输至服务器的数据。它必须是以下类型之一：
  **    USVString: 文本字符串
  **    ArrayBuffer: 有类型的数组对象发送底层二进制数据
  **    Blob: Blob 类型将队列 blob 中的原始数据以二进制中传输。
  **    ArrayBufferView: 以二进制帧的形式发送任何 JavaScript 类数组对象
  */
  send (msg, user = '') {
    this.ws.send(JSON.stringify({msg, user}))
  }
}