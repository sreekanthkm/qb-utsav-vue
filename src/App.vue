<template>
  <div class="app">
    <header-bar/>
    <router-view/>
    <footer-view/>
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar'
import FooterView from './components/FooterView'
export default {
  name: 'App',
  components: {
    HeaderBar,
    FooterView
  }
}
</script>

<style>
.app {
  font-family: 'Noto Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
