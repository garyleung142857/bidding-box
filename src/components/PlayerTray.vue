<template>
  <v-sheet
    class="playertray"
    :class="{current: isCurrent}"
    :id="'playertray-' + this.player"
    :width="this.sideLength * 0.6"
    :height="this.sideLength * 0.35"
  >
    <div class="traycontent">
      <v-row
        v-for="(callrow, i) in this.hist_2d"
        v-bind:key="i"
        no-gutters justify="center"
      >
        <v-col
          cols=3
          v-for="(call, j) in callrow"
          v-bind:key="j"
        >
          <Call
            :biddingCall="call"
            :sideLength="sideLength"
          ></Call>
        </v-col>
      </v-row>
    </div>
  </v-sheet>
</template>

<script>
import Call from '@/components/Call.vue'

export default {
  name: 'PlayerTray',
  components: {
    Call
  },
  props: {
    player: String,  // N / E / S / W
    playerHist: Array,
    sideLength: Number,
    isCurrent: Boolean
  },
  data(){
    return {
      NCOL: 4
    }
  },
  computed: {
      hist_2d: function(){
      var hist = [...this.playerHist]
      var hist_2 = []
      for (let i = 0; i < this.dlr_pos; i++){hist.splice(0, 0, 'B')}  // West will be the first B = buffer
      while (hist.length % this.NCOL > 0){hist.push('E')}  // multiple of NCOL. E = blank      
      for (let j = 0; j < hist.length; j = j + this.NCOL){
        hist_2.push(hist.slice(j, j + 4))
      }
      return hist_2
    },
  }
}
</script>