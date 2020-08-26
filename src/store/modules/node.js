import { axiosIns } from "@/plugins/Axios";

const state = {
	nodeData: null,
	nodeError: null,
	loading: false,
	putPermErr: null 
}


const mutations = {
	setNode(state, data) {
		console.log('hello')
		state.nodeData = data;
	},

	setError(state, response) {
		console.log(response, 'this is supposed to be an error?')
		state.nodeError = response.data.detail;
	},

	setLoading(state) {
		state.loading = !state.loading;
	},

	setPutPermErr(state, err) {
		state.putPermErr = err;
	}
}

const getters = {
	nodeData(state) {
		return state.nodeData;
	}
}


const actions = {
	getNode({commit}, id) {
		commit('setLoading')
		axiosIns.get(`api/core/node/${id}/`)
			.then( (response) => {
				console.log(response.data)
				commit('setLoading');
				commit('setNode', response.data);
			})
			.catch( (error) => {
				console.log(error, 'why?')
				commit('setLoading');
				commit('setError', error.response);
			})

	},

	putNode({commit}, {data, id}) {
		console.log(data, id)
		axiosIns.put(`api/core/node/${id}/`, data)
			.then( (response) => {
				commit('setNode', response.data);
				console.log(response.data)
			})
			.catch( (error) => {
				console.log(error, error.response, 'there\'s literally no point to this catch')
				commit('setError', error.response);
			})
	},

	postNode({commit}, {data, id}) {
		axiosIns.post(`api/core/node/${id}/`, data)
			.then( (response) => {
				console.log(response.data, response.status)
				commit('setNode', response.data);
				return true;
			})
			.catch( (err) => {
				console.log(err, err.response.data.detail)
				commit('setError', err.response);
				return false;
			})
			.then( (bool) => {
				if (bool) {
					axiosIns.get('api/auth/user/')
						.then( (response) => {
							commit('auth/setAuthUser', response.data, {root: true});
						})

				}
			})
	},

	postPerms({commit}, {perm, ids}) {
		axiosIns.post(`api/core/permissions/${perm}/${ids.node}/${ids.user}/`)
			.then( (response) => {
				console.log(response.data)
			})
			.catch( (err) => {
				commit('setPutPermErr', err.data)
			})
	}
}


export const node = {
	state,
	getters,
	mutations,
	actions,
	namespaced: true
}

