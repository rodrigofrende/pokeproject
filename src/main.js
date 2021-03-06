// import '@babel/polyfill'
// import 'mutationobserver-shim'
import Vue from 'vue'

import './plugins/bootstrap-vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Notifications from 'vue-notification'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false
Vue.use(Notifications)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
