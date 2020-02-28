<template>
<p>{{t}}</p>	
</template>


<script>
import { axiosIns } from '../plugins/Axios';
export default {
	data() {
		return {t: 10}
	},

	beforeCreate: () => {
		axiosIns.get('api/core/orders/')
			.then((response) => {
				console.log(response.data)
			})
			.catch( (err) => {
				console.log(err)
			})
	}
}
</script>