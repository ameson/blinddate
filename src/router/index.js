import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/basic-info',
    name: 'BasicInfo',
    component: () => import('../views/BasicInfo.vue')
  },
  {
    path: '/economic',
    name: 'Economic',
    component: () => import('../views/Economic.vue')
  },
  {
    path: '/family',
    name: 'Family',
    component: () => import('../views/Family.vue')
  },
  {
    path: '/potential',
    name: 'Potential',
    component: () => import('../views/Potential.vue')
  },
  {
    path: '/attitude',
    name: 'Attitude',
    component: () => import('../views/Attitude.vue')
  },
  {
    path: '/result',
    name: 'Result',
    component: () => import('../views/Result.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { 
      top: 0,
      behavior: 'smooth'
    }
  }
})

export default router
