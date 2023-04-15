import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/base.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const app = createApp(App)

app.use(router);

const vuetify = createVuetify({
    components,
    directives,
    theme: {}
});

app.use(vuetify);    

app.mount('#app')
