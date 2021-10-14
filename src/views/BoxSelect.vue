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
            v-bind:disabled="invalid_bid(level, strain)"
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
            v-bind:disabled="this.cannot_rdbl"
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
            v-bind:disabled="this.cannot_dbl"
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
      windowSize: {x: 0, y: 0},
    }
  },
  computed: {
    last_bid_no: function(){
      return 20  // dummy value
    },
    cannot_dbl: function(){
      return false  // dummy value
    },
    cannot_rdbl: function(){
      return true  // dummy value
    }
  },
  methods: {
    clicked(event){
      console.log(event.currentTarget.id)
    },
    onResize(){
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },
    bid_to_num(level, strain){
      // 1C = 1, 7N = 35
      var level_num = level.toString()
      var strain_num = Object.keys(this.strains).indexOf(strain)
      return level_num * 5 - strain_num
    },
    invalid_bid(level, strain){
      if(this.bid_to_num(level, strain) < this.last_bid_no){
        return true
      } else {
        return false
      }
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

button[disabled="disabled"] span {
  color: lightgrey;
}

.call-choice {padding: 0px !important;}

.call-choice span{
  font-size: x-large; 
  font-weight: bold;
}

</style>