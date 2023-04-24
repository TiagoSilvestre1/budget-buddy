<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer v-model="drawer" temporary>
        <v-divider></v-divider>

        <v-list nav>
          <v-list-item prepend-icon="mdi-home" title="Home" value="home" router-link to="/"></v-list-item>

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
              :title="project[0]"
              v-bind:href="project[1]"
            ></v-list-item>
          </v-list-group>

          <v-list-item
            prepend-icon="mdi-calendar-month"
            title="calendar"
            value="calendar"
            router-link to="calendar"

          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-cogs"
            title="Settings"
            value="settings"
            router-link to="settings"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-theme-light-dark"
            title="toggle theme"
            @click="toggleTheme"
          >
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="min-height: 100vh">
        <v-btn class="left-navbar-button" icon="mdi-menu" @click.stop="drawer = !drawer"> </v-btn>
          <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { useTheme } from 'vuetify/lib/framework.mjs'
export default {
  setup() {
    const theme = useTheme()
    return {
      theme,
      toggleTheme: () =>
        (theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark')
    }
  },

  data: () => {
    return {
      drawer: false,
      projects: [
        ['Project one', 'Relative url'],
        ['Project two', 'Relative url'],
        ['Project three', 'Relative url'],
        ['Project four', 'Relative url']
      ]
    }
  }
}
</script>

<style>
  .left-navbar-button
  {
    position: absolute;
    left:5px;
    top:5px;
  }
</style>