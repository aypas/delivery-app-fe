import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { axiosIns } from '@/plugins/Axios';

Vue.config.productionTip = true;



new Vue({
  created: function(){
    console.log('ccc');
    if (this.$store.state.auth.jwt && this.$store.state.auth.refreshToken){
      axiosIns.get('api/auth/user/', {timeout: 3000})
        .then( (response) => {
          this.$store.dispatch('setUserData', response.data);
        }).catch( (err) => {
          console.log('ruh oh', err)
        });
    }
  },
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
