<template>
<div>
	<v-btn @click="oauth">kaka</v-btn>
</div>
</template>



<script>
//import { axiosIns } from '../plugins/Axios.js';

export default {
	data() {
		return {
			yourNode:{}
		}
	},

	methods: {
		oauth() {
			this.$store.dispatch('auth/oauth')
		}
	}
}
</script>




<style>
	

</style>