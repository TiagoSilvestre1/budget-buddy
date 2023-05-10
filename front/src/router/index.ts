import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Main from '../components/Main.vue'
import Calendar from '../components/Calendar.vue'
import Settings from '../components/Settings.vue'
import Home from '../components/Home.vue'
import Project from '../components/project/Project.vue'
import Collaborators from '../components/project/Collaborators.vue'
import ProjectCalendar from '../components/project/projectCalendar.vue'
import ProjectSettings from '../components/project/settings.vue'
import ProjectBudget from '../components/project/budget.vue'
import Products from '../components/project/Products.vue'
import { FooterViews } from '@/components/Footer.vue'
import store from '..//store/store'
import { mapGetters } from 'vuex'

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
          component: Settings,
          meta: {
            view: FooterViews.GLOBAL,
            name: 'settings'
          }
        },
        {
          path: 'calendar',
          component: Calendar,
          meta: {
            view: FooterViews.GLOBAL,
            name: 'calendar'
          }
        },
        {
          path: '/home',
          component: Home,
          meta: {
            view: FooterViews.GLOBAL,
            name: 'home'
          }
        },
        {
          path: '/project/:projectId',
          component: Project,
          meta: {
            view: FooterViews.PROJECT,

          },
          children: [
            {
              path: '',
              component: Products,
              meta: {
                view: FooterViews.PROJECT,
                name: 'project'
              }
            },
            {
              path: 'collaborators',
              component: Collaborators,
              meta: {
                view: FooterViews.PROJECT,
                name: 'collaborators'
              }
            },
            {
              path: 'calendar',
              component: ProjectCalendar,
              meta: {
                view: FooterViews.PROJECT,
                name: 'calendar'
              }
            },
            {
              path: 'settings',
              component: ProjectSettings,
              meta: {
                view: FooterViews.PROJECT,
                name: 'settings'
              }
            },
            {
              path: 'budget',
              component: ProjectBudget,
              meta: {
                view: FooterViews.PROJECT,
                name: 'budget'
              }
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

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated']

  if (!isAuthenticated && to.path !== '/login' && to.path !== '/register') {
    next('/login')
  } else {
    next()
  }
})

export default router
