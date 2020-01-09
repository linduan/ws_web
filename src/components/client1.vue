<template>
  <div class="client">
    <div class="user">用户:  {{user}}</div>
    <div class="list">
      <div v-for="(msg, index) in msgs" :key="index">
        <div v-if="msg.user !== user">
          <span class="name">{{msg.user}}:&nbsp;</span>
          <span class="content">{{msg.msg}}</span>
        </div>
        <div v-else style="float: right;">
          <span class="content">{{msg.msg}}</span>
          <span class="advantor">我</span>
        </div>
      </div>
    </div>
    <div class="input">
      <input type="text" v-model="msg">
      <button @click="sendMsg">发送消息</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '',
      user: '',
      msgs: [],
      ws: null
    }
  },
  methods: {
    // 发送消息
    sendMsg () {
      console.log(this.msg, this.user)
      this.$socket.send(this.msg, this.user)
      let msg = {
        msg: this.msg,
        user: this.user
      }
      this.msgs = [...this.msgs, msg]
      this.msg = ''
    }
  },
  created () {
    this.$bus.on('onmessage', res => {
      const {user, type} = res
      if (type === 'open') {
        this.user = user
        return true
      }
      if (user !== this.user) {
        this.msgs = [...this.msgs, res]
      }
      console.log(this.msgs)
    })
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
