<template>
  <div class="home">
    <p>{{num}}</p>
    <p>{{j}}</p>

    <p> ist {{isAuthenticated}}</p>
    <p>ff{{authUser}}f</p>
    <button @click="add">add</button>
  </div>
</template>

<script>
export default {
  name: 'home',
  data(){
  	return {
  		msg: 'hello'
  	}
  },

  computed: {
  	num(){
  		console.log(this.$store.state.auth.num)
  		return this.$store.state.auth.num;
  	},

  	j(){
  		return this.$store.state.jwt
  	},

    isAuthenticated() {
      return this.$store.state.auth.isAuthenticated;
    },

    authUser() {
      return this.$store.state.auth.authUser;
    }
  },

  methods: {
  	add(){
  		this.$store.commit('auth/add');
  	}
  }
}
</script>
