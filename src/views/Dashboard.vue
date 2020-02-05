<template>
	<v-app>
	<div>
		<v-btn x-large @click="check">check</v-btn>
		<p>{{t}}</p>
	</div>
	</v-app>
</template>


<script>
import { axiosIns } from "@/plugins/Axios"

export default {

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
		}
	},

	methods: {
		check() {
			console.log(this.r)
			axiosIns.get('api/auth/users/')
				.then((response) => {
					console.log(response)
				}).catch( (err) => {
					console.log(err.response)
				})
		}
	},

	beforeCreate: function() {
		if (!this.$store.state.auth.isAuthenticated) {
			this.$router.push('home')
		}
	}
}
</script>