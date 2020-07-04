import { axiosIns } from "@/plugins/Axios";

const state = {
	partners: null,
	err: null,
	code: null
}

const getters = {
	err(state) {
		return state.err
	}
}

const mutations = {
	setPartners(state, data) {
		console.log(data)
		state.partners = data.data
	},

	setErr(state, err) {
		console.log(err, err.response, state)
	},

	putPartner(state, {response, index}) {
		console.log(response)
		state.partners[index] = response.data;
	}
}

const actions = {
	getPartners({commit}, id) {

		axiosIns.get(`api/core/partners/${id}/`)
			.then( (response) => {
				console.log(response)
				commit('setPartners', response)
			})
			.catch( (err) => {
				console.log('is there an errror?')
				commit('setErr', err)
			})
	},

	putPartner({commit}, {payload, index}) {
		console.log(typeof payload['other_names'])
		axiosIns.put(`api/core/partners/${payload.id}/`, payload)
			.then( (response) => {
				console.log('re')
				commit('putPartner', {response, index})
			})
			.catch( (err) => {
				console.log('er')
				commit('setErr', err)
			})
	}
}

export const partners = {
	state,
	getters,
	mutations,
	actions,
	namespaced: true
}