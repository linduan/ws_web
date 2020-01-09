<template>
  <div id="app">
    <home/>
  </div>
</template>
<script>
import Home from '@/views/home.vue'
export default {
  name: 'app',
  components: { Home }
}
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  width 100%
  height 100%
</style>
