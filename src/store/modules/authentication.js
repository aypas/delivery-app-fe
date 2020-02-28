import { axiosIns } from "@/plugins/Axios"
//import Vue from 'vue'


const initialState = {
  authUser: {

    id: 0,
    is_active: null,
    email: '',
    name: '',
    created: '',
    is_node_owner: null,
    status: '',
    on_shift: null,
    is_manager: null
  },
  isAuthenticated: false,
  jwt: '',
  refreshToken: '',
  num: 0
}

const state = Object.assign({}, initialState)

const getters = {
  //all getters are collected at the root level, and added into state
  getAuthUser(state) {
    return state.authUser;
  },

  getIsAuthenticated(state) {
    return state.isAuthenticated;
  },

  getJWT(state) {
    return state.jwt;
  },

  getRefresh(state) {
    return state.refreshToken;
  },

  getNum(state){
    return state.num;
  }
}

const mutations = {

    initializeStore(state){
      console.log('kaka', state)
      if (localStorage.getItem('state')) {

        
        Object.assign(state, JSON.parse(localStorage.getItem('state')))
          
        state.isAuthenticated=true;
      }
    },

    setAuthUser(state, authUser) {
      console.log(state, authUser)
      console.log('pls make true', state.isAuthenticated)
      state.authUser =  {...authUser};
      state.isAuthenticated = true;
      console.log(!!authUser)


    },

    add(state) {
      state.num++
    },

    addTokens(state, token) {
      console.log('addTokens..',token.token, state)
      state.jwt = token.token.access;
      state.refreshToken = token.token.refresh;

    },

    refresh(state, newToken) {
      console.log(state, newToken)
      if (newToken.hasOwnProperty('access')) {
        state.jwt = newToken.access;
        console.log('has')
      } else if (newToken.hasProperty('refresh')) {
        console.log('sheeeeeeit')
      }
    },

    removeAllCreds(state){
      //localStorage.removeItem('state');
      console.log(state)
      for (let prop in state) {
        state[prop] = initialState[prop]
      }
      
      localStorage.removeItem('state')

    }

  }
  
const actions = {

  login({commit}, payload) {

    console.log('i work', commit, payload.password)

    axiosIns.post('/api/auth/token/', {email: payload.email, password: payload.password}
      ).then( (response) => {
        commit('addTokens', {token:response.data});
        return true;
      }).catch( (err) => {
        console.log(err, 'errrr?')
        this.err = err.response.status
        this.errDetail = err.response.data.detail
        return false
      }).then( (obj) => {
        if (obj) {
          axiosIns.get('api/auth/user/')
            .then( (response) => {
              commit('setAuthUser', response.data);
            })
            .catch( (err) => {
              console.log(err, 'big error')
            })
        }
      })
  }

}



export const auth = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}