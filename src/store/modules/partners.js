import { axiosIns } from "@/plugins/Axios";

const state = {
	partners: [],
	err: null,
	loadingGet: false,
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
		state.err = null
	},

	setErr(state, err) {
		console.log(err, err.response, state)
		state.err = err.response.data.detail
	},

	putPartner(state, {response, index}) {
		console.log(response)
		state.partners[index] = response.data;
		state.err = null
	},

	postPartner(state, {response}) {
		state.partners.push(response.data)
		state.err = null
	},

	setLoadingGet(state) {
		state.loadingGet = !state.loadingGet;
	},

	makeInactive(state, index) {
		state.partners[index].active = !state.partners[index].active;
	}
}

const actions = {
	getPartners({commit}, id) {
		commit('setLoadingGet')
		axiosIns.get(`api/core/partners/${id}/`)
			.then( (response) => {
				console.log(response)
				commit('setPartners', response)
			})
			.catch( (err) => {
				try {
					commit('setErr', err)
				} catch {
					//pass
				}
			})
			.then( () => { commit('setLoadingGet')})
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
	},

	postPartner({commit}, {payload, id}) {
		axiosIns.post(`api/core/partners/${id}/`, payload)
			.then( (response) => {
				commit('postPartner', {response})
			})
			.catch( (err) => {
				console.log(err.response.detail)
				commit('setErr', err)
			})
	},

	deletePartner({commit}, {id, index, action}) {
		axiosIns.delete(`api/core/partners/${id}/`, {data: {active: action}})
			.then( () => {
				commit('makeInactive', index)
			})
			.catch( error => {
				console.log(error)
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