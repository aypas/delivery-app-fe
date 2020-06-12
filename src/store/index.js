import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './modules/authentication'
import { orders } from './modules/orders'

Vue.use(Vuex)

const watchState = store => {
  store.subscribe( (mutation, state) => {
    if (mutation.type=="auth/setAuthUser" || mutation.type=="auth/refresh") {
      localStorage.setItem("state", JSON.stringify(state.auth))
    }
  })
}

export const store = new Vuex.Store({

  plugins: [watchState],
  modules: {
    auth: auth,
    orders: orders   
  }
})




