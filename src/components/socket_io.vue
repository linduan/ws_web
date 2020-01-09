<template>
  <div class="client">
    <div class="user">用户id:  {{user.name}}</div>
    <div class="list">
      <div v-for="(msg, index) in msgs" :key="index">
        <span class="name">{{msg.user}}:&nbsp;</span>
        <span class="content">{{msg.content}}</span>
      </div>
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
      user: { name: '用户一' },
      msgs: [
        { user: '系统消息', content: 'XXX加入聊天室！' },
        { user: '系统消息', content: 'XXX加入聊天室！' },
        { user: '系统消息', content: 'XXX加入聊天室！' }
      ]
    }
  },
  methods: {
    // 发送消息
    sendMsg () {
      console.log(this.user.name, this.msg)
      this.msg = ''
    },
    // 创建socket连接
    creatSocket () {
      const socket = io('ws://localhost:7001/')
      socket.on('message', res => console.log('message', res))
      socket.on('error', res => console.log('errror:', res))
      socket.on('connect', res => console.log('connect', res))
      socket.on('close', res => console.log('close', res))
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
