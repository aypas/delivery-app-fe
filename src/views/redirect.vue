<template>
	<div>><v-progress-circular indeterminate :size="150" color="indigo"></v-progress-circular></div>
</template>

<script>
export default {
  beforeCreate() {
  	this.$store.dispatch('auth/getAccess', {queryString:window.location.search,
  																					nodeId: this.$store.getters['auth/selectedNodeOrDefault'].id})
  }
}
</script>