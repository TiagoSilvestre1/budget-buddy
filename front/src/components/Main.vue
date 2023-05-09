<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer v-model="drawer" temporary>
        <v-divider></v-divider>

        <v-list nav>
          <v-list-item
            prepend-icon="mdi-home"
            title="Home"
            value="home"
            router-link
            href="/home"
          ></v-list-item>

          <v-list-group value="Projects">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                prepend-icon="mdi-view-list"
                title="Projects"
              ></v-list-item>
            </template>

            <v-list-item
              v-for="project in projects"
              :key="project.id"
              :title="project.title"
              router-link
              :to="'/project/' + project._id"
              @click="selectProject(project._id)"
            ></v-list-item>
          </v-list-group>

          <v-list-item
            prepend-icon="mdi-calendar-month"
            title="calendar"
            value="calendar"
            router-link
            href="/calendar"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-cogs"
            title="Settings"
            value="settings"
            router-link
            href="/settings"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-theme-light-dark"
            title="toggle theme"
            @click="toggleTheme"
          >
          </v-list-item>
          <v-list-item prepend-icon="mdi-logout-variant" title="logout" @click="logout" />

          <v-list-item prepend-icon="" title="See user (dev, console print)" @click="seeUser" />

          <v-list-item
            prepend-icon=""
            title="See project (dev, console print)"
            @click="seeProject"
          />
        </v-list>
      </v-navigation-drawer>

      <v-main style="min-height: 100vh; margin-bottom: 15.5vh">
        <v-btn class="left-navbar-button" icon="mdi-menu" @click.stop="drawer = !drawer"> </v-btn>

        <div style="height: 3vh"></div>

        <router-view v-if="$route.path !== '/home'" />
        <Home v-if="$route.path === '/home'" @update="handleChildEvent" />

        <div class="footer">
          <v-card>
            <Footer></Footer>
          </v-card>
        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { useTheme } from 'vuetify/lib/framework.mjs'
import Footer, { FooterViews } from './Footer.vue'
import { backendService, type API } from '@/services/api-service'
import { mapGetters, useStore } from 'vuex'
import Home from '@/components/Home.vue'
export default {
  components: {
    Footer,
    Home
  },
  setup() {
    const theme = useTheme()
    return {
      theme,
      toggleTheme: () =>
        (theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark')
    }
  },

  created() {
    this.getProjects()
  },

  data: () => {
    return {
      drawer: false,
      store: useStore(),
      projects: [] as Array<any>,
      view: FooterViews.GLOBAL
    }
  },
  computed: {
    ...mapGetters('auth', ['getUser']),
    ...mapGetters('project', ['getProject'])
  },
  methods: {
    async logout() {
      await this.store.dispatch('auth/LogOut')
      this.$router.push('/login')
    },

    seeUser() {
      console.log(this.getUser)
    },
    seeProject() {
      console.log(this.getProject)
    },

    async selectProject(id: string) {
      const obj = this.projects.find((val) => val._id === id)
      await this.store.dispatch('project/SelectProject', obj)
    },

    handleChildEvent(value: string) {
      if (value === 'project') {
        this.getProjects()
      }
    },
    getProjects() {
      backendService
        .get('api/project/byUserId?user_id=' + this.getUser.id)
        .then((response: API) => {
          if ('success' in response && response.success === true) {
            this.projects = response.data.owned.concat(response.data.collaborates)
          }
        })
    }
  }
}
</script>

<style>
.left-navbar-button {
  position: absolute;
  left: 5px;
  top: 5px;
}

.main-title {
  text-align: center;
}

.main-subtitle {
  text-align: left;
  margin-left: 5vw;
}

.centered {
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  max-height: 15.5vh;
  min-height: 9.5vh;
  overflow-y: auto;
  border-top: 1px solid #ddd; /* Add a 1px solid border to the top of the footer */
  box-shadow: 0px -3px 10px rgba(161, 161, 161, 0.5); /* Add a box shadow to the bottom of the footer */
}
</style>
