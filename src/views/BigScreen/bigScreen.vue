<template>
  <div class="container borderBox">
    <!-- <dv-full-screen-container>
      <div class="screen-box borderBox">
        <div class="top-box"></div>
        <div class="bottom-box borderBox">
          <div class="left fullHeight borderBox">
            <div class="left-top fullWidth">
              <dv-border-box-7>left-top</dv-border-box-7>
            </div>
            <div class="left-center fullWidth">
              <dv-border-box-7>left-center</dv-border-box-7>
            </div>
            <div class="left-bottom fullWidth">
              <dv-border-box-7>left-bottom</dv-border-box-7>
            </div>
          </div>
          <div class="center fullHeight borderBox">
            <div class="center-top fullWidth">
              center-top
            </div>
            <div class="center-center fullWidth borderBox">
              <div class="center-center-left fullHeight borderBox">
                <div class="top fullWidth">
                  <dv-border-box-7>top</dv-border-box-7>
                </div>
                <div class="bottom fullWidth borderBox">
                  <dv-border-box-7>bottom</dv-border-box-7>
                </div>
              </div>
              <div class="center-center-right fullHeight">
                <dv-border-box-7>center-center-right</dv-border-box-7>
              </div>
            </div>
            <div class="center-bottom fullWidth">
              <dv-border-box-7>center-bottom</dv-border-box-7>
            </div>
          </div>
          <div class="right fullHeight borderBox">
            <div class="right-top">
              <dv-border-box-7>right-top</dv-border-box-7>
            </div>
            <div class="right-center">
              <dv-border-box-7>right-center</dv-border-box-7>
            </div>
            <div class="right-bottom">
              <dv-border-box-7>right-bottom</dv-border-box-7>
            </div>
          </div>
        </div>
      </div>
    </dv-full-screen-container> -->

    <div class="screen-box borderBox">
      <div class="top-box"></div>
      <div class="bottom-box borderBox">
        <div class="left fullHeight borderBox">
          <div class="left-top fullWidth">
            <dv-border-box-7>left-top</dv-border-box-7>
          </div>
          <div class="left-center fullWidth">
            <dv-border-box-7>left-center</dv-border-box-7>
          </div>
          <div class="left-bottom fullWidth">
            <dv-border-box-7>left-bottom</dv-border-box-7>
          </div>
        </div>
        <div class="center fullHeight borderBox">
          <div class="center-top fullWidth">
            center-top
          </div>
          <div class="center-center fullWidth borderBox">
            <div class="center-center-left fullHeight borderBox">
              <div class="top fullWidth">
                <dv-border-box-7>top</dv-border-box-7>
              </div>
              <div class="bottom fullWidth borderBox">
                <dv-border-box-7>bottom</dv-border-box-7>
              </div>
            </div>
            <div class="center-center-right fullHeight">
              <dv-border-box-7>center-center-right</dv-border-box-7>
            </div>
          </div>
          <div class="center-bottom fullWidth">
            <dv-border-box-7>center-bottom</dv-border-box-7>
          </div>
        </div>
        <div class="right fullHeight borderBox">
          <div class="right-top">
            <dv-border-box-7>right-top</dv-border-box-7>
          </div>
          <div class="right-center">
            <dv-border-box-7>right-center</dv-border-box-7>
          </div>
          <div class="right-bottom">
            <dv-border-box-7>right-bottom</dv-border-box-7>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    components: {},
    props: {},
    data() {
      return {
        resizeTimer: null,
        pageshowTimer: null
      }
    },
    methods: {
      remResize() {
        this.$nextTick(() => {
          function refreshRem() {
            let docEl = window.document.documentElement
            let width = docEl.getBoundingClientRect().width
            let rem = width / 192
            console.log(rem, 'rem======>')
            docEl.style.fontSize = rem + 'px'
          }

          window.addEventListener(
            'resize',
            function() {
              //当调整浏览器窗口大小时，发生 resize 事件。
              clearTimeout(this.resizeTimer)
              this.resizeTimer = this.setTimeout(refreshRem, 200)
            },
            false
          )
          window.addEventListener(
            'pageshow',
            function(e) {
              //事件在每次加载页面时触发,类似于 onload 事件
              if (e.persisted) {
                clearTimeout(this.pageshowTimer)
                this.pageshowTimer = this.setTimeout(refreshRem, 200)
              }
            },
            false
          )
          refreshRem()
        })
      }
    },
    watch: {},
    mounted() {
      this.remResize()
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    font-size: 1.6rem;

    .borderBox {
      box-sizing: border-box;
    }

    .fullHeight {
      height: 100%;
    }

    .fullWidth {
      width: 100%;
    }

    .border {
      // border: 1px solid #eee;
    }

    .screen-box {
      width: 100%;
      height: 100%;
      background: #00092d;
      padding: 0 24px 24px;
      color: #ffffff;

      .top-box {
        width: 100%;
        height: 7.31481481%;
      }

      .bottom-box {
        width: 100%;
        height: 92.68518518%;
        // height: calc(100% - 79px);
        display: flex;
        justify-content: space-between;

        .left {
          width: 23.8247863%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-top: 11px;

          .left-top {
            height: 31.72978505%;
          }

          .left-center {
            height: 31.72978505%;
          }

          .left-bottom {
            height: 31.72978505%;
          }
        }

        .center {
          width: 50.4273504%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .center-top {
            height: 13.8178096%;
          }

          .center-center {
            // height: 61.2077789%;
            height: 63.2548618%;
            display: flex;
            justify-content: space-between;
            padding-bottom: 18px;

            .center-center-left {
              width: 64.2629904%;

              .top {
                height: 80.7692307%;
              }

              .bottom {
                height: 19.5652173%;
                padding-top: 18px;
              }
            }

            .center-center-right {
              width: 35.843054%;
              padding-left: 18px;
            }
          }

          .center-bottom {
            height: 22.9273285%;
          }
        }

        .right {
          width: 23.8247863%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-top: 11px;

          .right-top {
            height: 31.72978505%;
          }

          .right-center {
            height: 31.72978505%;
          }

          .right-bottom {
            height: 31.72978505%;
          }
        }
      }
    }
  }
</style>
