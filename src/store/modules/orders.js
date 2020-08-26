import { axiosIns } from "@/plugins/Axios"

const state = {
  dashboardOrders: { 
    orderData: [],
    lastUpdated: '',
    loading: false,
    err: '',
    updateErr: ''
  },

  searchOrders: {
    orderData: [],
    lastUpdated: '',
    loading: false,
    err: '',
    updateErr: ''
  }
}

const getters = {
  orderData(state) {
    return state['dashboardOrders'].orderData
  }
}


const mutations = {
  
  mutateData(state, {payload, type}) {
    state[type].orderData = payload;
    state[type].lastUpdated = new Date().toLocaleTimeString();
    state[type].err = "";
  },

  setLoading(state, type) {
    state[type].loading = !state[type].loading;
  },

  setErr(state, {response, type}) {
    state[type].err = response.data.detail;
  },

  updateOrder(state, {order, index, type}) {
    for (let key in order) {
      state[type]['orderData'][index][key] = order[key];
    }
  },

  updateErr(state, {err, type}) {
    state[type].updateErr = err.data.detail;
    console.log('is updateerr called?', err.data.detail)
  }

}

const actions = {

  getOrders({commit}, {id, queryString, type}) {
  //type options: 'dashboardOrders', 'searchOrders', 'todaysOrders'
    commit('setLoading', type)
    axiosIns
      .get(`api/core/orders/${id}/${Object.entries(queryString).length ? `?${encodeURIComponent(JSON.stringify(queryString))}` : ''}`)
      .then((response) => {
        console.log(response.data);
        commit('mutateData', {payload: response.data, type});
      })
      .catch( (err) => {
        try {
          console.log(err.response);
          commit('setErr', {response: err.response, type: type});
          console.log('why are we passing?')
        } catch {
          //pass
          console.log('pass?')
        }
      })
      .then( () => {
        commit('setLoading', type);
      })
  },

  putOrder({commit}, {payload, id, index}) {
    axiosIns.put(`api/core/orders/${id}/`, payload)
      .then((response) => {
        console.log(response.data)
        commit('updateOrder', {order: response.data, index: index, type: 'dashboardOrders'})
      })
      .catch((error) => {
        try {
          commit('updateErr', { err: error.response, type: "dashboardOrders" })
        } catch {
          //pass
        }
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