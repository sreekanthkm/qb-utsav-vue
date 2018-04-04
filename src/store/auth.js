'use strict'

import ApiService from '../common/api.service'
import StorageService from '../common/storage.service'
import {LOGIN, CHECK_AUTH, LOGOUT} from '../types/actions'
import {PURGE_AUTH, SET_AUTH, SET_ERROR} from '../types/mutations'

const state = {
  user: {
    name: !!StorageService.getUser()
  },
  isAuthenticated: !!StorageService.getToken(),
  errors: null
}

const actions = {
  [LOGIN] (context, credentials) {
    return new Promise(resolve => {
      ApiService.post('/user/login', credentials)
        .then(data => {
          context.commit(SET_AUTH, data)
          resolve(data.user)
        })
        .catch(err => {
          context.commit(SET_ERROR, err.data.error)
        })
    })
  },
  [CHECK_AUTH] (context) {
    if (StorageService.getToken() && StorageService.getUser()) {
      ApiService.setHeader()
      context.commit(SET_AUTH, {
        token: StorageService.getToken(),
        user: {
          name: StorageService.getUser()
        }
      })
    } else {
      context.commit(PURGE_AUTH)
      return Promise.reject(new Error('Logout'))
    }
  },
  [LOGOUT] (context) {
    context.commit(PURGE_AUTH)
  }
}

const mutations = {
  [SET_ERROR] (state, error) {
    state.errors = error
  },
  [SET_AUTH] (state, data) {
    state.isAuthenticated = true
    state.user = data.user
    state.errors = null
    StorageService.saveToken(data.token)
    StorageService.saveUser(data.user.name)
  },
  [PURGE_AUTH] (state) {
    state.isAuthenticated = false
    state.user = {}
    state.errors = null
    StorageService.clearStorage()
  }
}

const getters = {
  currentUser (state) {
    return state.user
  },
  isAuthenticated (state) {
    return state.isAuthenticated
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
