<template>
	<v-app>
			
			<keep-alive>
			<component 
				v-if="component=='orders'"
				v-bind:is="'Orders'"
				v-on:change-view="handleEvent($event)"
				:parent-data="component == 'viewOrder' ? props : null"
				>	
			</component>
			</keep-alive>

			<component 
				v-if="component=='viewOrder'"
				v-bind:is="'ViewOrder'"
				v-on:change-view="handleEvent($event)"
				:parent-data="props"
				>	
			</component>
	</v-app>
</template>


<script>
import Orders from "@/components/Orders"
import ViewOrder from "@/components/ViewOrder"


export default {
	data(){
		return {
			component: 'orders',
			props: null
		}
	},

	computed: {
		t() {
			if (this.$store.state.auth.jwt){
				return this.$store.state.auth.jwt.slice(-10)
			}
			console.log(this.$store.state.auth.oauthMsg)
			return null
		},

		quickSelect() {
			return this.$routes.params
		}
	},

	methods: {
		handleEvent(event) {
			console.log(event)
			this.component = event[0]
			this.props = event[1]
		},

		test() {
			this.$store.dispatch('orders/test')
		}
	},

	components: {
		Orders,
		ViewOrder
	}
}
</script>