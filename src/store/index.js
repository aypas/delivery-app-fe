import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './modules/authentication'
Vue.use(Vuex)

const watchState = store => {
  store.subscribe( (mutation, state) => {
    console.log('hello', state, mutation);

    if (mutation.type=="auth/setAuthUser" || mutation.type=="auth/refresh") {
      localStorage.setItem("state", JSON.stringify(state.auth))
    }
  })
}

export const store = new Vuex.Store({

  plugins: [watchState],
  modules: {
    auth: auth   
  }
})




