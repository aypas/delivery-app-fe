<template>
  <div height="100%" width="100%" class="c-container" >
    <div class="chat-container1 c-container">
      <div v-for="(v,i) in log" :key="i">
        <div :class="v.from == 'self' ? 'self bubble' : 'other bubble'">
          <p>{{v.msg}}</p>
          <p>{{v.time}}</p>
        </div>
      </div>
    </div>

    <div class="input">
      <v-row class="my-0 py-0 px-0 mx-0">
        <v-col cols="10">
          <v-textarea 
            solo
            height="70"
            width="100%"
            v-model="msg" 
            class="pb-5 mb-5 mx-0 px-0">
            </v-textarea>
        </v-col>

        <v-col cols="1" class="mt-4 py-0" height="40px">
          <v-icon @click="clear">mdi-cancel</v-icon>
          <div class="space"></div>
          <v-icon>mdi-send</v-icon>
        </v-col>

      </v-row>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      msg: '',
    }
  },

  methods: {
    clear() {
      this.msg = '';
    },

    send() {
      if (this.msg == '') { 
        return null 
      }
      this.convo.push({txt: this.msg, from: 'self'});
      this.msg = '';
    }
  },

  props: {
    log: {type: Array}
  }
}
</script>

<style>
.c-container {
  position: relative;
  height: 100%;
  width: 100%;
  border: 1px solid black;
}

.chat-container1 {
  height: 72%;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow-y: scroll;
}

.input {
  position: absolute;
  width: 100%;
  overflow: auto;
}

.self {
  border: 1px solid #d5d5e0;
  background-color: #d5d5e0;
  margin-left: 40%;
  margin-right: 2px;
}

.other {
  border: 1px solid #4b73c9;
  background-color: #4b73c9;
  margin-right: 40%;
  margin-left: 2px;
}

.bubble {
  border-radius: 25px;
  overflow-wrap: break-word;
  margin-bottom: 5px;
  margin-top: 5px;
  padding: 3px;
}

.space {
  height: 10px;
}
</style>