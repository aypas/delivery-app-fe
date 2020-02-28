<template>
	<div class="fff">
	<v-app>
		<div id="container">
			<v-container>
				<p class="mt-4 display-3 indigo--text mb-12">Sign In</p>
				<v-form class="mx-auto">
					<v-text-field
								v-model="json.email"
								class="mb-4"
	              label="Email"
	              outlined
	        ></v-text-field>
	  			<v-text-field
	  				v-model="json.password"
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
	</v-app>
	</div>

</template>



<script>
export default {
	name: 'SignIn',

	data(){
		return {
			json: {
				email: null,
				password: null
			},
			data: null,
			err: null,
			errDetail: null
		}
	},

	methods: {
		
		post(){
			console.log(this.json)
			if (this.validateInput()){
				return null
			}
			console.log('i work')
			this.$store.dispatch('auth/login', this.json);
		},

		validateInput(){
			if (!this.json.email | !this.json.password){
				this.err = 400
				return true
			} else if (!this.validateEmail(this.json.email)){
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