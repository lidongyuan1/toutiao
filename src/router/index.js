import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home/Home.vue'
import User from '@/views/User/User.vue'

Vue.use(VueRouter)
// 路由规则的数组
const routes = [
  // 首页的路由规则
  { path: '/', component: Home },
  { path: '/user', component: User }
]

const router = new VueRouter({
  routes
})

export default router
