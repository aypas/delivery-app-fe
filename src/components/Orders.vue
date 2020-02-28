<template>
	<div>	
		<div v-for="(data, index) in data" v-bind:key="index">
			<p>data.id</p>
		</div>
	</div>
</template>


<script>
import { axiosIns } from '../plugins/Axios';
export default {
	data() {
		return {
			t: 10,
			data: null
		}
	},

	created: () => {
		axiosIns.get('api/core/orders/')
			.then((response) => {
				this.data = response.data;
			})
			.catch( (err) => {
				console.log(err)
			})
	}
}
</script>