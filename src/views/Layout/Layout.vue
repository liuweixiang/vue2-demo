<template>
  <div class="layout-box">
    <nav>
      <router-link to="/home">Home</router-link> || <router-link to="/about">About</router-link> ||
      <router-link to="/countup">countUp</router-link> ||
      <router-link to="/dataV">BigScreen</router-link> ||
      <router-link to="/scrollList">ScollList</router-link> ||
      <router-link to="/transition">侧拉弹出transtion</router-link> ||
      <router-link to="/animation">vue动画</router-link> ||
      <router-link to="/iframe">iframe</router-link> || <router-link to="/">iframe</router-link> ||
      <router-link to="/">iframe</router-link> || <router-link to="/">iframe</router-link> ||
      <router-link to="/">iframe</router-link> || <router-link to="/">iframe</router-link> ||
      <router-link to="/">iframe</router-link> || <router-link to="/">iframe</router-link> ||
      <router-link to="/">iframe</router-link> ||
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'layout',
    data() {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
