<template>
	<v-container>
		<component
			v-if="showComponent=='nodeInfo'" 
			v-on:change-view="handleEvent($event)" 
			v-bind:is="'NodeInformation'">			
		</component>

		<component
			v-if="showComponent=='users'"
			v-on:change-view="handleEvent($event)"
			v-bind:is="'UsersOfNode'"
			:users="{managers: nodeData['managers'], owners: nodeData['co_owners'], workers: nodeData['workers']}"
			:node-owner-id="nodeData.owner.id"
			:node-id="nodeData.id"
			>
		</component>
	</v-container>
</template>

<script>
import NodeInformation from "@/components/NodeInformation";
import UsersOfNode from "@/components/UsersOfNode";
export default {
	data() {
		return {
			showComponent: 'nodeInfo',
			userClass: null
		}
	},

	computed: {
		nodeData() {
			return this.$store.state.node.nodeData;
		}
	},

	methods: {
		handleEvent(event) {
			console.log('listener says', event)
			this.showComponent = event.showComponent;
		}
	},

	beforeCreate() {
		let id = this.$store.getters['auth/selectedNodeOrDefault'];
		console.log(id, 'yes this is it')
		if (id != null) {
			this.$store.dispatch('node/getNode', id.id);
		}
	},

	components: {
		NodeInformation,
		UsersOfNode
	}
}
</script>