// src/router/index.ts

import { createRouter, createWebHistory } from 'vue-router'
import DoctorsView from '../views/DoctorsView.vue'
import NursesView from '../views/NursesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/doctors'
    },
    {
      path: '/doctors',
      name: 'doctors',
      component: DoctorsView
    },
    {
      path: '/nurses',
      name: 'nurses',
      component: NursesView
    }
  ]
})

export default router
