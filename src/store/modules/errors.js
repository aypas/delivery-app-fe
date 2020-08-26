const state = {
  message: '',
  log: []
}


const getters = {}

const mutations = {
  setErr(state, set) {
    if (set) {
      state.message = "Are you sure you're connected to the internet? If so this might be a server side error.";
      state.log.push({msg: "either you don't have a connection to the internet or our servers are down", 
                      time: new Date().toLocaleTimeString()})
    } else {
      state.message = "";
    }
  }
}

const actions = {}

export const errors = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}