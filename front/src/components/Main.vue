<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer v-model="drawer" temporary>
        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
          <v-list-item prepend-icon="mdi-theme-light-dark" title="toggle theme" @click="toggleTheme">
      
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="min-height: 100vh">
        <div class="">
          <v-btn color="primary" @click.stop="drawer = !drawer">
            <v-icon icon="mdi-vuetify"></v-icon>
          </v-btn>
        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { useTheme } from 'vuetify/lib/framework.mjs';
export default {

  setup() {
    const theme = useTheme();
    return {
      theme,
      toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    }
  },

  data: () => {
    return {
      drawer: false
    }
  }
}
</script>
