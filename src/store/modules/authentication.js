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
    is_manager: null,
    of_node: []
  },
  mainNode: null,
  isAuthenticated: false,
  jwt: '',
  refreshToken: '',
  authErr: '',
  oauthMsg: ''
}

const state = Object.assign({}, initialState)

const getters = {
  //all getters are collected at the root level, and added into state
  getAuthUser(state) {
    return state.authUser;
  },

  getNodes(state){
    return state.authUser.of_node
  },

  selectedNodeOrDefault(state) {
    console.log(state.mainNode, state.authUser.of_node[0], '?')
    if (state.mainNode == null) {
      return state.authUser.of_node.length != 0 ? state.authUser.of_node[0] : null
    }
    return state.mainNode
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
}

const mutations = {

    initializeStore(state){
      console.log('kaka', state)
      if (localStorage.getItem('state')) { 
        let authObj = JSON.parse(localStorage.getItem('state'))       
        Object.assign(state, authObj)
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
      router.push('/')

    },

    authErr(state, {err, deleteErr}) {
      if (deleteErr) {
        state.authErr = ""
      } else {
        state.authErr = err
      }
    },

    oauth(state, status) {
      if (status) {
        state.oauthMsg = 'You\'ve succesfully linked your google account to our servers!'
      } else {
        state.oauthMsg = 'there was a problem'
      }
    },

    setMainNode(state, mainNode) {
      state.mainNode = mainNode;
    }
  }
  
const actions = {

  login({commit}, payload) {
    axiosIns.post('/api/auth/token/', {email: payload.email, password: payload.password})
      .then( (response) => {
        commit('addTokens', {token:response.data});
        return true;
      }).catch( (err) => {
        commit('authErr', {err: err.response.data.detail})
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
              commit('authErr', {deleteErr: true})
            })       
        }
      })
  },

  signUp({commit}, payload) {
    //lotsa work to be done here as it relates to navigation guard!!!!!
    console.log(payload)
    axiosIns.post('/api/auth/signup/', payload)
      .then( (response) => {
        commit('setAuthUser', response.data)
        return response.data
      })
      .catch( (err) => {
        console.log('you done fucked up', err.response.data.detail)
        commit('authErr', {err:err.response.data.detail})
        return false
      }).then( (data) => {
        if (!data) {
          console.log('didnt work')
        } else {
          axiosIns.post('api/auth/token/', {email: data.email, password: data.password})
            .then( (response) => {
              commit('addTokens', {token: response.data})
            }).catch((err) => {
              console.log('bad fucking fail m8', err)
            })
        }
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
    axiosIns.get('api/auth/callback/'+path)
      .then( response => {
        if (response.status == 200){
          commit('auth/oauth', true)
          return true
        }
        console.log(response.status)
      })
      .catch( err => {
        commit('auth/oauth', false)
        console.log(err)
      })
      .then( () => {
        console.log('third chain')
        router.push('/node')
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