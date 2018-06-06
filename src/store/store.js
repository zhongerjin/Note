import Vue from 'vue'
import Vuex from 'vuex'
import notefile from './module/notefile'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    notefile
  }
})
