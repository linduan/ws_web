import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import VueBus from '@/utils/vue-bus'
import Socket from '@/utils/socket'

Vue.config.productionTip = false

Vue.use(VueBus)

const vue = new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

// 全局注册socket
// Vue.prototype.$socket = new Socket(7002, vue)
