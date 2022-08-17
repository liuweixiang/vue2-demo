<template>
  <div class="animation_content">
    <el-button type="primary" @click="animationClick" style="margin-bottom: 100px;"
      >状态切换</el-button
    >

    <transition name="fade" mode="out-in" appear>
      <div class="animation_item" v-show="isShow"></div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'animation',
    components: {},
    props: {},
    data() {
      return {
        isShow: false
      }
    },
    created() {},
    mounted() {},
    methods: {
      animationClick() {
        this.isShow = !this.isShow
      }
    },
    computed: {},
    watch: {}
  }
</script>

<style lang="scss" scoped>
  .animation_item {
    width: 500px;
    height: 500px;
    margin-left: 500px;
    background: linear-gradient(to right, #339900, #fdc448);
  }

  /* 进场动画   元素显示时应用的动画 */
  .fade-enter {
    // 初始动画
    transform: rotate(0deg);
    opacity: 0;
  }
  .fade-enter-active {
    // 初始状态到终止状态执行
    // 这个类可以被用来定义过渡的过程时间，延迟和曲线函数。
    transition: all 3s;
  }
  .fade-enter-to {
    // 最终停留状态
    transform: rotate(360deg);
    opacity: 1;
  }

  /* 离场动画   元素消失时应用的动画 同理进场动画 */
  .fade-leave {
    transform: rotate(0deg);
    opacity: 1;
  }
  .fade-leave-active {
    transition: all 3s;
  }
  .fade-leave-to {
    transform: rotate(-360deg);
    opacity: 0;
  }
</style>
