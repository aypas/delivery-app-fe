<template>
	<v-container fluid>
	<v-container fluid v-if="nodeData!=null">
	<v-form >
		<p>Node Information</p>
			<v-container>
				<v-row :justify="'space-around'">

				<v-col cols="4">
					<v-row>
					<v-text-field
					v-model="nodeData.name"
					:label="'Business Name'"
					:readonly="!permissions[0]"
					>
					</v-text-field>
					</v-row>
				</v-col>

				<v-col cols="4">
					<v-row>
					<v-text-field
					v-model="nodeData.address"
					:label="'Address'"
					:readonly="!permissions[0]"
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
					:readonly="!permissions[0]"
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

				<v-row v-if="permissions[0]" :justify="'space-around'">
					<v-col cols="1">
						<v-row><v-btn :color="'indigo'" class="white--text" @click="updateNode">Update</v-btn></v-row>
					</v-col>
				</v-row>

				<v-divider></v-divider>

				<v-row :justify="'space-around'">

					<v-col cols="7">
						<p>New Node Form</p>
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
											v-if="permissions[0] && selected!='co_owners'" 
											class="text-left"
										>Action</td>
									</tr>
								</thead>
								<tbody v-if="nodeData[selected]!=null">
									<tr v-for="(v,i) in nodeData[selected]" v-bind:key="i">
										<td class="text-left">{{v.name}}</td>
										<td class="text-left">{{v.email}}</td>
										<td 
											v-if="permissions[0] && selected!='co_owners'" 
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

			</v-container>
			<v-container v-if="permissions[0]">
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

		<v-form v-if="permissions[0]">
			<v-container>
				<p>User Information</p>
				<v-row :justify="'space-around'">
					
					<v-col cols="4">
						<v-row>
							<v-text-field
								v-model="node.name"
								:label="'Name'"
							></v-text-field>
						</v-row>
					</v-col>

					<v-col cols="4">
						<v-row>
							<v-text-field
								v-model="node.email"
								:label="'Email'"
								type="email"
							>
								
							</v-text-field>
						</v-row>
					</v-col>
				</v-row>

				<v-row :justify="'space-around'">
					
					<v-col cols="4">
						<v-row>
							<v-text-field
								v-model="node.address"
								:label="'Address'"
							></v-text-field>
						</v-row>
					</v-col>

					<v-col cols="4">
						<v-row>
							<v-text-field
								v-model="node.code"
								:label="'Code'"
							>
								
							</v-text-field>
						</v-row>
					</v-col>
				</v-row>

				<v-row :justify="'space-around'">
					<v-col cols="1">
						<v-row><v-btn :color="'indigo'" class="white--text" @click="createNode">Create Node</v-btn></v-row>
					</v-col>
				</v-row>
			</v-container>

		</v-form>
		</v-container>
		<div v-else><v-progress-circular indeterminate :size="150" color="indigo"></v-progress-circular></div>
	
	</v-container>
</template>



<script>
export default {
	data() {
		return {
			node:{
				name: '',
				email:'',
				address: '',
				code: ''
			},
			hasOauth: true,
			selects: [['owners', 'co_owners'], ['managers', 'managers'], ['workers','workers']],
			selected: 'co_owners'

		}
	},

	computed: {
		nodeData() {
			return this.$store.state.node.nodeData
		},

		nodeError() {
			return this.$store.state.node.nodeError;
		},

		permissions() {
			return [this.$store.state.auth.authUser.is_node_owner, this.$store.state.auth.authUser.is_manager]
		}
	},

	methods: {
		oauth() {
			this.$store.dispatch('auth/oauth')
		},

		updateNode() {
			console.log('stop ', this.$store.state.auth.mainNode.id)
			this.$store.dispatch('node/putNode', {data:this.nodeData, id: this.$store.state.auth.mainNode.id,})
		},

		createNode() {
			this.$store.dispatch('node/postNode', {data: this.node, id: this.$store.state.auth.authUser.id})
		}
	},

	beforeCreate() {
		let id = this.$store.getters['auth/selectedNodeOrDefault']
		if (id != null) {
			this.$store.dispatch('node/getNode', id.id)
		}
	}
}
</script>




<style>
	

</style>