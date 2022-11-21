import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/reset.scss'

import MessageBox from './components/MessageBox/index.js'

import toEnctry from './utils/logMeassage/index.js'

import ShowInfo from './components/ShowInfo/index'
Vue.prototype.$confirm = ShowInfo.confirm

import './utils/directives/index.js'

import dataV from '@jiaminghi/data-view'

Vue.use(ElementUI)
Vue.use(MessageBox)
Vue.use(toEnctry)
Vue.use(dataV)

// ==========================================rem
// (function (win) {
// var doc = win.document
// var docEl = doc.documentElement
// var tid

// function refreshRem () {
// var width = docEl.getBoundingClientRect().width
// // console.log('视窗宽度')
// // console.log(width)
// // if (width > 640) {// 最大宽度
// //   width = 640;
// // }
// var rem = width / 6.4
// docEl.style.fontSize = rem + 'px'
// }

// win.addEventListener(
// 'resize',
// function () {
// //当调整浏览器窗口大小时，发生 resize 事件。
// // console.log('浏览器窗口大小发生变化resize~~')
// this.clearTimeout(tid)
// tid = this.setTimeout(refreshRem, 300)
// },
// false
// )
// win.addEventListener(
// 'pageshow',
// function (e) {
// //事件在每次加载页面时触发,类似于 onload 事件
// // console.log('页面加载事件pageshow~~')
// if (e.persisted) {
// this.clearTimeout(tid)
// tid = this.setTimeout(refreshRem, 300)
// }
// },
// false
// )

// refreshRem()
// })(window)
// ==========================================rem

Vue.config.productionTip = false

// 全局前置守卫
// router.beforeEach((to, from, next) => {
//   // 返回 false 以取消导航
//   next()
// })

const app = new Vue({
  router,
  store,
  render: (h) => h(App)
})
// setTimeout(() => {
app.$mount('#app')
// }, 3000)
