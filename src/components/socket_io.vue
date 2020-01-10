<template>
  <div class="client">
    <div class="list">
      <div v-for="(msg, index) in msgs" :key="index">{{msg}}</div>
    </div>
    <div class="input">
      <input type="text" v-model="msg">
      <button @click="sendMsg">发送消息</button>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  name: 'Socketio',
  data () {
    return {
      msg: '',
      msgs: [],
      socket: null
    }
  },
  methods: {
    // 发送消息
    sendMsg () {
      this.socket.emit('message', this.msg)
      this.msg = ''
    },
    // 创建socket连接
    creatSocket () {
      const socket = this.socket || io('ws://localhost:7001/')
      socket.on('connect', () => console.log('socket.io 连接成功'))
      socket.on('message', res => {
        console.log('socket.io 收到消息', res)
        this.receiveMSg(res)
      })
      socket.on('error', res => console.log('socket.io 异常', res))
      socket.on('close', res => console.log('socket.io 关闭', res))
      this.socket = socket
    },
    receiveMSg (msg) {
      this.msgs = [...this.msgs, msg]
    }
  },
  created () {
    this.creatSocket()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.client
  border 1px solid #ccc
  padding 10px
  margin-bottom 20px
  text-align left
  .name
    display inline-block
    width 100px
  .content
    border 1px dotted #ccc
    padding 2px 5px
  .advantor
    display inline-block
    width 30px
    height 30px
    border 1px solid #bbbbbb
    border-radius 50%
    text-align center
    line-height 30px
    margin-left 20px
  .list
    height 200px
    font-size 16px
    overflow auto
    &>div
      margin-bottom 5px
  .user
    padding 0 5px 5px 10px
    margin-bottom 5px
    border-bottom 1px solid #ccc
  .input
    display flex
    border-top 1px solid #eee
    padding-top 10px
    input
      margin-right 10px
      flex 1
</style>
