import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from './modules/authentication';
import { orders } from './modules/orders';
import { node } from './modules/node';
import { partners } from './modules/partners';
import { errors } from './modules/errors';

Vue.use(Vuex);

const watchState = store => {
  store.subscribe( (mutation, state) => {
    if (mutation.type=="auth/setAuthUser" || mutation.type=="auth/refresh" || mutation.type == "auth/setMainNode") {
      localStorage.setItem("state", JSON.stringify(state.auth))
    }
  })
}

export const store = new Vuex.Store({
  plugins: [watchState],
  modules: {
    auth: auth,
    orders: orders,
    node: node,
    partners: partners,
    errors: errors
  }
});




