'use strict'

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { API_URL } from '../common/config'
import StorageService from '@/common/storage.service'

const ApiService = {
  init () {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = API_URL
  },

  setHeader () {
    Vue.axios.defaults.headers.common['Authorization'] = StorageService.getToken()
  },

  post (url, body) {
    // todo remove
    return Promise.resolve({
      token: 'ad3r43nkjnnkjnewf',
      user: {
        name: 'Sreekanth'
      }
    })
    // return Vue.axios.post(`${url}`, body)
  }
}

export default ApiService
