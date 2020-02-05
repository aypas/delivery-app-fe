<template>
	<div class="fff">
	<v-app>
		<div id="container">

			<v-container>
				<p class="mt-4 display-3 indigo--text mb-12">Sign In</p>


				<v-form class="mx-auto">
					<v-text-field
								v-model="email"
								class="mb-4"
	              label="Email"
	              outlined
	        ></v-text-field>

	  			<v-text-field
	  				v-model="password"
	        	label="Password"
	        	outlined
	        	type="password"
	        ></v-text-field>
				</v-form>
							<div>
				<p v-if="!err" class="caption">Forgot My Password</p>
				<p class="caption" v-else-if="err==400">You left one of the two fields empty</p>
				<p class="caption" v-else-if="err==401">{{errDetail}}</p>
				</div>
				<v-btn x-large rounded ripple elevation="4" color="indigo" class="white--text" @click="post">Sign In</v-btn>
			</v-container>
		</div>	
		<!-- {{t}} -->
	</v-app>
	</div>

</template>



<script>
import { axiosIns } from '../plugins/Axios.js'
export default {
	name: 'SignIn',

	data(){
		return {
			email: null,
			password: null,
			data: null,
			err: null,
			errDetail: null
		}
	},

	methods: {
		
		post(){
			if (this.validateInput()){
				return null
			}
			axiosIns.post('/api/auth/token/', {email: this.email, password: this.password}
			).then( (response) => {
				this.$store.dispatch('login', response.data);
				return true;
			}).catch( (err) => {
				console.log(err)
				this.err = err.response.status
				this.errDetail = err.response.data.detail
				return false
			}).then( (obj) => {
				if (obj) {
					axiosIns.get('api/auth/user/')
						.then( (response) => {
							this.$store.dispatch('setUserData', response.data)
						})
						.catch( (err) => {
							console.log(err, 'big error')
						})
				}
			})
		},

		validateInput(){
			if (!this.email | !this.password){
				this.err = 400
				return true
			} else if (!this.validateEmail(this.email)){
				this.err = 400
				return true
			}
		},

		validateEmail(email) {
    	var re = /\S+@\S+\.\S+/
    	return re.test(String(email).toLowerCase());
		}
	}
}

</script>


<style scoped>
div#container {
	border: 1px solid black;
	height: 500px;
	width: 400px;
}

div.fff {
	display: flex;
	justify-content: center;
}


</style>