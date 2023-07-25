<template>
  <v-card
    class="biddingtable"
    :height="this.sideLength"
    :width="this.sideLength"
    flat
    color="transparent"
  >
    <PlayerTray
      player="N"
      :playerHist="hist_by_players[1]"
      :isCurrent="this.is_current('N')">
    </PlayerTray>
    <PlayerTray
      player="E"
      :playerHist="hist_by_players[2]"
      :isCurrent="this.is_current('E')">
    </PlayerTray>
    <span>
      <v-card
        class="tablecenter"
        :height="sideLength * 0.25"
        :width="sideLength * 0.25"
        color="transparent"
        flat
      >
        <v-card 
          :class="'name-tag player-' + is_vul('N') " 
          id="tag-N"
          :width="sideLength * 0.13"
        >{{player_title('N')}}
        </v-card>
        <v-card 
          :class="'name-tag player-' + is_vul('E') " 
          id="tag-E"
          :width="sideLength * 0.13"
        >{{player_title('E')}}
        </v-card>
        <v-card 
          :class="'name-tag player-' + is_vul('S') " 
          id="tag-S"
          :width="sideLength * 0.13"
        >{{player_title('S')}}
        </v-card>
        <v-card 
          :class="'name-tag player-' + is_vul('W') " 
          id="tag-W"
          :width="sideLength * 0.13"
        >{{player_title('W')}}
        </v-card>
        <div class="board-num">{{this.boardNum}}</div>
      </v-card>
    </span>
    <PlayerTray
      player="W"
      :playerHist="hist_by_players[0]"
      :isCurrent="this.is_current('W')">
    </PlayerTray>
    <PlayerTray
      player="S"
      :playerHist="hist_by_players[3]"
      :isCurrent="this.is_current('S')">
    </PlayerTray>
  </v-card>

</template>

<script>
import { mapGetters } from 'vuex'
import PlayerTray from '@/components/PlayerTray.vue'

export default {
  name: 'BiddingTable',
  components: {
    // Call
    PlayerTray
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
    sideLength: function() {
      return this.getSideLength()
    },
    hist_by_players: function(){
      var hist = [...this.history]
      var hist_2 = [[], [], [], []]
      var i = this.boardNum % 4
      while (hist.length > 0){
        hist_2[i].push(hist.shift())
        i = (i + 1) % 4
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
    ...mapGetters('sizing', ['getSideLength']),
    player_title(player){
      if(player===this.dealer){
        return 'Dlr'
      } else {
        return player
      }
    },
    is_vul(player){
      var vul = ['E', 'W'].includes(player) ? this.vulerability['EW'] : this.vulerability['NS']
      return vul ? 'v' : 'nv'
    },
    is_current(player){
      return !this.ended && this.curPlayer===player
    }
  },
}
</script>