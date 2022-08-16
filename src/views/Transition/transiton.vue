<template>

    <div class="transition_content">
      transition页面<br>
      <el-button @click="btnClick">clickMe</el-button>
      <div class="transition" v-if="transitionShow">
        这里是transition的内容
      </div>
    </div>
</template>

<script>
export default {
  name: "transition",
  components: {},
  props: {},
  data() {
    return {
      transitionShow: false,
    }
  },
  created() {},
  mounted() {},
  methods: {
    btnClick() {
      this.transitionShow = !this.transitionShow;
    }
  },
  computed: {},
  watch: {}

}

</script>

<style lang="scss" scoped>
@keyframes mymove {
  from {
    opacity: 0;
    right: -345px;
    z-index: -9999;
  }
  to {
    opacity: 1;
    right: 0px;
    z-index: 9999;
  }
}
.transition_content {
  // position: relative;
  .transition {
    animation: mymove .8s infinite;
    animation-iteration-count: 1;
    position: absolute;
    top: -2px;
    right: 0%;
    bottom: 0;
    background: #eee;
    width: 480px;
    height: 100%;
    border: 1px solid #e4e7ed;
    overflow-y: auto;
    z-index: 99;
  }
}
</style>