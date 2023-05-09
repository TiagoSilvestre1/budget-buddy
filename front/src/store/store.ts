import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from './modules/auth/index'
import project from './modules/project/index'

const store = createStore({
  modules: {
    project,
    auth
  },
  plugins: [createPersistedState()]
})

export default store
