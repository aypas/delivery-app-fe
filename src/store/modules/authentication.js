import { axiosIns } from "@/plugins/Axios"
import router from "@/router/index"


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
  loginErr: ''
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
        console.log(state)
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

    },

    loginErr(state, deleteErr) {
      if (deleteErr) {
        state.loginErr = ""
      } else {
        state.loginErr = "An account with the given credentials does not exist."
      }
    }

  }
  
const actions = {

  login({commit}, payload) {
    axiosIns.post('/api/auth/token/', {email: payload.email, password: payload.password})
      .then( (response) => {
        commit('addTokens', {token:response.data});
        return true;
      }).catch( (err) => {
        commit('loginErr')
        console.log(err)
        return false
      }).then( (obj) => {
        if (obj) {
          axiosIns.get('api/auth/user/')
            .then( (response) => {
              commit('setAuthUser', response.data);
              router.push('/dashboard')
            })
            .catch( (err) => {
              console.log(err, 'big error')
              commit('loginErr', true)
            })       
        }
      })
  },

  signUp({commit}, payload) {
    //lotsa work to be done here as it relates to navigation guard!!!!!
    console.log(payload)
    axiosIns.post('/api/auth/signup/', {payload})
      .then( (response) => {
        console.log(response, `${commit}`)
      })
      .catch( (err) => {
        console.log('you done fucked up', err)
      })
  },

  oauth() {
    axiosIns.get('api/auth/oauth/')
      .then( response => {
        window.location.href = response.data.url
      })
  },

  getAccess({commit},{path}) {
    console.log(commit, path, 'kakaakakaka')
    axiosIns.get('api/auth/realcallback/'+path)
      .then( response => {
        console.log(response.status)
      })
      .catch( err => {
        console.log(err)
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