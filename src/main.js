import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { store } from './store/index';
import DatetimePicker from 'vuetify-datetime-picker';
import VueChatScroll from 'vue-chat-scroll';

Vue.use(VueChatScroll);
Vue.use(DatetimePicker);
Vue.config.productionTip = true;

(() => {store.commit('auth/initializeStore')})();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');