<template>

    <v-card
      class="box-bids" :id="this.cur_player"
      :height="sideLength * 0.9"
      :width="sideLength * 0.9"
      flat
    >
      <div style="vertical-align: middle">
        <v-row v-for="level in levels" :key="level" no-gutters>
          <v-col
            v-for="(icon, strain) in strains" :key="strain"
            align-center row wrap no-gutters
          >
            <v-btn
              class="call-choice bid-choice"
              block :ripple="false"
              :height="bidHeight"
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
              block 
              :height="pxrHeight"
              :ripple="false"
              :id="'call-R'"
              @click="clicked($event)"
              :disabled="this.cannot_rdbl"
            >
              <span class="label-X">XX</span>
            </v-btn>
          </v-col>
          <v-col cols=6>
            <v-btn
              class="call-choice"
              block
              :height="pxrHeight"
              :ripple="false"
              :id="'call-P'"
              @click="clicked($event)"
            >
              <span class="label-P">Pass</span>
            </v-btn>
          </v-col>
          <v-col cols=3>
            <v-btn
              class="call-choice"
              block 
              :height="pxrHeight" 
              :ripple="false"
              :id="'call-X'"
              @click="clicked($event)"
              :disabled="this.cannot_dbl"
            >
              <span class="label-X">X</span>
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card>

</template>

<script>
export default {
  name: 'BoxSelect',
  props: {
    biddingState: Array,  // [curplayer, string, lastBid: str, canDbl: bool, canRdbl: bool]
    sideLength: Number,
  },
  data(){
    return {
      levels: ['1', '2', '3', '4', '5', '6', '7'],
      strains: {'N': 'N', 'S': '&#9828;', 'H': '&#9825;', 'D': '&#9826;', 'C': '&#9831;'},
      
    }
  },
  computed: {
    last_bid: function(){
      return this.biddingState[1]
    },
    cannot_dbl: function(){
      return !(this.biddingState[2])
    },
    cannot_rdbl: function(){
      return !(this.biddingState[3])
    },
    cur_player: function(){
      return this.biddingState[0]
    },
    bidHeight: function(){
      return 0.11 * this.sideLength
    },
    pxrHeight: function(){
      return 0.9 * this.sideLength - 7 * this.bidHeight
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