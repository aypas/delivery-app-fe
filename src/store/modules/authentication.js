import { axiosIns } from "@/plugins/Axios"
import router from "@/router/index"

function deleteCookies() {
  document.cookie.split(";").forEach(function(c) { 
    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
  });
}

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
  mainNode: null, //this is a node object, not an index
  isAuthenticated: false,
  jwt: '',
  refreshToken: '',
  authErr: '',
  oauthMsg: '',
  loading: false
}

const state = Object.assign({}, initialState);

const getters = {
  //all getters are collected at the root level, and are called as this.$store.getters['auth/...']
  getPermissions(state) {
    let index = 0;
    if (state.mainNode != null) {
      index = state.authUser.of_node.findIndex((item) => {
        return item.id == state.mainNode.id
      })
    }
    return {worker: state.authUser.of_node[index].worker,
            owner: state.authUser.of_node[index].owner,
            manager: state.authUser.of_node[index].manager};
  },

  isNodeOwner(state) {
    return state.authUser.is_node_owner;
  },

  getNodes(state){
    //used only in nodeselector. idk why probs should get rid
    return state.authUser.of_node;
  },

  selectedNodeOrDefault(state) {
    console.log(state.mainNode, state.authUser.of_node[0], '?')
    console.log(state.authUser.of_node.length)
    if (state.mainNode == null) {
      return state.authUser.of_node.length != 0 ? state.authUser.of_node[0] : null;
    }
    return state.mainNode;
  }
}

const mutations = {

    initializeStore(state) {
      console.log('kaka', state)
      if (localStorage.getItem('state')) { 
        let authObj = JSON.parse(localStorage.getItem('state'));      
        Object.assign(state, authObj);
        console.log(state)
        state.isAuthenticated=true;
      }
    },

    setAuthUser(state, authUser) {
      state.authUser =  authUser;
      state.isAuthenticated = true;
    },

    addTokens(state, tokens) {
      console.log(tokens, 'this is token')
      state.jwt = tokens.access;
      state.refreshToken = tokens.refresh;

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
        state[prop] = initialState[prop];
      }
      deleteCookies();
      localStorage.removeItem('state');
      router.push('/');

    },

    authErr(state, {err, deleteErr}) {
      if (deleteErr) {
        state.authErr = "";
      } else {
        state.authErr = err;
      }
    },

    oauth(state, status) {
      if (status) {
        state.oauthMsg = 'You\'ve succesfully linked your google account to our servers!';
      } else {
        state.oauthMsg = 'there was a problem';
      }
    },

    setMainNode(state, mainNode) {
      state.mainNode = mainNode;
    },

    setLoading(state) {
      state.loading = !state.loading;
    }
  }
  
const actions = {
  login({commit}, payload) {
    let s = performance.now()
    commit('setLoading')
    axiosIns.post('/api/auth/token/', {email: payload.email, password: payload.password})
      .then( (response) => {
        commit('addTokens', response.data.tokens);
        commit('setAuthUser', response.data.user);
        return true;
      }).catch( (err) => {
        try {
          commit('authErr', {err: err.response.data.detail});
          console.log(err);
          return false;
        } catch { 
          return false; 
        }
      }).then( (obj) => {
        console.log('does it get here?')
        if (obj) {
          commit('setLoading');
          router.push('/dashboard');
        } else {
          commit('setLoading');
        }
        console.log(performance.now()-s)
      })
  },

  signUp({commit}, payload) {
    //lotsa work to be done here as it relates to navigation guard!!!!!
    console.log(payload)
    axiosIns.post('/api/auth/signup/', payload)
      .then( (response) => {
        //THERES NO NEED FOR RESPONSE TO SEND SERIALIZED DATA...DO EVERYTHING WITH /TOKEN tmrw
        commit('setAuthUser', response.data);
        return response.data;
      })
      .catch( (err) => {
        console.log('you done fucked up', err.response.data.detail);
        commit('authErr', {err:err.response.data.detail});
        return false;
      }).then( (data) => {
        if (!data) {
          console.log('didnt work')
        } else {
          axiosIns.post('api/auth/token/', {email: payload.email, password: payload.password})
            .then( (response) => {
              commit('addTokens', response.data.tokens);
              router.push('/dashboard');
            }).catch((err) => {
              console.log('bad fucking fail m8', err)
            })
        }
      })
  },

  oauth({commit}, {nodeId}) {
    let _commit = commit;
    console.log(nodeId)
    axiosIns.get(`api/auth/oauth/${nodeId}/`)
      .then( response => {
        window.location.href = response.data.url;
      })
  },

  getAccess({commit},{queryString, nodeId}) {
    axiosIns.get(`api/auth/callback/${nodeId}/${queryString}`)
      .then( response => {
        if (response.status == 200){
          commit('auth/oauth', true);
          return true;
        }
        console.log(response.status)
      })
      .catch( err => {
        commit('auth/oauth', false);
        console.log(err)
      })
      .then( () => {
        console.log('third chain')
        router.push('/node');
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