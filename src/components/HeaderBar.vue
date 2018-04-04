<template>
  <div>
    <h1>Header</h1>
    <h6 v-if="isAuthenticated">User: {{currentUser.name}}</h6>
    <button v-if="isAuthenticated" v-on:click="logout()">Logout</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { LOGOUT } from '../types/actions'

export default {
  name: 'Header',
  computed: {
    ...mapGetters([
      'currentUser',
      'isAuthenticated'
    ])
  },
  methods: {
    logout () {
      this.$store.dispatch(LOGOUT)
        .then(() => this.$router.push('/login'))
    }
  }
}
</script>
