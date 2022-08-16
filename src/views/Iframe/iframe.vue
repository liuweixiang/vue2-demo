<template>
    <!--  -->
    <div class="iframe_content">
      iframe
      <div 
        class="content" 
        v-loading="iframeLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <iframe
          @load="loadings"
          :src="is_QiDonURL"
          ref="iframe"
          :style="{
            'height': '100%',
            'frameborder':'no',
            'overflow': 'scroll',
            'width':'100%'
          }"
          frameborder="0"
          border="0"
          marginwidth="0"
          marginheight="0"
          seamless
          id="iframes"
        ></iframe>
      </div>
    </div>
</template>

<script>
export default {
  name: "iframes",
  components: {},
  props: {},
  data() {
    return {
      is_QiDonURL: "https://vip.gcw.net/",
      iframeLoading: true,
    }
  },
  created() {
    
  },
  mounted() {
    console.log("DOM加载完毕~~~~");
    this.iframeLoading = true;
  },
  methods: {
    loadings() {
      console.log("iframe加载完毕~~");
      this.iframeLoading = false;
    }
  },
  computed: {},
  watch: {}

}

</script>

<style lang="scss" scoped>
.content {
  width: 1200px;
  height: 800px;
  background: #567573;
}
</style>