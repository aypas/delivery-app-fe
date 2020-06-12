const store = {
  err: 0,
  msg: '',
}

const getters = {
  getErr(state) {
    return state.err;
  },

  getMsg(state) {
    return state.msg;
  }
}

const mutations = {
  mutErr(state, status) {
    state.err = status;
    if (status >=400 && status<=499){
      state.msg = 'Permission error. Are you sure you\'re where you\'re supposed to be?';
    } else if (status >= 500 && status<=599) {
      state.msg = 'Server side issue. Please give our machines a few minutes before you place another request!';
    }
  }
}

export default {
  store,
  getters,
  mutations
}