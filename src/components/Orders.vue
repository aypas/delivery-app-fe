<template>
	<v-container fluid>	
		{{dateTime.day+dateTime.time}}
		{{err}}
		<!-- gotta figure out how to serialize time into obj--will place today/yesterday switch opt -->
		<v-container fluid class="thing2">
			<v-col cols="12">
				<v-card :elevation="12">
					<v-card-title class="py-0 my-0">
							<v-app-bar-nav-icon @click.stop="drawer = !drawer" />
							<v-spacer></v-spacer>
							Orders
							<v-spacer></v-spacer>
							<v-text-field 
								label="Search"
          			append-icon="mdi-magnify"
          			single-line
								v-model="search">		
							</v-text-field>

					</v-card-title>
					<!-- <v-card-text> -->
						<v-data-table
							:items="orderData"
							:item-key="orderData.id"
							:headers="headers"
							:items-per-page="10"
							:disable-sort="true"
							:mobile-breakpoint="400"
							:search="search"
							:loading="loading"
							:height="'400px'"
						>

							<template v-slot:item.address="{ item }">
								<span>{{ item.address.slice(0,15)+"..." }}</span>
							</template>

							<template v-slot:item.deliver_by="{ item }">
								<span>{{new Date(item.deliver_by).toLocaleTimeString().slice(0,4)}}</span>
							</template>	

							<template v-slot:item.actions="{ item }">
				        <v-icon
				          small
				          class="mr-2"
				          @click="editItem(item)"
				        >
				          mdi-pencil
				        </v-icon>
				        <v-icon
				          small
				          @click="deleteItem(item)"
				        >
				          mdi-delete
				        </v-icon>
				      </template>

							<template v-slot:footer>
								<div class="foot"></div>
							</template>
						
						</v-data-table>

					<!-- </v-card-text> -->
						<v-navigation-drawer
			        v-model="drawer"
			        v-if="drawer"
			        absolute
			      >
	  				<v-container>
		        	<v-col>
		        	<v-row :justify="'space-between'">
		        	
		        	<v-col class="mt-3"><v-icon :large="true" @click.stop="drawer = !drawer">mdi-arrow-left</v-icon></v-col>
		        	<v-col class="mb-0 pt-0 mt-0"><v-switch :label="'mobile view'"></v-switch></v-col>
		        	</v-row>
		        	</v-col>
		       <!--  <v-list dense> -->
		        	<p>Query Options</p>
		  				<v-form>
		  					<v-card-subtitle class="text-left pl-0 ml-0 pb-1">last updated: {{lastUpdated || err}} 
								<v-btn :x-small="true" @click="updateOrders" color="indigo"><v-icon color="white">mdi-refresh</v-icon></v-btn>
								</v-card-subtitle>
								<v-switch v-model="queryString.assigned_to__isnull" :label="`unassigned`"></v-switch>
								<v-switch v-model="queryString.complete" v-bind:label="`complete`"></v-switch>
								<v-switch v-model="queryString.in_progress" :label="`in progress`"></v-switch>
								<v-select 
									v-model="dateTime.day" 
									:label="dateTime.day" 
									solo
									:hint="'pick a day'"
									persistent-hint
									:items="['Today', 'Yesterday']"></v-select>
								<v-time-picker :full-width="true" v-model="dateTime.time"></v-time-picker>
		  				</v-form>
		        <!-- </v-list> -->
		      	</v-container>
		      </v-navigation-drawer>
				</v-card>
			</v-col>
			{{parentData}}
		</v-container>
	</v-container>
</template>


<script>
export default {
	data() {
		return {
			search: '',
			drawer: false,
			dateTime: {
				day: "today",
				time: null
			},
			queryString: {
				assigned_to__isnull: true,
				complete: false,
				in_progress: false					
			},
			headers: [
				{text: 'store', value: 'store.name'},
				{text: 'address', value: 'address'},
				{text: 'deliver by', value: 'deliver_by'},
				{text: 'fee', value: 'delivery_fee'},
				{text: 'tip', value: 'tip'},
				{text: 'actions', value: 'actions'}
			]
		}
	},

	computed: {
		orderData() {
			return this.$store.getters['orders/orderData']
		},

		lastUpdated() {
			return this.$store.state.orders.dashboardOrders.lastUpdated
		},

		err() {
			return this.$store.state.orders.dashboardOrders.err
		},

		loading() {
			return this.$store.state.orders.dashboardOrders.loading
		},

		getPermissions() {
			return this.$store.state.getters['auth/getPermissions']
		}
	},

	methods: {

		genQueryString() {
			let date = new Date();
			if (this.dateTime.day == "Yesterday") {
				date.setUTCDate(date.getDate()-1)
				date.toUTCString()
			}
			console.log(date, this.dateTime.day)
			if (this.dateTime.time != null) {
				let time = this.dateTime.time.split(':')
				date.setHours(parseInt(time[0]))
				date.setMinutes(parseInt(time[1]))
			} else {
				date.setHours(date.getHours()-6)
			}
			console.log(date)
			this.queryString['time'] = date
			return this.queryString
		},

		updateOrders() {
			let node = this.$store.getters['auth/selectedNodeOrDefault']
			console.log(node, 'this is node')
			this.$store.dispatch('orders/getOrders', {id: node.id, 
																								queryString: this.genQueryString(),
																							  type: 'dashboardOrders'})
		},

		editItem(item) {
			console.log(item, 'is item')
			this.$emit('change-view', ['viewOrder', item])
		}


	},

	mounted() {
		let node = this.$store.getters['auth/selectedNodeOrDefault']
		console.log(node != null, this.orderData.length)
		if (node != null && this.orderData.length == 0) {
			this.$store.dispatch('orders/getOrders', {id: node.id, 
																								queryString: this.genQueryString(),
																								type: 'dashboardOrders'})
		}
	},

	props: {
		parentData: null
	}
}
</script>


<style>

</style>