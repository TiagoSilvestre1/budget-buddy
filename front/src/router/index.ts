import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Main from '../components/Main.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main,
      meta: { showNav: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { showNav: false }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { showNav: false }
    }
  ]
})

export default router
