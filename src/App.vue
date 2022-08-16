<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {

    }
  },
  methods: {
    
  }
}

</script>

<style lang="scss">
html,
body {
  font-family: PingFangSC, PingFangSC-Medium;
  overflow: visible !important;
  overflow-x: hidden !important;
}

#app {
  width: 100%;
  height: 100vh;
}
</style>
