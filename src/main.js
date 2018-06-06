// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueX from 'vuex'
import store from './store/store'
import Note from './Note'

Vue.config.productionTip = false

Vue.use(VueX)

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   store,
//   template: '<App/>',
//   components: { App }
// })

new Vue({
  el: '#note',
  router,
  store,
  template: '<Note/>',
  components: { Note }
})
