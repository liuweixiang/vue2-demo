<template>
  <div :class="b()">
    <slot name="before" :class="b('before')" />
    <span :style="textStyle" :class="textClass" :content="text" @click="textClick">
      <span :key="keyIndex" :class="b('limit-text')">{{ text }}</span>
      <span v-show="oversize" :class="b('more')">{{ more }}<slot name="more"/></span>
    </span>
    <slot name="after" :class="b('after')" />
  </div>
</template>

<script>
  import create from '../../utils/create/create.js'
  export default create({
    name: 'textEllipsis',
    props: {
      text: String,
      height: Number,
      isLimitHeight: {
        type: Boolean,
        default: true
      },
      textStyle: [String, Object, Array],
      textClass: [String, Object, Array],
      more: String
    },

    data() {
      return {
        keyIndex: 0,
        oversize: false,
        isHide: false
      }
    },

    watch: {
      isLimitHeight() {
        this.init()
      },
      text() {
        this.init()
      },
      height() {
        this.init()
      }
    },
    mounted() {
      this.init()
    },

    methods: {
      init() {
        this.oversize = false
        this.keyIndex += 1
        const more = this.$el.querySelector('.hd-textellipsis-more')
        more.style.display = 'none'
        if (this.isLimitHeight) {
          this.limitShow()
        }
      },
      textClick() {
        this.$emit('click')
      },
      limitShow() {
        this.$nextTick(() => {
          const textDom = this.$el.querySelector('.hd-textellipsis-limit-text')
          const title = this.$el
          const more = this.$el.querySelector('.hd-textellipsis-more')
          let n = 1000
          if (textDom) {
            if (title.offsetHeight > this.height) {
              more.style.display = 'inline-block'
              let text = this.text
              while (title.offsetHeight > this.height && n > 0) {
                if (title.offsetHeight > this.height * 3) {
                  textDom.innerText = text = text.substring(0, Math.floor(text.length / 2))
                } else {
                  textDom.innerText = text = text.substring(0, text.length - 1)
                }
                n--
              }
              this.$emit('hide')
              this.isHide = true
            } else {
              this.$emit('show')
              this.isHide = false
            }
          }
        })
      }
    }
  })
</script>

<style lang="scss">
  $class-prefix: hd-textellipsis;

  .#{$class-prefix} {
    &-limit-text {
      word-break: break-all;
    }
  }
</style>
