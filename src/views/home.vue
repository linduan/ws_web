<template>
  <div class="home">
    <div class="client">
      <!-- <client/> -->
      <client1/>
      <!-- <socketio/> -->
    </div>
    <div class="server">
      <server/>
    </div>
  </div>
</template>

<script type="ts">
import Client from '@/components/client1'
import Client1 from '@/components/client1'
import Server from '@/components/server'
import Socketio from '@/components/socket_io'
export default {
  name: 'Home',
  components: { Client, Server, Socketio, Client1 }
}
</script>
<style lang="stylus" scoped>
  .home
    padding 20px
    display flex
    justify-content space-around
    .client
      flex 1
      margin-right 20px
    .server
      flex 1
</style>
