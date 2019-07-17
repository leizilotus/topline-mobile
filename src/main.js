import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'amfe-flexible'

// import {
//   Button
// } from 'vant'

// Vue.use(Button)

import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)

Vue.prototype.$sleep = time => {
  return new Promise((resolve, reject) => {
    window.setTimeout(resolve, time)
  })
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
