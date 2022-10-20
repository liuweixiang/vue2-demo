import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('../views/Layout/Layout.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home/HomeView.vue')
  },
  {
    path: '/countup',
    name: 'countup',
    component: () => import('../views/Demo/countup.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/Home/AboutView.vue')
  },
  {
    path: '/dataV',
    name: 'dataV',
    component: () => import('../views/BigScreen/bigScreen.vue')
  },
  {
    path: '/scrollList',
    name: 'scrollList',
    component: () => import('../views/ScrollList/index.vue')
  },
  {
    path: '/transition',
    name: 'transition',
    component: () => import('../views/Transition/transiton.vue')
  },
  {
    path: '/animation',
    name: 'animation',
    component: () => import('../views/Animation/animation.vue')
  },
  {
    path: '/iframe',
    name: 'iframe',
    component: () => import('../views/Iframe/iframe.vue')
  },
  {
    path: '/echarts',
    name: 'echarts',
    component: () => import('../views/ECharts/echarts.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
