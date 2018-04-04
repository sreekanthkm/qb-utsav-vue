<template>
<div>
  <input type="text" v-model="username" placeholder="Username"/>
  <input type="password" v-model="password" placeholder="Password"/>
  <button v-on:click="onSubmit(username, password)">Login</button>
  <p v-if="errors">Username or password invalid</p>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { LOGIN } from '../types/actions'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit (username, password) {
      this.$store.dispatch(LOGIN, {username, password})
        .then(() => this.$router.push('/home'))
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  }
}
</script>
