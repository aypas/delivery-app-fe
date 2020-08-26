<template>
  <v-container fluid class="my-0 py-0">
    
    <v-list dense expand class="my-0 py-0">
      <v-row justify="space-around" class="my-0 py-0">
        <v-col cols="2">
          <v-icon 
            class="my-0 py-0" 
            @click="$emit('switch', {comp: 'conversation', of: 'last'})"
          >mdi-arrow-left</v-icon></v-col>
        <v-col cols="10">
          <p class="my-0 py-0">LOGS</p>
        </v-col>
      </v-row>
      <v-list-item-group color="primary">
      <v-list-item
        v-for="(v,i) in logs"
        :key="i"
      >
        <v-list-item-icon><v-icon>mdi-post</v-icon></v-list-item-icon>
        <v-list-item-content
          @click="$emit('switch',{comp: 'conversation', of: v})"
        >
          <v-list-item-title v-text="v"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
     </v-list-item-group>
    </v-list>
    
  </v-container>  
</template>


<script>
export default {
  data() {
    return {
      logs: ['Error Log', 'Request Log']
    }
  }
}
</script>
