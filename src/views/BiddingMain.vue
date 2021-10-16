<template>
  <div>
    <BiddingTable
      :history="this.history"
      :boardNum="this.boardNum"
      :curPlayer="this.curPlayer"
    ></BiddingTable>
    <v-footer fixed>
      <v-row justify="center" no-gutters>
        <v-col cols=3>
          <v-btn block color="warning">Undo</v-btn>
        </v-col>
        <v-col col=6>
          <v-dialog v-model="dialog" width="90vw">
            <template v-slot:activator="{on, attrs}">
              <v-btn block color="primary" v-bind="attrs" v-on="on">
                Box
              </v-btn>
            </template>
            <v-card>
              <BoxSelect
                @selectCall="addHistory($event); dialog=false"
                :biddingState="biddingState"
              ></BoxSelect>
            </v-card>
          </v-dialog>
        </v-col>
        <v-col cols=3>
          <v-btn block @click="advanceBoard()">asd</v-btn>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
import BiddingTable from '@/views/BiddingTable.vue'
import BoxSelect from '@/views/BoxSelect.vue'

export default {
  name: 'BiddingMain',
  components: {
    BiddingTable, BoxSelect
  },
  data(){
    return {
      PLAYERS: ['W', 'N', 'E', 'S'],
      history: ['P', '1S', 'X', '1N', '2C', 'P'],
      boardNum: 9,
      dialog: false
    }
  },
  computed: {
    curPlayer: function(){
      return this.PLAYERS[(this.boardNum + this.history.length) % 4]
    },
    biddingState: function(){
      var lastBid = 'P'
      var lastBidPos = -1
      var rdblPos = -1
      var dblPos = -1
      var i = this.history.length
      while (i-- && lastBidPos < 0){
        var curCall = this.history[i]
        if (curCall !== 'P'){
          if (curCall === 'R'){rdblPos = i}
          else if (curCall === 'X'){dblPos = i}
          else {
            lastBid = curCall
            lastBidPos = i
          }
        }
      }
      var canDbl = (dblPos < 0 && rdblPos < 0 && (this.history.length - lastBidPos) % 2 === 1)
      var canRdbl = (rdblPos < 0 && dblPos >= 0 && (this.history.length - dblPos) % 2 === 1)
      console.log([lastBid, canDbl, canRdbl])
      return [lastBid, canDbl, canRdbl]
    }
  },
  methods: {
    addHistory: function(call){
      this.history.push(call)
    },
    advanceBoard: function(){
      if(this.boardNum === 16){
        this.boardNum = 1
      } else {
        this.boardNum += 1
      }
    },
  }
}
</script>