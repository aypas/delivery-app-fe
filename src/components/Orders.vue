<template>
	<div>	


		<v-container class="thing2">
		<v-layout row wrap>
			<v-flex xs12>
				<v-card>

				<v-layout>


					<v-flex xs3>
						<v-card height="100%">
							<v-card-title class="justify-center">Options</v-card-title>
							
								
							<v-card-text>
								<v-card-subtitle class="text-left pl-0 ml-0 pb-1">last updated: {{lastUpdated}} 
								<v-icon @click="updateOrders">mdi-refresh</v-icon>
								</v-card-subtitle>
								<v-switch v-model="queryString.assigned_to__isnull" :label="`unassigned`"></v-switch>
								<v-switch v-model="queryString.complete" v-bind:label="`complete`"></v-switch>
								<v-switch v-model="queryString.in_progress" :label="`in progress`"></v-switch>
								<v-select v-model="queryString.store" :items="[1,2,3]" :label="`store`"></v-select>
							</v-card-text>
						
						</v-card>
					</v-flex>

					<v-flex xs9>
						<v-card height="100%">
							<v-card-title class="justify-center">world</v-card-title>


						<v-card-text>
							<v-data-table
								:items="orderData"
								:item-key="orderData.id"
								:headers="headers"
								:items-per-page="10"
								
							>
								<template v-slot:item.deliver_by="{ item }">
									<span>{{new Date(item.deliver_by).toLocaleTimeString().slice(0,4)}}</span>
								</template>	

								<template v-slot:footer>
									<div class="foot"></div>
								</template>
							
							</v-data-table>

						</v-card-text>
						</v-card>
					</v-flex>
				</v-layout>
				</v-card>
			</v-flex>
		</v-layout>
		</v-container>


				{{lastUpdated}}
		<div v-for="(data, index) in orderData" v-bind:key="index">
			<p>{{data}}</p>
		</div>

	</div>
</template>


<script>
export default {
	data() {
		return {
			t: 0,
				
			queryString: {
				assigned_to__isnull: true,
				complete: false,
				in_progress: false,
				store: null								
			},
			headers: [
				{text: 'store', value: 'store'},
				{text: 'address', value: 'address'},
				{text: 'delivery by', value: 'deliver_by'},
				{text: 'fee', value: 'delivery_fee'},
				{text: 'tip', value: 'tip'}
			]
		}
	},

	computed: {
		orderData() {
			return this.$store.state.orders.orderData
		},

		lastUpdated() {
			return this.$store.state.orders.lastUpdated
		}
	},

	methods: {

		genQueryString() {
			if (!this.queryString.store) {
				delete this.queryString.store
			}
			return this.queryString
		},

		updateOrders() {
			this.$store.dispatch('orders/apiOrders', this.genQueryString())
		}


	},

	created() {
		this.updateOrders()
	}
}
</script>


<style>
div.foot {
	height: 300px;
}
</style>