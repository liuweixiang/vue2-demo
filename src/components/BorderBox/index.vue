<template>
  <div :ref="componentsRef" class="module">
    <svg :width="width" :height="height" class="svg-container">
      <defs>
        <filter id="border-box" height="150%" width="150%" x="-25%" y="-25%">
          <feMorphology operator="dilate" radius="1" in="SourceAlpha" result="thicken" />
          <feGaussianBlur in="thicken" stdDeviation="2" result="blurred" />
          <feComposite in="glowColor" in2="blurred" operator="in" result="softGlowColored" />
          <feMerge>
            <feMergeNode in="softGlowColored" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        stroke-width="2"
        fill="transparent"
        stroke-linecap="round"
        filter="url(#border-box)"
        d="m 30 1 L 1 1 L 1 20"
        stroke="#00D782"
      />
      <path
        stroke-width="2"
        fill="transparent"
        stroke-linecap="round"
        filter="url(#border-box)"
        :d="`M ${width - 30} 1 L ${width - 1} 1 L ${width - 1} 20`"
        stroke="#00D782"
      />
      <path
        stroke-width="2"
        fill="transparent"
        stroke-linecap="round"
        filter="url(#border-box)"
        :d="
          `
          M ${width - 30} ${height - 1}
          L ${width - 1} ${height - 1}
          L ${width - 1} ${height - 20}
        `
        "
        stroke="#00D782"
      />
      <path
        stroke-width="2"
        fill="transparent"
        stroke-linecap="round"
        filter="url(#border-box)"
        :d="
          `
          M 30 ${height - 1}
          L 1 ${height - 1}
          L 1 ${height - 20}
        `
        "
        stroke="#00D782"
      />
    </svg>
    <div class="border-box-content">
      <div class="content-box">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Module',
    props: {
      componentsRef: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        dom: '',
        width: '1',
        height: '1'
      }
    },
    mounted() {
      this.initWH(true)

      window.addEventListener('resize', () => {
        this.initWH()
      })
    },
    methods: {
      initWH(resize = true) {
        this.$nextTick(() => {
          let dom = (this.dom = this.$refs[this.componentsRef])
          this.width = dom ? dom.clientWidth : 0
          this.height = dom ? dom.clientHeight : 0
          if (!dom) {
            console.warn('DataV: Failed to get dom node, component rendering may be abnormal!')
          } else if (!this.width || !this.height) {
            console.warn(
              'DataV: Component width or height is 0px, rendering abnormality may occur!'
            )
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .module {
    position: relative;
    width: 100%;
    height: 100%;
    .svg-container {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
    }
    .border-box-content {
      position: relative;
      width: 100%;
      height: 100%;
      border: 1px solid rgba(0, 127, 255, 0.4);
      box-shadow: 1px 1px 16px 0px rgba(0, 127, 255, 0.3) inset;
      .content-box {
        box-sizing: border-box;
        padding: 16px;
      }
    }
  }
</style>
