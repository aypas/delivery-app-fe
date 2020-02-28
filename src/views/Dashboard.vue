<template>
	<v-app>

		<component v-bind:is=" msg ? 'orders' : 'null'"></component>
	
	</v-app>
</template>


<script>
import { axiosIns } from "@/plugins/Axios"
import Orders from "@/components/Orders"


export default {
//idea is to create a literal dashboard in here, where several components can be combined
//into one view, that is made custom by the user...i.e, the quick menu will offer those components
//as their own views, but in dashboard, those components can be combined into one custom page...
//a whole combination of carousels and shit can be used for this
	data(){
		return {
			msg: 'dash',
			//r: this.$store.state.jwt
		}
	},

	computed: {
		t() {
			if (this.$store.state.auth.jwt){
				return this.$store.state.auth.jwt.slice(-10)
			}
			return null
		},

		quickSelect() {
			return this.$routes.params
		}
	},

	methods: {
		check() {
			console.log(this.r)
			axiosIns.get('api/auth/users/')
				.then((response) => {
					console.log(response)
				}).catch( (err) => {
					console.log(err.response, 'und')
				})
		}
	},

	components: {
		Orders
	}
}
</script>