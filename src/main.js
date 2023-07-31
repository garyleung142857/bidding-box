import Vue from 'vue'
import store from './store'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
