<template>
	<div v-if="nodes.length > 1" class="nContainer">
		<div id="child">
			<v-select
			:items="nodes"
			:item-text="nodeName" 
			:label="selectedNode.name"
			:light=true
			return-object 
			solo
			@input="changeMainNode">
			
			
			</v-select>
		</div>
	</div>
</template>

<script>
export default {

	computed: {
		nodes(){
			return this.$store.getters['auth/getNodes']
		},

		selectedNode() {
			let t = this.$store.getters['auth/selectedNodeOrDefault']
			console.log(t.name, 'no pls no')
			return t
		}
	},

	methods: {
		changeMainNode(obj){
			console.log(obj)
			this.$store.commit('auth/setMainNode', obj)
		},

		nodeName(item) {
			return item.name
		}
	}
}
</script>


<style scoped>
div.nContainer{
	padding-top: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
}

div#child {
	width: 200px;
}

.theme--light.v-application{
  background-color: #432032;
  color: blue;
}

.theme--light.v-list{
  background: white;

  color: blue;
}
.v-list-item__content{
  color: #3F51B5;
}
.theme--light.v-list-item:hover:before {
    opacity: 0.14;
    color: #3F51B5;
}

.v-input__slot{
  color: #3F51B5 !important;
}



</style>