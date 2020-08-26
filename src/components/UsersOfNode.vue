<template>
	<v-container>
		<v-row justify="start">
			{{nodeCreator}}
			<v-col cols="1">
			<v-icon
					@click="$emit('change-view', {showComponent: 'nodeInfo', selected: null})"
					v-ripple="{center: true}"
					:large="true"
					class="mt-1"
					>mdi-arrow-left</v-icon>
			</v-col>
			<v-col>
				<p class="text-h4 pb-2">Change User Permissions</p>
			</v-col>

			<v-col cols="1">
					<v-dialog v-model="dialog">
						<template v-slot:activator="{ on, attrs}">
							<v-btn 
								color="indigo" 
								class="white--text"
								v-bind="attrs"
								v-on="on"
								>
								<v-icon>mdi-information-outline</v-icon>
							</v-btn>
						</template>
						<v-card>
							<v-card-title>Permissions</v-card-title>
							<v-card-text>
								<p>Permissions determine what your users can see and do.</p>
								<p>For example, a member of your team with minimum permissions(worker only)
								will only be able to see orders that have been assigned to them.</p>
								<p>Managers will be able to see all orders, assign orders to workers(including themselves), and also correct potential errors that the scraper has made.</p> 
								<p>Users with owner permissions will be able to do everything workers and managers can do,
								but will also be able add/change partners, change node information and user permissions.</p>

								<p>Keep in mind though, only the creator of the node can remove other owners.</p>
							</v-card-text>
						</v-card>
					</v-dialog>
			</v-col>
		</v-row>
		<v-card>
		<v-data-table
			:headers="userHeaders"
			:items="usersByPermissions"
			:item-key="usersByPermissions.id"
			>
			<template v-slot:item.owner=" {item} ">
				{{item.owner}}	
				<v-btn
					v-if="nodeCreator"
					@click="item.owner ? deletePerm(item.id, 'owner') : putPerm(item.id, 'owner')"
					color="indigo"
					class="white--text"
					:x-small="true"
				>
				<v-icon v-if="item.owner">mdi-minus</v-icon>
				<v-icon v-else>mdi-plus</v-icon>
				</v-btn>
							
			</template>

			<template v-slot:item.manager=" {item} ">
				{{item.manager}}
				<v-btn
					v-if="userPermissions.owner"
					color="indigo"
					class="white--text"
					:x-small="true"
				>
				<v-icon v-if="item.manager">mdi-minus</v-icon>
				<v-icon v-else>mdi-plus</v-icon>
				</v-btn>
								
			</template>

			<template v-slot:item.worker=" {item} ">
				{{item.worker}}
				<v-btn
					v-if="userPermissions.owner"
					color="indigo"
					class="white--text"
					:x-small="true"
				>
				<v-icon v-if="item.worker">mdi-minus</v-icon>
				<v-icon v-else>mdi-plus</v-icon>
				</v-btn>
			</template>
			
		</v-data-table>
		</v-card>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			dialog: false,
			userHeaders: [{text: 'name', value: 'name'},
										{text: 'email', value: 'email'},
										{text: 'owner permissions', value: 'owner'},
										{text: 'manager permissions', value: 'manager'},
										{text: 'worker permissions', value: 'worker'}]
		}
	},

	computed: {
		usersByPermissions() {
			let ret = [];
			let workers = this.users.workers;
			let managers = this.users.managers;
			let owners = this.users.owners;
			for (let i=0; i<workers.length; i++) {
				let inOwner = owners.find((el) => {
					return el.id == workers[i].id;
				})
				if (inOwner != undefined) {
					ret.push({...workers[i], owner: true, manager: true, worker: true});
					continue
				} 
				let inManager = managers.find((el) => {
					return el.id == workers[i].id;
				})
				if (inManager != undefined && inOwner == undefined) {
					ret.push({...workers[i], owner: false, manager: true, worker: true});
				} else {
					ret.push({...workers[i], owner: false, manager: false, worker: true});
				}
			}
			return ret;
		},

		userPermissions() {
			return this.$store.getters['auth/getPermissions'];
		},

		nodeCreator() {
			return this.$store.state.auth.authUser.id == this.nodeOwnerId;
		}
	},

	methods: {
		putPerm(user, perm) {
			this.$store.dispatch('node/putPerms', {ids: {node: this.nodeId, user: user}, perm})
		},

		deletePerm() {
			console.log(this.nodeId)
		}
	},

	props: {
		users: Object, //changed this type check late friday while drunk, make sure it works
		nodeOwnerId: Number,
		nodeId: Number
	}
}

</script>