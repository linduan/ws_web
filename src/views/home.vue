<template>
  <div class="home">
    <div class="client">
      <client/>
      <!-- <client1/> -->
      <!-- <socketio/> -->
    </div>
  </div>
</template>

<script type="ts">
import Client from '@/components/client'
import Client1 from '@/components/client1'
import Socketio from '@/components/socket_io'
export default {
  name: 'Home',
  components: { Client, Socketio, Client1 }
}
</script>
<style lang="stylus" scoped>
  .home
    padding 20px
    width 80%
    margin 0 auto
    .client
      width 100%
</style>
