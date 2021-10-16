<template>
    <v-container id="boxselect">
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
            v-bind:id="'call-R'"
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
            v-bind:id="'call-P'"
            @click="clicked($event)"
          >
            <span>Pass</span>
          </v-btn>
        </v-col>
        <v-col cols=3>
          <v-btn
            class="call-choice"
            block height="10vh" outlined v-bind:ripple="false"
            v-bind:id="'call-X'"
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
  name: 'BoxSelect',
  props: {
    biddingState: Array  // [lastBid: str, canDbl: bool, canRdbl: bool]
  },
  data(){
    return {
      levels: ['1', '2', '3', '4', '5', '6', '7'],
      strains: {'N': 'N', 'S': '&#9828;', 'H': '&#9825;', 'D': '&#9826;', 'C': '&#9831;'},
    }
  },
  computed: {
    last_bid: function(){
      return this.biddingState[0]
    },
    cannot_dbl: function(){
      return !(this.biddingState[1])
    },
    cannot_rdbl: function(){
      return !(this.biddingState[2])
    }
  },
  methods: {
    clicked(event){
      var selected_call = event.currentTarget.id.replace('call-', '')
      this.$emit('selectCall', selected_call)
    },
    invalid_bid(level, strain){
      if(this.last_bid === ''){
        return false
      } else if(level < this.last_bid[0]){
        return true 
      } else if (level > this.last_bid[0]){
        return false
      } else {
        var k = Object.keys(this.strains)
        return k.indexOf(strain) >= k.indexOf(this.last_bid[1])
      }
    }
  },
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