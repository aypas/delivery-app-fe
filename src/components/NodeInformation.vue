<template>
	<v-container>
		{{permissions == null}}
	<v-card>
	<v-form class="pt-3" v-if="nodeData!=null && permissions != null" >
		<p>Node Information</p>
			<v-container>
				<v-row :justify="'space-around'">

				<v-col cols="4">
					<v-row>
					<v-text-field
					v-model="nodeData.name"
					:label="'Business Name'"
					:readonly="!permissions.owner"
					>
					</v-text-field>
					</v-row>
				</v-col>

				<v-col cols="4">
					<v-row>
					<v-text-field
					v-model="nodeData.address"
					:label="'Address'"
					:readonly="!permissions.owner"
					>
					</v-text-field>
					</v-row>
				</v-col>

			</v-row>

			<v-row :justify="'space-around'">
				<v-col cols="4">
					<v-row>
					<v-text-field
					v-model="nodeData.code"
					:label="'Verification Code'"
					:readonly="!permissions.owner"
					hint="Keep this a secret, share it only with people you intend to work with"
					persistent-hint
					>
					</v-text-field>
					</v-row>
				</v-col>

				<v-col cols="4">
					<v-row>
					<v-text-field
					v-model="nodeData.owner.name"
					:label="'Creator'"
					:readonly="true"
					>
					</v-text-field>
					</v-row>

				</v-col>
				</v-row>

				<v-row :justify="'space-around'">
					<v-col cols="8">
						<v-row>
							<v-text-field
								v-model="nodeData.email"
								:label="'email'"
								:hint="'This is the gmail account from which you forward to your application gmail account.'"
								:persistent-hint="true"
							>
								
								<template v-slot:message>
									<p>this is the gmail account from which you forward to your application gmail.
										<router-link :to="'/about/#gmail'">Click here to learn more</router-link></p>
								</template>
							</v-text-field>
						</v-row>
					</v-col>


				</v-row>

				<v-row v-if="permissions.owner" :justify="'space-around'">
					<v-col cols="1">
						<v-row><v-btn :color="'indigo'" class="white--text" @click="updateNode">Update</v-btn></v-row>
					</v-col>
				</v-row>

				<v-divider></v-divider>

				<v-col>
					<v-row justify="end">
						<v-col cols="4"><p>Users of Your Business</p></v-col>
						<v-col cols="4">
							<v-btn @click="emitEvent"><v-icon>mdi-account-edit</v-icon>edit</v-btn>
						</v-col>
					</v-row>
					<v-row justify="center">
					<v-col cols="9">
						
						<v-container>
							<v-select 
								:items="selects" 
								:item-text="(item)=>{return item[0]}" 
								:item-value="(item)=>{return item[1]}"
								v-model="selected" 
								:label="'Select a class of users'">
								
							</v-select>
						<v-card>
						<v-simple-table
							:fixed-header="true"
						>
							<template v-slot:default>
								
								<thead>
									<tr>
										<td class="text-left">Name</td>
										<td class="text-left">Email</td>
										<td 
											v-if="permissions.owner && selected!='co_owners'" 
											class="text-left"
										>Action</td>
									</tr>
								</thead>
								<tbody v-if="nodeData[selected]!=null">
									<tr v-for="(v,i) in nodeData[selected]" v-bind:key="i">
										<td class="text-left">{{v.name}}</td>
										<td class="text-left">{{v.email}}</td>
										<td 
											v-if="permissions.owner && selected!='co_owners'" 
											class="text-left"
										>
											<v-btn :x-small="true" :color="'red'" class="indigo white--text">Remove</v-btn>
										</td>
									</tr>
								</tbody>
								<tbody v-else>
									<tr><td class="text-right">no data</td></tr>
								</tbody>
							</template>
						</v-simple-table>
						</v-card>
						</v-container>
					</v-col>
					</v-row>
				</v-col>

			</v-container>
			<v-container v-if="permissions.manager">
				<v-divider></v-divider>
				<div class="mt-5">
				<v-btn
				v-if="!nodeData.oauth" 
				class="indigo white--text" 
				@click="oauth">
					Conect Your Gmail Account With Our Service
				</v-btn>
				<p v-else>
					Your email account is connected with our service
				</p>
				<v-divider class="pt-5 mt-6"></v-divider>
				</div>
			</v-container>
		
	</v-form>
	</v-card>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			selects: [['owners', 'co_owners'], ['managers', 'managers'], ['workers','workers']],
			selected: 'co_owners'
		}
	},

	computed: {
		nodeData() {
			return JSON.parse(JSON.stringify(this.$store.state.node.nodeData));
		},

		permissions() {
			console.log(this.$store.getters['auth/getPermissions'])
			return this.$store.getters['auth/getPermissions']
		}
	},

	methods: {
		emitEvent() {
			console.log(this.selected)
			this.$emit('change-view', {selected: this.selected, showComponent: 'users'})
		},

		oauth() {
			console.log(this.$store.getters['auth/selectedNodeOrDefault'].id)
			this.$store.dispatch('auth/oauth', {nodeId: this.$store.getters['auth/selectedNodeOrDefault'].id});
		},

		updateNode() {
			this.$store.dispatch('node/putNode', {data:this.nodeData, id: this.$store.state.auth.mainNode.id,});
		}
	}
}
</script>