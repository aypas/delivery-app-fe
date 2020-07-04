<template>
	<v-container fluid>
		<v-row :justify="'space-around'" v-if="partners">
			<v-col>
				<v-card :height="500">
					<v-simple-table
						:height="500"
						fixed-header
					>
						<template v-slot:default>
							
								<thead>
									<tr>
										<td>Name</td>
										<td>View</td>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(partner,i) in partners" v-bind:key="i" v-bind:class="[i==selectedIndex ? 'active' : 'inactive']">
										<td>{{partner.name}}</td>
										<td><v-btn class="white--text" :x-small="true" :color="'indigo'" @click="view(partner, i)">View</v-btn></td>
									</tr>
								</tbody>
						</template>
					</v-simple-table>
				</v-card>
			</v-col>

			<v-col>
				<v-card :height="500">
					<v-container>
						<v-row 
							:justify="'space-between'" 
							class="pr-2 pb-3">

							<h2 class="pl-10 ml-10 indigo--text">
								<p v-if="selectedIndex == null || selectedIndex==partners.length">New Partner</p><p v-else>Update Partner</p></h2>
							<v-btn 
								class="white--text" 
								:color="'indigo'" 
								@click="view({}, partners.length )">
							+ Add Partner</v-btn>
						</v-row>
					<v-divider />
					<v-container v-if="partner != null" fluid>
						<p>{{partner.name}}</p>
						<v-form>
							<v-row><v-text-field v-model.lazy="partner.name" :label="'name'"></v-text-field></v-row>
							<v-row><v-text-field v-model.lazy="partner.street_address" :label="'address'"></v-text-field></v-row>
							<v-row>
								<v-text-field 
									v-model.lazy="partner.other_names" 
									:label="'other names'"
									:type="'text'"
									:hint="string"
									:persistent-hint="true"></v-text-field>
							</v-row>
							<v-row><p>{{err}}</p></v-row>
							
							<v-row :justify="'end'">
								<v-btn v-if="selectedIndex == partners.length" class="white--text" :color="'indigo'" @click="postPartner">Add</v-btn>
								<v-btn v-else class="white--text" :color="'indigo'" @click="updatePartner">Update</v-btn>
							</v-row>

						</v-form>
					</v-container>

				</v-container>
				</v-card>
			</v-col>
		</v-row>
		<div v-else><v-progress-circular indeterminate :size="150" color="indigo"></v-progress-circular></div>
	</v-container>
</template>


<script>
export default {
	data() {
		return {
			partner: {},
			selectedIndex: [],
			string: "Enter as a list of names seperated by commas; eg. name-1, name-2",
			err: null
		}
	},

	computed: {
		partners() {
			return this.$store.state.partners.partners;
		}
	},

	methods: {
		view(partner, i) {
			this.partner = Object.assign({}, partner)
			console.log(this.partner)
			this.selectedIndex = i
		},

		updatePartner() {
			if (this.partner['name'].length == 0 || this.partner["street_address"].length == 0) {
				this.err = "name and address are required"
				return null
			} 
			if (this.partner['other_names']) {
				console.log(this.partner['other_names'], this.partner, 'hahaha')
				this.partner['other_names'] = String(this.partner['other_names']).split(',')
			} else {
				this.partner['other_names'] = []
			}
			this.$store.dispatch('partners/putPartner', {payload: this.partner, index: this.selectedIndex});
		},

		postPartner() {
			if (this.partner['name'].length == 0 || this.partner["street_address"].length == 0) {
				this.err = "name and address are required"
				return null
			} 
			this.$store.dispatch("partners/postPartner", {payload: this.partner, index: this.SelectedIndex})
		}
	},

	beforeCreate() {
		if (this.$store.getters['auth/selectedNodeOrDefault']) {
			this.$store.dispatch('partners/getPartners', this.$store.getters['auth/selectedNodeOrDefault'].id);
		}
	}
}
</script>