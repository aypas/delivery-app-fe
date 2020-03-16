import { axiosIns } from "@/plugins/Axios"

const state = {
  data: [],
  lastUpdated: ''
}

const getters = {
  getData(state) {
    return state.data
  },

  getLastUpdated(state) {
    return state.lastUpdated
  }
}


const mutations = {
  
  mutateData(state, payload) {
    state.data = payload;
    let r = new Date()
    state.lastUpdated = r.toLocaleTimeString()
  }

}

const actions = {

  apiOrders({commit}, queryString) {
    console.log("does it run?")
    axiosIns
      .get(`api/core/orders/${Object.entries(queryString).length ? `?${encodeURIComponent(JSON.stringify(queryString))}` : ''}`)
      .then((response) => {
        commit('mutateData', response.data);
      })
      .catch( (err) => {
        console.log(err);
      })
  }

}


export const orders = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}