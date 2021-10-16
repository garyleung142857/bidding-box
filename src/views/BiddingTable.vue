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
          <Call v-bind:call="call"></Call>
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
  data(){
    return {
      PLAYERS: ['W', 'N', 'E', 'S'],
      player_names: {'W': 'West', 'N': 'North', 'E': 'East', 'S': 'South'},
      dealer: 'E',
      vulerability: {'EW': true, 'NS': false},
      cur_player: null,
      history: ['P', '1S', 'X', '1N', '2C', 'P'],
    }
  },
  computed: {
    hist_2d: function(){
      var hist = this.history
      var hist_2 = []
      var dlr_pos = this.player_pos(this.dealer)
      for (let i = 0; i < dlr_pos; i++){hist.splice(0, 0, '_')}  // West will be the first
      while (hist.length % 4 > 0){hist.push('_')}  // multiple of 4      
      for (let j = 0; j < hist.length; j = j + 4){
        hist_2.push(hist.slice(j, j + 4))
      }
      return hist_2
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

<style>
  .player-v {
    background-color: lightcoral !important;
    color: white !important;
    font-weight: bold;
  }

  .player-nv {
    background-color: lightgoldenrodyellow !important;
    color: black !important;
    font-weight: bold;
  }
</style>