import Vue from 'vue'

export const authentication = {
  state: {

    authUser: {},
    isAuthenticated: false,
    jwt: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refresh')
    
  },

  mutations: {

    setAuthUser(state, authUser) {
      Vue.set(state, 'authUser', authUser);
      Vue.set(state, 'isAuthenticated', true)
      console.log('pls make true', state.isAuthenticated)
    },

    updateToken(state, newToken) {
      console.log('dispatched', newToken)
      if (newToken.hasOwnProperty('refresh')){
        localStorage.setItem('token', newToken.access);
        localStorage.setItem('refresh', newToken.refresh);
        Vue.set(state, 'jwt', newToken.access);
        Vue.set(state, 'refresh', newToken.refresh);
        console.log('login');
      } else {
        console.log('update tokens commiting...');
        localStorage.setItem('token', newToken.access);
        Vue.set(state, 'jwt', newToken.access);
      }
    },


    removeToken(state){
      localStorage.removeItem('token');
      localStorage.removeItem('refresh');
      Vue.set(state, 'jwt', null);
      Vue.set(state, 'refresh', null); 
    }
    
  },
  
  actions: {

    login(context, token) {
      console.log('pls print', token.access);
      this.commit('updateToken', token);
    },

    setUserData(context, userData) {
      console.log('dispatched userdata');
      this.commit('setAuthUser', userData);
    },

    logout(context) {
      context.commit('removeToken')
    }

  },
}