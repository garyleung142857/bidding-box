<template>

  <v-container id="biddingtable">
    <v-row no-gutters justify="center">
      <v-col
        cols=3
        v-for="(pname, key) in this.player_names"
        v-bind:key="key"
      >
        <v-card
          v-bind:class="'d-flex align-center justify-center ma-1 player-' + is_vul(key)"
        >
          <div>{{pname}}</div>
        </v-card>
      </v-col>
    </v-row>
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
        <Call v-bind:biddingCall="call"></Call>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import Call from '@/components/Call.vue'

export default {
  name: 'BiddingTable',
  components: {
    Call
  },
  props: {
    history: Array,
    boardNum: Number,
    curPlayer: String,
    ended: Boolean,
  },
  data(){
    return {
      PLAYERS: ['W', 'N', 'E', 'S'],
      player_names: {'W': 'West', 'N': 'North', 'E': 'East', 'S': 'South'},
    }
  },
  computed: {
    dlr_pos(){
      return this.player_pos(this.dealer)
    },
    hist_2d: function(){
      var hist = [...this.history]
      if (!this.ended){
        hist.push('A')  // A = pending
      }
      var hist_2 = []
      for (let i = 0; i < this.dlr_pos; i++){hist.splice(0, 0, 'B')}  // West will be the first B = buffer
      while (hist.length % 4 > 0){hist.push('E')}  // multiple of 4. E = blank      
      for (let j = 0; j < hist.length; j = j + 4){
        hist_2.push(hist.slice(j, j + 4))
      }
      return hist_2
    },
    dealer: function(){
      return (this.PLAYERS[this.boardNum % 4])
    },
    vulerability: function(){
      var ns = [2, 4, 5, 7, 10, 12, 13, 15]
      var ew = [3, 4, 6, 7, 9, 10, 13, 16]
      return {
        'EW': ew.includes(this.boardNum),
        'NS': ns.includes(this.boardNum)
      }
    }
  },
  methods: {
    player_pos: function(player){
      return this.PLAYERS.indexOf(player)
    },
    is_vul(player){
      var vul = false
      if (['E', 'W'].includes(player)){
        vul = this.vulerability['EW']
      } else {
        vul = this.vulerability['NS']
      }
      if (vul){
        return 'v'
      } else {
        return 'nv'
      }
    }
  },
}
</script>