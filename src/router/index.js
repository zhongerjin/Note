import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import FuckingVue from '@/components/FuckingVue'
import Last from '@/components/TodoList'
import Best from '@/components/Best'
import Login from '@/components/Login'
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
      path: '/fucking',
      name: 'fucking',
      component: FuckingVue
    },
    {
      path: '/last',
      name: 'Last',
      component: Last
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
    },
    {
      path: '/zhi',
      name: 'Zhi',
      component: Zhi
    }
  ]
})
