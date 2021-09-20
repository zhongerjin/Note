import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Best from '@/components/Best'
import Zhi from '@/components/login/Zhi'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/note',
      name: 'Note',
      component: Best
    },
    {
      path: '/login',
      alias: '/register',
      name: 'Login',
      component: Zhi
    }
  ]
})
