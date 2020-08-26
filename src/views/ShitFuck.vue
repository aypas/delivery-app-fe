<template>
  <div class="cunt">
    <conversation/>
      <v-row>
      <v-col><v-icon>mdi-window-close</v-icon></v-col>
      <v-col><v-icon>mdi-send</v-icon></v-col>
    </v-row>
  </div>
</template>

<script>
import Conversation from "@/components/Conversation.vue"
export default {
  components: {
    Conversation
  }
}  
</script>

<style scoped>
div.cunt {
  height:100px;
  width: 100px;
}
</style>