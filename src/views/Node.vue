<template>
<div>
	{{yourNode}}
</div>
</template>



<script>
import { axiosIns } from '../plugins/Axios.js';

export default {
	data() {
		return {
			yourNode:{}
		}
	},

	mounted() {
		this.mountedMethod()
	},

	methods: {
		mountedMethod(c=0) {
			console.log(c);
			c++;
			axiosIns.get('api/core/node/')
				.then( (response) => {
				  this.yourNode = response.data;
				  return true;
				}).catch( (err) => {
					console.log(err.response.status);
					return err.response.status;
				}).then( (obj) => {
					if (!obj && this.$state.auth.jwt && c<3) {
						this.mountedMethod(c);
					}
				});
		}
	}
}
</script>




<style>
	

</style>