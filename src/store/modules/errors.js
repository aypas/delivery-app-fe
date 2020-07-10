const state = {
  message: '',
}


const getters = {}

const mutations = {
  setErr(state, set) {
    if (set) {
      state.message = "Are you sure you're connected to the internet? If so this might be a server side error.";
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