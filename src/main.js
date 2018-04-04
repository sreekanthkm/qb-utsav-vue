'use strict'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { CHECK_AUTH } from './types/actions'
import ApiService from './common/api.service'

ApiService.init()

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  return Promise
    .all([store.dispatch(CHECK_AUTH)])
    .then(() => {
      if (to.name === 'Login' || to.name === null) {
        next('/home')
      } else {
        next()
      }
    })
    .catch(() => {
      if (to.name === 'Login') {
        next()
      } else {
        next('/login')
      }
    })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
