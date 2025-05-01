<template>
    <v-card
      class="box-bids" :id="this.curPlayer"
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
              :disabled="!canRdbl"
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
              :disabled="!canDbl"
            >
              <span class="label-X">X</span>
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'BoxSelect',
  data(){
    return {
      levels: ['1', '2', '3', '4', '5', '6', '7'],
      strains: {'N': 'N', 'S': '&spades;', 'H': '&hearts;', 'D': '&diams;', 'C': '&clubs;'},
    }
  },
  computed: {
    ...mapGetters('sizing', ['sideLength']),
    ...mapGetters('history', ['curPlayer', 'lastBid', 'canDbl', 'canRdbl', 'contract']),
    bidHeight: function(){
      return 0.11 * this.sideLength
    },
    pxrHeight: function(){
      return 0.9 * this.sideLength - 7 * this.bidHeight
    }
  },
  methods: {
    ...mapMutations('history', ['addHistory']),
    clicked(event){
      var selectedCall = event.currentTarget.id.replace('call-', '')
      this.addHistory(selectedCall)
      this.$emit('selectedCall')
    },
    invalid_bid(level, strain){
      if(this.lastBid === undefined){
        return false
      } else if(level < this.lastBid[0]){
        return true 
      } else if (level > this.lastBid[0]){
        return false
      } else {
        var k = Object.keys(this.strains)
        return k.indexOf(strain) >= k.indexOf(this.lastBid[1])
      }
    }
  },
}
</script>