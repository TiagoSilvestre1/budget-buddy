import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Main from '../components/Main.vue'
import Calendar from '../components/Calendar.vue'
import Settings from '../components/Settings.vue'
import Home from '../components/Home.vue'
import Project from '../components/project/Project.vue';
import Collaborators from '../components/project/Collaborators.vue';
import Products from '../components/project/Products.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        {
          path: 'settings',
          component: Settings
        },
        {
          path: 'calendar',
          component: Calendar
        },
        {
          path: '/home',
          component: Home
        },
        {
          path: '/project',
          component: Project,
          children: [
            {
              path: 'products',
              component: Products,
            },
            {
              path: 'collaborators',
              component: Collaborators
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})

export default router
