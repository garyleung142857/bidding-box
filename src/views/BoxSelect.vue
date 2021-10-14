<template>
    <v-container id="boxselect" v-resize="onResize">
      <v-row v-for="level in levels" :key="level" no-gutters>
        <v-col
          
          v-for="(icon, strain) in strains" :key="strain"
          align-center row wrap no-gutters
        >
          <v-btn
            class="call-choice"
            block height="10vh" outlined v-bind:ripple="false"
            @click="clicked($event)"
            v-bind:id="'call-' + level + strain"
          >
            <span v-html="level + icon" v-bind:class="'label-' + strain"></span>
          </v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols=3>
          <v-btn
            class="call-choice"
            block height="10vh" outlined v-bind:ripple="false"
            v-bind:id="'call-rdbl'"
            @click="clicked($event)"
          >
            <span>XX</span>
          </v-btn>
        </v-col>
        <v-col cols=6>
          <v-btn
            class="call-choice"
            block height="10vh" outlined v-bind:ripple="false"
            v-bind:id="'call-pass'"
            @click="clicked($event)"
          >
            <span>Pass</span>
          </v-btn>
        </v-col>
        <v-col cols=3>
          <v-btn
            class="call-choice"
            block height="10vh" outlined v-bind:ripple="false"
            v-bind:id="'call-dbl'"
            @click="clicked($event)"
          >
            <span>X</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
export default {
  data(){
    return {
      levels: ['1', '2', '3', '4', '5', '6', '7'],
      strains: {'N': 'N', 'S': '&#9828;', 'H': '&#9825;', 'D': '&#9826;', 'C': '&#9831;'},
      windowSize: {x: 0, y: 0}
    }
  },
  methods: {
    clicked(event){
      console.log(event.currentTarget.id)
    },
    onResize(){
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    }
  },
  mounted (){
    this.onResize()
  }
}
</script>

<style scoped>

.label-N {color: black}
.label-S {color: blue;}
.label-H {color: red;}
.label-D {color: orange;}
.label-C {color: green;}


.call-choice span{
  font-size: x-large; 
  font-weight: bold;
  padding: 0px
}

.bidsvg_7{
  /* float: right; */
}
</style>