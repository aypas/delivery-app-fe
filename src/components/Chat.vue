<template>
  <div class="chat-container">
    <div class="flex">
      <div :class="trailExpand ? 'c' : null">
          <v-btn
          color="primary"
          class="mb-0 pb-0t"
          @click="expand = !expand"
        >
          chat {{trailExpand}}
        </v-btn>
      </div>
        <v-expand-transition>
          <v-card
            v-show="expand"
            height="420"
            width="300"
            class="mx-auto my-0 py-0"
          >
            <v-system-bar
              color="indigo darken-2"
              dark
            >
              <v-spacer></v-spacer>
              
              <v-icon @click="comp='people'">mdi-account-group</v-icon>
        
              <v-icon @click="expand = !expand">mdi-close</v-icon>
            </v-system-bar>
            <component 
              v-bind:is="comp=='conversation' ? 'conversation' : 'people'" 
              v-on:switch="compSwitch"
              :log="comp == 'conversation' ? propsToPass : null"
              ></component>
          </v-card>
        </v-expand-transition>
    </div>
  </div>
</template>

<script>
import Conversation from "@/components/Conversation.vue"
import People from "@/components/People.vue"
export default {
  data() {
    return {
      comp: 'conversation',
      propsToPass: null,
      expand: false,
      trailExpand: false
    }
  },

  methods: {
    compSwitch(event) {
      console.log(event)
      this.comp = event.comp;
      if (this.comp == 'conversation') {
        switch (event.of) {
          case 'Error Log':
            console.log(event.of=='Error Log')
            this.propsToPass = this.$store.state.errors.log;
            break;
          case 'Request Log':
            this.propsToPass = null; //not yet here...
            console.log(event.of == 'Request Log')
            break;
          default:
            console.log('something else')
        }
      }
      console.log('event picked up')
    }
  },

  watch: {
    expand(){
      if (this.expand == false){
        setTimeout(()=>{
          this.trailExpand = !this.trailExpand;
        }, 350)
      } else {
        this.trailExpand = !this.trailExpand;
      }
    }
  },

  components: {
    Conversation,
    People
  }
}
</script>

<style>
div.chat-container {
  display: flex;
  justify-content: flex-end;
}

div.flex {
  position: fixed;
  bottom: 0;
  margin-bottom: 25px;
  margin-right: 0%;
  padding-right: 0%;
}
div.c {
  display: none;
}
</style>