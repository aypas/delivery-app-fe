//save settings in cookies, initialize inside anon function in main.js

const state = {
	mainNode: null,
	defaultTimeQS: null,
	defaultDashboardView: null, //personal or node...only available for owners or managers
}

const getters = {}

const mutations = {
	initializeSettings() {
		let cookies = document.cookie;
		console.log(cookies);
		//...tbd
	}
}

const actions = {}

// export const settings = {
// 	namespaces: true,
// 	state,
// 	mutations,
// 	getters,
// 	actions
// }