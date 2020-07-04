<template>
	<v-app>
		<v-container class="container elevation-1">
		
		<v-row>
			<v-col cols="6">
				<v-list-item three-line>
					<v-list-item-content>
						<v-list-item-title>Requirements</v-list-item-title>
						<v-list-item-subtitle class="text-center">Full Name</v-list-item-subtitle>
						<v-list-item-subtitle class="text-center">Minimum 8 character password</v-list-item-subtitle>
						<v-list-item-subtitle class="text-center">Valid 6 digit employer given code</v-list-item-subtitle>
						<p class="mt-10 pt-10 red--text text--lighten-1">{{authErr}}</p>
					</v-list-item-content>
				</v-list-item>
			</v-col>
			
			<v-col cols="6">
			<v-form class="px-5"
				ref="form"
				v-model.lazy="valid"
				lazy-validation
			>
				<v-text-field
					v-model.lazy="name"
					:rules="nameRules"
					label="Name"
					required
				>
					
				</v-text-field>

				<v-text-field
					v-model.lazy="email"
					label="E-mail"
					:rules="emailRules"
					required
					>
				</v-text-field>

				<v-text-field
					v-model.lazy="password"
					:rules="passwordRules"
					label="Password"
					type="password"
					>
				</v-text-field>

				<v-text-field
					v-model.number="code"
					:rules="codeRules"
					type="string"
					label="Code"
					validate-on-blur
					required
					>

				</v-text-field>

				<v-btn color="indigo" class="white--text" @click="validate">Submit</v-btn>
			</v-form>
			</v-col>
	</v-row>

	</v-container>
	</v-app>	
</template>


<script>
export default {
	data() {
		return {
			valid: true,
			name: '',
			email: '',
			code: '',
			password: '',
			lazy: true,
			nameRules: [],
			emailRules: [],
			codeRules: [],
			passwordRules: []
		}
	},

	computed: {
		authErr() {
			return this.$store.state.auth.authErr
		}
	},
	
	methods: {
		validate() {

			this.nameRules = [
				v => !!v || 'A name is required',
			]

			this.emailRules = [
				v => !!v || 'E-mail is required',
      	v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
			]

			this.codeRules = [
				v => !!v || 'A code is required',
				v => (v >= 100000 && v <= 999999) || 'Invalid Code, must be 6 digits, cannot start with a 0',
			]

			this.passwordRules = [
				v => !!v || "password is required",
				v => v.length>=8 || 'Password must be at least 8 characters long'
			]

			//console.log(this.$refs.form.validate())
			let self = this
			setTimeout( function() {
				if (self.$refs.form.validate()) {
					console.log(typeof self.code)
					self.$store.dispatch('auth/signUp', {name: self.name, email: self.email, code: self.code, password: self.password})
				} else {
					console.log("invalid")
				}
			})
		}
	}
}
</script>