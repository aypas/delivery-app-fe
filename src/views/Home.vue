<template>
  <v-container>
    <v-row 
      :justify="'space-around'"
      >

      <v-col cols="12">
        <v-row>
          <p class="text-left">This site is still under construction and as a result absolutley riddled with bugs. 
              Please report any that you see to the guy who built it so that it can be fixed faster.</p>

        </v-row>
        <v-row><p>If you come across a bug that makes you unable to use the app, refresh the page until it works...</p></v-row>
        <v-row><p>Most of them will be fixed eventually.</p></v-row>
        <v-row><p>To learn about what the application is and how to use the application click <router-link :to="'about'">here</router-link></p></v-row>
      </v-col>
    </v-row>
  </v-container>
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
  },

  mounted() {
    console.log(this.$store.state.auth.isAuthenticated, 'rag')
  }
}
</script>
