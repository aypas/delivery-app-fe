<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        
        <router-link to="home">
        <v-list-item link v-bind:style= "[path=='/home' ? {'background-color': '#BFBFBF'} : {}]">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content >
            <v-list-item-title> Home </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </router-link>

        <div v-if="authUser.email && isAuthenticated">
        <router-link to="/dashboard">
        <v-list-item link v-bind:style= "[path=='/dashboard' ? {'background-color': '#BFBFBF'} : {}]">
          <v-list-item-action>
            <v-icon>mdi-desktop-mac-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </router-link>
        </div>

        <div v-if="authUser.email && isAuthenticated">
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </div>

        <div v-if="!isAuthenticated && authUser">
        <router-link to="/signin">
          <v-list-item link v-bind:style= "[path=='/signin' ? {'background-color': '#BFBFBF'} : {}]">
            <v-list-item-action>
              <v-icon>mdi-login-variant</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Sign In</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        </div>


        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Delivery-App</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="text-center">
            <v-tooltip left>
               
              
            </v-tooltip>

            <v-tooltip right>
              <template v-slot:activator="{ on }">
               
                <keep-alive>
                  <router-view></router-view>
                </keep-alive>
                <p> ist {{isAuthenticated}}</p>
                <p>ff{{authUser}}</p>
                <p>fe{{localStorage}}</p>

              </template>
              <span>Codepen</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container>
    </v-content>



    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'Index',

  data: () => ({
    drawer: false
  }),
  
  computed: {
    path(){
      return this.$route.path;
    },

    isAuthenticated() {
      console.log(this.$store.state.auth.isAuthenticated, 'wtffffff')
      return this.$store.state.auth.isAuthenticated;
    },

    authUser() {
      return this.$store.state.auth.authUser
    },

    localStorage() {
      return this.$store.state.auth.jwt===true
    }
  },

  watch: {
    drawer(){
      console.log(this.$route.path)
      return null
    }
  },
};
</script>



<style>
a {
  text-decoration: none;
}
</style>