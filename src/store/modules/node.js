import { axiosIns } from "@/plugins/Axios"

const state = {
	nodeData: null,
	nodeError: null
}


const mutations = {
	setNode(state, data) {
		state.nodeData = data;
	},

	setError(state, data) {
		console.log(data, 'this is supposed to be an error?')
		state.nodeError = {status: data.status, "error": data.data.detail};
	}
}


const actions = {
	getNode({commit}, id) {
		axiosIns.get(`api/core/node/${id}/`)
			.then( (response) => {
				console.log(response.data)
				commit('setNode', response.data)
			})
			.catch( (error) => {
				console.log(error, 'why?')
				commit('setError', error.response.data)
			})
	},

	putNode({commit}, {data, id}) {
		console.log(data, id)
		axiosIns.put(`api/core/node/${id}/`, data)
			.then( (response) => {
				commit('setNode', response.data)
				console.log(response.data)
			})
			.catch( (error) => {
				console.log(error, error.response, 'there\'s literally no point to this catch')
				commit('setError', error.response)
			})
	},

	postNode({commit}, {data, id}) {
		axiosIns.post(`api/core/node/${id}/`, data)
			.then( (response) => {
				console.log(response.data, response.status)
				commit('setNode', response.data)
				return true
			})
			.catch( (err) => {
				console.log(err, err.response.data.detail)
				commit('setError', err.response)
				return false
			})
			.then( (bool) => {
				if (bool) {
					axiosIns.get('api/auth/user/')
						.then( (response) => {
							commit('auth/setAuthUser', response.data, {root: true})
						})

				}
			})
	}
}


export const node = {
	state,
	mutations,
	actions,
	namespaced: true
}

