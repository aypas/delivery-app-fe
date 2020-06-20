<template>
	<div></div>
</template>

<script>
export default {
  beforeCreate() {
  	this.$store.dispatch('auth/getAccess', {path:window.location.search,})
  }
}
</script>