<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer v-model="drawer" temporary>
        <v-divider></v-divider>

        <v-list nav>
          <v-list-item prepend-icon="mdi-home" title="Home" value="home"></v-list-item>

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
            v-bind:href="'calendar'"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-cogs"
            title="Settings"
            value="settings"
            v-bind:href="'settings'"
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
        <div class="">
          <v-btn icon="mdi-menu" @click.stop="drawer = !drawer"> </v-btn>
        </div>
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
