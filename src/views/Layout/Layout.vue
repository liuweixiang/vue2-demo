<template>
  <div class="layout-box" @onmousedown="party.confetti(this)">
    <nav>
      <router-link to="/home">
        <el-button class="partyButton" type="text">Home</el-button>
      </router-link>
      <router-link to="/about">
        About
        <!-- <el-button class="partyButton" type="text">About</el-button> -->
      </router-link>
      <router-link to="/countup">
        countUp
        <!-- <el-button class="partyButton" type="text">countUp</el-button> -->
      </router-link>
      <router-link to="/bigScreen">BigScreen</router-link>
      <router-link to="/scrollList">ScollList</router-link>
      <router-link to="/transition">侧拉弹出transtion</router-link>
      <router-link to="/animation">vue动画</router-link>
      <router-link to="/iframe">iframe</router-link>
      <router-link to="/echarts">ECharts中国地图</router-link>
      <router-link to="/">
        <span class="linkEle1" @onmousedown="party.confetti(this)">ECharts</span>
      </router-link>
      <router-link to="/">
        <span class="linkEle2" @onmousedown="party.confetti(this)">iframe</span>
      </router-link>
      <router-link to="/">
        <span class="linkEle3" @onmousedown="party.confetti(this)">iframe</span>
      </router-link>
    </nav>

    <!-- 练习 -->
    <div class="learn-demo-content">
      <button class="btn1">Click me</button>
      <div
        style="width: 100px;height: 100px;box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.44);margin-top: 20px"
      ></div>
      <!-- 开关 -->
      <label class="rocker rocker-small">
        <input type="checkbox" />
        <span class="switch-left">Yes</span>
        <span class="switch-right">No</span>
      </label>
      <!-- 加载中 -->
      <div class="svg-box">
        <svg viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
  import party from 'party-js'

  export default {
    name: 'layout',
    data() {
      return {}
    },
    mounted() {
      document.querySelector('.linkEle1').addEventListener('click', function(e) {
        party.confetti(this, {
          count: party.variation.range(2, 4)
        })
      })
      document.querySelector('.linkEle2').addEventListener('click', function(e) {
        party.confetti(this)
      })
      document.querySelector('.linkEle3').addEventListener('click', function(e) {
        party.confetti(this)
      })
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .layout-box {
    width: 100vw;
    height: 100vh;

    nav {
      padding: 30px;

      a {
        font-weight: bold;
        color: #2c3e50;
        margin-right: 10px;

        &.router-link-exact-active {
          color: #42b983;
        }
      }
    }

    .learn-demo-content {
      padding: 0 20px;
      .btn1 {
        border: none;
        outline: none;
        background-color: #6c5ce7;
        padding: 10px 20px;
        font-size: 12px;
        font-weight: 700;
        color: #fff;
        border-radius: 5px;
        transition: all ease 0.1s;
        box-shadow: 0px 5px 0px 0px #a29bfe;
      }

      .btn1:active {
        transform: translateY(5px);
        box-shadow: 0px 0px 0px 0px #a29bfe;
      }
      /* Switch starts here */
      .rocker {
        display: inline-block;
        position: relative;
        /*
        SIZE OF SWITCH
        ==============
        All sizes are in em - therefore
        changing the font-size here
        will change the size of the switch.
        See .rocker-small below as example.
        */
        font-size: 2em;
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
        color: #888;
        width: 7em;
        height: 4em;
        overflow: hidden;
        border-bottom: 0.5em solid #eee;
      }

      .rocker-small {
        font-size: 0.75em;
        /* Sizes the switch */
        margin: 1em;
      }

      .rocker::before {
        content: '';
        position: absolute;
        top: 0.5em;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #999;
        border: 0.5em solid #eee;
        border-bottom: 0;
      }

      .rocker input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .switch-left,
      .switch-right {
        cursor: pointer;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 2.5em;
        width: 3em;
        transition: 0.2s;
        user-select: none;
      }

      .switch-left {
        height: 2.4em;
        width: 2.75em;
        left: 0.85em;
        bottom: 0.4em;
        background-color: #ddd;
        transform: rotate(15deg) skewX(15deg);
      }

      .switch-right {
        right: 0.5em;
        bottom: 0;
        background-color: #bd5757;
        color: #fff;
      }

      .switch-left::before,
      .switch-right::before {
        content: '';
        position: absolute;
        width: 0.4em;
        height: 2.45em;
        bottom: -0.45em;
        background-color: #ccc;
        transform: skewY(-65deg);
      }

      .switch-left::before {
        left: -0.4em;
      }

      .switch-right::before {
        right: -0.375em;
        background-color: transparent;
        transform: skewY(65deg);
      }

      input:checked + .switch-left {
        background-color: #0084d0;
        color: #fff;
        bottom: 0px;
        left: 0.5em;
        height: 2.5em;
        width: 3em;
        transform: rotate(0deg) skewX(0deg);
      }

      input:checked + .switch-left::before {
        background-color: transparent;
        width: 3.0833em;
      }

      input:checked + .switch-left + .switch-right {
        background-color: #ddd;
        color: #888;
        bottom: 0.4em;
        right: 0.8em;
        height: 2.4em;
        width: 2.75em;
        transform: rotate(-15deg) skewX(-15deg);
      }

      input:checked + .switch-left + .switch-right::before {
        background-color: #ccc;
      }

      /* Keyboard Users */
      input:focus + .switch-left {
        color: #333;
      }

      input:checked:focus + .switch-left {
        color: #fff;
      }

      input:focus + .switch-left + .switch-right {
        color: #fff;
      }

      input:checked:focus + .switch-left + .switch-right {
        color: #333;
      }

      .svg-box {
        svg {
          width: 3.25em;
          transform-origin: center;
          animation: rotate4 2s linear infinite;
        }

        circle {
          fill: none;
          stroke: hsl(214, 97%, 59%);
          stroke-width: 2;
          stroke-dasharray: 1, 200;
          stroke-dashoffset: 0;
          stroke-linecap: round;
          animation: dash4 1.5s ease-in-out infinite;
        }

        @keyframes rotate4 {
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes dash4 {
          0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
          }

          50% {
            stroke-dasharray: 90, 200;
            stroke-dashoffset: -35px;
          }

          100% {
            stroke-dashoffset: -125px;
          }
        }
      }
    }
  }
</style>
