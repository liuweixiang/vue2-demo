<template>
  <router-view />
</template>

<script>
  export default {
    name: 'App',
    components: {},
    data() {
      return {
        name: '',
        age: 18
      }
    },
    methods: {
      init() {}
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
</style>
