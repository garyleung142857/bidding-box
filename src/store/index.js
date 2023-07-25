import Vue from 'vue'
import Vuex from 'vuex'
import sizing from './modules/sizing'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sizing
  }
})
