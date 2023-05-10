import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import Vuex from 'vuex'

import './assets/base.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { fa } from 'vuetify/iconsets/fa'
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi'

import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)

import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';


app.use(router)
app.use(setupCalendar, {})

app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)
app.component('VueDatePicker', VueDatePicker)

//let ctheme: string = theme.global.current.value.dark ? 'dark' : 'light'

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
      fa
    }
  },
  components,
  directives
})

app.use(vuetify)

app.use(store)

app.mount('#app')
