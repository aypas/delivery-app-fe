<template>

	<v-container fluid>
		<v-row :justify="'space-around'" align="center" v-if="!loadingGet">
			<v-col 
				lg="5" 
				sm="12"
				xs="12"
				md="5">
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
										<td>Status</td>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(partner,i) in partners" v-bind:key="i" v-bind:class="[i==selectedIndex ? 'active' : 'inactive']">
										<td>{{partner.name}}</td>
										<td><v-btn class="white--text" :x-small="true" :color="'indigo'" @click="view(partner, i)">View</v-btn></td>
										<td>
											<v-btn
												v-if="partner.active"
												:x-small="true"
												class="white--text"
												:color="'red darken-2'"
												@click="deletePartner(i, false)"
											>Make Inactive</v-btn>
											<v-btn
												v-else
												class="white--text"
												:x-small="true"
												:color="'indigo'"
												@click="deletePartner(i, true)"
												> Make Active</v-btn>
										</td>
									</tr>
								</tbody>
						</template>
					</v-simple-table>
				</v-card>
			</v-col>

			<v-col
			lg="5"
			md="5"
			xs="12"
			sm="12"
			>
				<v-card :height="500">
					<v-container>
						<v-row 
							:justify="'center'" 
							class="pr-2 pb-3">
							<v-row :justify="'center'">
							<h2 class="indigo--text">
								<p v-if="render=='new'">New Partner</p><p v-else>Update Partner</p>
							</h2>
							</v-row>
							<v-row :justify="'center'" v-show="partners.length!=0">
							<v-btn 
								class="white--text"
								:color="'indigo'" 
								@click="view({}, partners.length )">
							+ Add Partner</v-btn>
						</v-row>
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
								<v-btn v-if="render=='new'" class="white--text" :color="'indigo'" @click="postPartner">Add</v-btn>
								<v-row :justify="'space-around'" v-else>
									
									
									<v-col>
										Status: {{partner.active ? "active" : "inactive"}}
									</v-col>

									<v-col>
									<v-btn
										class="white--text" 
										:color="'indigo'" 
										@click="updatePartner">Update</v-btn>
									</v-col>

								</v-row>
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
			selectedIndex: 0,
			string: "Enter as a list of names seperated by three dashes; eg. name-1---name-2",
			err: null,
			render: 'new',
			loading: true,
		}
	},

	computed: {
		partners() {
			return this.$store.state.partners.partners;
		},

		// partners() {
		// 	return this.$store.getters['partners/getPartners']
		// }

		loadingGet() {
			return this.$store.state.partners.loadingGet;
		}
	},

	methods: {
		view(partner, i) {
			this.partner = Object.assign({}, partner)
			this.selectedIndex = i
			if (i == this.partners.length) {
				this.render = 'new'
			} else {
				this.render = 'update'
			}
		},

		parseOtherNames(string) {
			if (typeof string != "object") {
				return string.split("---")
			}
		},

		updatePartner() {
			if (this.partner['name'].length == 0 || this.partner["street_address"].length == 0) {
				this.err = "name and address are required"
				return null
			} 
			let list;
			if (this.partner['other_names']) {
				list = this.parseOtherNames(this.partner['other_names'])
			} else { 
				list = []
			}
			let data = Object.assign({}, {name: this.partner.name, 
																		street_address: this.partner.street_address, 
																		other_names: list,
																		id: this.partner.id})
			this.$store.dispatch('partners/putPartner', {payload: data, index: this.selectedIndex});
		},

		postPartner() {
			console.log(this.partner['name'], this.partner['street_address'], 'cheek')
			if (this.partner['name'] == undefined || this.partner["street_address"] == undefined) {
				this.err = "name and address are required"
				return null
			} 
			console.log(typeof this.partner['other_names'])
			let list;
			if (this.partner['other_names']) {
				list = this.parseOtherNames(this.partner['other_names'])
			} else { 
				list = []
			}
			let data = Object.assign({}, {name: this.partner.name, street_address: this.partner.street_address, other_names: list})
			this.$store.dispatch("partners/postPartner", {payload: data, id: this.$store.getters['auth/selectedNodeOrDefault'].id})
				.then(() => { this.render="update" })
		},

		deletePartner(index, action) {
			this.$store.dispatch("partners/deletePartner", {id: this.partners[index].id, index, action})
		}
	},

	watch: {
		'partner.other_names'() {
			let string = "";
			if (this.partner.other_names != null && typeof this.partner.other_names == "object") {
				for (let i = 0; i < this.partner.other_names.length; i++) {
					if (i == 0) {
						string = this.partner.other_names[i]
					} else {
						string = string+"---"+this.partner.other_names[i]
					}
				}
				this.partner.other_names = string
			}
		}
	},

	beforeMount() {
		if (this.$store.getters['auth/selectedNodeOrDefault']) {
			this.$store.dispatch('partners/getPartners', this.$store.getters['auth/selectedNodeOrDefault'].id)
				.then(() => { this.loading=false; });
		}
	}
}
</script>