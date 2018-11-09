<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-link to="/">home</router-link>
    <router-link to="fucking">fucking</router-link>
    <router-link to="/last">last</router-link>
    <router-link to="/best">best</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 14px;
}
.router-link-exact-active{
  font-size: 17px;
  color: #000000;
  text-decoration: none;
}
</style>
