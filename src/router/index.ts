import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home.vue') // 建议进行路由懒加载，优化访问性能
  },
  {
    path: '/about',
    name: 'About',
       component: () =>
      import(/* webpackChunkName: "about" */ "../views/about.vue"),
  },
  {
    path: '/login',
    name: 'Login',
       component: () =>
      import(/* webpackChunkName: "login" */ "../views/login.vue"),
  }
]

const router = createRouter({
  // history: createWebHistory(),    // 使用history模式
  history: createWebHashHistory(),	 // 使用hash模式
  routes
})

export default router