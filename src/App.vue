<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {},
    data() {
      return {
        name: ''
      }
    },
    methods: {
      init() {
        let aaa = ''
      }
    }
  }
</script>

<style lang="scss">
  html,
  body {
    font-family: PingFangSC, PingFangWC-Medium;
    overflow: visible !important;
    overflow-x: hidden !important;
  }

  #app {
    width: 100%;
    height: 100vh;
  }
</style>
