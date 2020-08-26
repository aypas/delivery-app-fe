<template>
	<v-container fluid>
		<v-container fluid>
			<v-row :justify="'space-around'">
				<v-row>
					<v-icon
						@click="$emit('change-view', ['orders', null])"
						v-ripple="{center: true}"
						:large="true"
						>mdi-arrow-left</v-icon>

				</v-row>
				<v-row>
					{{deliverBy}}

					<p class="text-h4">Viewing order #{{parentData.order_number}} from {{parentData.source}}</p>
					{{orderIndex}}
				</v-row>
			</v-row>
		</v-container>
		<v-container>
			<v-card>
			<v-form ref="form">
			<!-- <v-row justify="center"> -->

				f{{order}}
				<v-row justify="center" class="mb-2 mt-3">Restaraunt Detail</v-row>
				<v-row justify="center">
					<v-col cols="5">
						<v-text-field :readonly="true" v-model="order.store.name" label="Restaurant Name"></v-text-field>
					</v-col>

					<v-col cols="5">
						<v-text-field :readonly="true" v-model="order.store.street_address" label="Restaurant Address"></v-text-field>
					</v-col>
				</v-row>

				<v-row justify="center" class="mt-3 mb-2">Order Detail</v-row>
				<v-row justify="center">
					<v-col cols="5">
						<v-text-field v-model="order.order_number" label="order number"></v-text-field>
					</v-col>
					<v-col cols="5">
						<v-text-field v-model="order.source" label="Source"></v-text-field>
					</v-col>
				</v-row>

				<v-row justify="center">
					<v-col cols="5">
						<v-text-field v-model="order.delivery_fee" label="Fee"></v-text-field>
					</v-col>

					<v-col cols="5">
						<v-text-field v-model="order.tip" label="Tip"></v-text-field>
					</v-col>
				</v-row>

				<v-row justify="center">
					<v-col cols="5">
						<v-text-field v-model="order.name" label="Name"></v-text-field>
					</v-col>

					<v-col cols="5">
						<v-text-field v-model="order.address" label="Address"></v-text-field>
					</v-col>
				</v-row>

				<v-row justify="center">
					<v-col cols="5">
						<v-text-field v-model="order.customer_phone" label="Phone Number"></v-text-field>
					</v-col>

					<v-col cols="5">
						<v-text-field 
							v-model="order.total_price" 
							label="Total Price"></v-text-field>
					</v-col>
				</v-row>

				<v-row justify="center">
					<v-col cols="5">
						<v-text-field 
							:readonly="true" 
							:value="parentData.entry_date.replace(/T|\s|\./, ' ').split('.')[0]" 
							label="Entry Data"></v-text-field>
					</v-col>

					<v-col cols="5">
						<!-- <v-text-field v-model="parentData.deliver_by" label="Deliver By"></v-text-field> -->
						<v-datetime-picker 
							label="Select Datetime"
							v-model="deliverBy"
							time-format="HH:mm:ss"
							>	
							<template slot="dateIcon">
								<img src='@/assets/calendar-month-outline.png'/>
							</template>
							<template slot="timeIcon">
								<img src='@/assets/clock-time-eight-outline.png'/>
							</template>
						</v-datetime-picker>
					</v-col>
				</v-row>

				<v-row justify="center" class="mb-2 mt-3">System Details</v-row>
				<v-row justify="center">
					<v-col cols="5">
						<v-text-field :readonly="true" v-model="order.assigned_to" label="Assigned To"></v-text-field>
					</v-col>

					<v-col cols="5">
						<v-text-field
							v-model.number="order.error_count"
							:type="'number'"
							label="Number of Errors Caught By Users"
							:rules="[(input) => { return input > -1 && input < 21}]"
						></v-text-field>
					</v-col>
				</v-row>

				<v-row justify="center">
					
					<v-col cols="5">
						<v-text-field
							:value="order.last_edited_by != null ? order.last_edited_by.email : 'not edited'"
							:readonly="true"
							label="Last Edited By"
						></v-text-field>
					</v-col>

					<v-col cols="5">
						<v-checkbox label="Completed" v-model="order.complete"></v-checkbox>
					</v-col>
				</v-row>

				<v-row justify="center">
					<v-col cols="5">
						<v-text-field
							v-model.number="order.result"
							label="Rate the Scraper's Work"
							:type="'number'"
							:rules="[(input) => { return input > -1 && input < 6 }]"
							:hint="'A number between 1 to 5; 0 will be interpreted as no rating'"
							min="0"
							max="5"
							:persistent-hint="true"
						>
							
						</v-text-field>
					</v-col>

					<v-col cols="5">
							<v-checkbox label="In Progress" v-model="order.in_progress"></v-checkbox>
					</v-col>
				</v-row>

				<v-row justify="center">
					<v-col>
						<v-btn @click="put" color="indigo" class="white--text">Update</v-btn>
					</v-col>
				</v-row>
				</v-form>
			</v-card>
		</v-container>
	</v-container>
</template>

<script>
import { format } from "date-fns"
export default {
	data() {
		return {
			payloadDate: null,
			order: null
		}
	},

	computed: {
		deliverBy: {
			get() {
				let r = this.order.deliver_by.split(/\./,1);
				console.log(r)
				return r.toString();
			},
			set(newValue) {
				console.log(newValue.toLocaleString(), typeof newValue)
				this.payloadDate = newValue;
				this.order.deliver_by = format(newValue, "yyyy-MM-d H:m:s.SSS");
			}
		},

		orderIndex() {
			return this.$store.state.orders.dashboardOrders.orderData.indexOf(this.parentData);
		},

		userId() {
			return this.$store.state.auth.authUser.id;
		}
	},

	methods: {
		put() {
			let {store: _store, entry_date: _entry, last_edited_by: _last, ...payload} = this.order;
			console.log(payload, 'id')
			for (let key in payload) {
				if (payload[key] == this.parentData[key] && key != 'deliver_by') {
					delete payload[key];
				}
			}
			if (this.payloadDate != null) {
				payload['deliver_by'] = this.payloadDate;
			} else {
				delete payload['deliver_by'];
			}
			console.log(this.$refs.form.validate())
			console.log(payload)
			if (Object.keys(payload).length > 0 && this.$refs.form.validate()) {
				payload['last_edited_by'] = this.userId;
				this.$store.dispatch('orders/putOrder', {payload, id: this.order.id, index: this.orderIndex});
			} else{
				console.log('you must make a change to update///')
			}
		}
	},

	props: {
		parentData: {type: Object}
	},

	beforeMount() {
		this.order = JSON.parse(JSON.stringify(this.parentData))
	}
}
</script>


<style scoped>
.f {
	color: red;
}
</style>