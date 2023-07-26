<template>
  <v-card
    class="biddingtable"
    :height="sideLength"
    :width="sideLength"
    flat
    color="transparent"
  >
    <PlayerTray
      player="N"
      :playerHist="historyByPlayers[1]"
      :isCurrent="is_current('N')">
    </PlayerTray>
    <PlayerTray
      player="E"
      :playerHist="historyByPlayers[2]"
      :isCurrent="is_current('E')">
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
        <div class="board-num">{{boardNum}}</div>
      </v-card>
    </span>
    <PlayerTray
      player="W"
      :playerHist="historyByPlayers[0]"
      :isCurrent="is_current('W')">
    </PlayerTray>
    <PlayerTray
      player="S"
      :playerHist="historyByPlayers[3]"
      :isCurrent="is_current('S')">
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
  data(){
    return {
      PLAYERS: ['W', 'N', 'E', 'S'],
      player_names: {'W': 'West', 'N': 'North', 'E': 'East', 'S': 'South'},
    }
  },
  computed: {
    ...mapGetters('sizing', ['sideLength']),
    ...mapGetters('history', ['dealer', 'boardNum', 'vulerability', 'curPlayer', 'historyByPlayers', 'contract']),
  },
  methods: {
    player_title(player){
      if(player === this.dealer){
        return 'Dlr'
      }
      return player
    },
    is_vul(player){
      var vul = ['E', 'W'].includes(player) ? this.vulerability['EW'] : this.vulerability['NS']
      return vul ? 'v' : 'nv'
    },
    is_current(player){
      return this.contract.bid === undefined && this.curPlayer === player
    }
  },
}
</script>