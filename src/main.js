'use strict'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {CHECK_AUTH} from './actions/types'
import ApiService from './common/api.service'

ApiService.init()

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  return Promise
    .all([store.dispatch(CHECK_AUTH)])
    .then(next)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
