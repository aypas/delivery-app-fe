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

        <div v-if="isAuthenticated">
        <router-link to="dashboard">
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





        <v-list-group
          prepend-icon="mdi-navigation"
        >

          <template v-slot:activator>
            <v-list-item-title>Quick Menu</v-list-item-title>
          </template>


          <!-- status -->
          <v-list-group
            no-action
            sub-group
            prepend-icon="mdi-check-network-outline"
            disabled
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Status</v-list-item-title>
              </v-list-item-content>
            </template>
  
            
          </v-list-group>
          <!-- status -->

          <v-list-group
            no-action
            sub-group
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Orders</v-list-item-title>
              </v-list-item-content>
            </template>
  
            <v-list-item
              v-for="(admin, i) in orders"
              :key="i"
              link
            >
              <v-list-item-title v-text="admin[0]"></v-list-item-title>
              <v-list-item-icon>
                <v-icon v-text="admin[1]"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>



          <v-list-group
            value="true"
            no-action
            sub-group
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Earnings</v-list-item-title>
              </v-list-item-content>
            </template>
  
            <v-list-item
              v-for="(admin, i) in earnings"
              :key="i"
              link
            >
              <v-list-item-title v-text="admin[0]"></v-list-item-title>
              <v-list-item-icon>
                <v-icon v-text="admin[1]"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>





          
            <!-- manager's console... -->

            <v-list-group
              no-action
              sub-group
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>Manager Actions</v-list-item-title>
                </v-list-item-content>
              </template>
    
              <v-list-item
                v-for="(item, i) in manActions"
                :key="i"
                link
                :to="item.link"
              >
                <v-list-item-title>{{item.text}}</v-list-item-title>
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>

              </v-list-item>
            </v-list-group>
          </v-list-group>


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


      <template v-slot:append>
        <div class="pa-2" v-if="isAuthenticated">
          <v-btn block color="indigo" class="white--text" @click="logout">Logout</v-btn>
        </div>
      </template>



    </v-navigation-drawer>
    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Delivery-App,</v-toolbar-title>
      <v-spacer></v-spacer>
      <div id="containernd" v-if="isAuthenticated"><node-selector/></div>
    </v-app-bar>

    <v-content>
      <v-alert
        color="red lighten-1"
        :dismissible="true"
        :prominent="true"
        v-if="serverError"
        >
        {{serverError}}
      </v-alert>
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
               <v-app>

                <keep-alive>
                  <router-view></router-view>
                </keep-alive>
              </v-app>

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
import NodeSelector from "@/components/NodeSelector.vue"
export default {
  name: 'Index',

  data: () => ({
    quickSelect: null,
    drawer: false,
    orders: [
              ['Pending', 'mdi-arrow-decision'], 
              ['Current', 'mdi-account-clock'], 
              ['Completed', 'mdi-check']
            ],
    earnings: [['Daily', 'mdi-calendar-today'], ['Custom Period', 'mdi-calendar-month-outline']],
    manActions: [{text:'Node',icon:'mdi-set-left-center', link:'/node'},
                 {text: 'Partners', icon: 'mdi-handshake', link: '/partners'}]
  }),
  
  computed: {  
    path(){
      return this.$route.path;
    },

    isAuthenticated() {
      return this.$store.state.auth.isAuthenticated;
    },

    authUser() {
      return this.$store.state.auth;
    },

    serverError() {
      return this.$store.state.errors.message
    }
  },

  methods: {
    logout() {
      this.$store.commit('auth/removeAllCreds')
    }
  },

  watch: {
    //delete this
    drawer(){
      console.log(this.$route.path)
      return null
    }
  },

  components:{
    NodeSelector
  }
};
</script>



<style>
a {
  text-decoration: none;
}

div#containernd {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  color: blue;
}
</style>