<template>
  <div>
    <BiddingTable
      :history="this.history"
      :boardNum="this.boardNum"
      :curPlayer="this.curPlayer"
      :ended="this.contract.bid != null"
    ></BiddingTable>
    <v-footer fixed padless>
      <v-row justify="center" no-gutters>
        <v-col cols=3>
          <v-btn block color="warning" class="d-flex align-center justify-center ma-1" @click="undo()">
            <v-icon>mdi-arrow-u-left-top</v-icon>
          </v-btn>
        </v-col>
        <v-col col=6 v-if="contract.bid == null">
          <v-dialog v-model="dialog" width="90vw">
            <template v-slot:activator="{on, attrs}">
              <v-btn class="d-flex align-center justify-center ma-1" block color="primary" v-bind="attrs" v-on="on">
                <v-icon>mdi-arrow-up-box</v-icon>
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
        <v-col col=6 v-else>
          <div class="d-flex align-center justify-center ma-1">
            <Contract :contract="contract" :vul="is_vul(contract.declarer)"></Contract>
          </div>
        </v-col>
        <v-col cols=3>
          <v-btn block class="d-flex align-center justify-center ma-1" @click="advanceBoard()">
            <v-icon>mdi-skip-next</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
import BiddingTable from '@/views/BiddingTable.vue'
import BoxSelect from '@/views/BoxSelect.vue'
import Contract from '@/components/Contract.vue'

export default {
  name: 'BiddingMain',
  components: {
    BiddingTable, BoxSelect, Contract
  },
  data(){
    return {
      PLAYERS: ['W', 'N', 'E', 'S'],
      history: ['P', 'P', 'P', '1C', 'P', 'P', 'X', 'P', 'P', 'R', '1D', 'P', 'P', 'X', 'P', 'P', 'R', '1H', 'P', 'P', 'X', 'P', 'P', 'R', '1S', 'P', 'P', 'X', 'P', 'P', 'R', '1N', 'P', 'P', 'X', 'P', 'P', 'R'],
      boardNum: 1,
      dialog: false
    }
  },
  computed: {
    curPlayer: function(){
      return this.PLAYERS[(this.boardNum + this.history.length) % 4]
    },
    biddingState: function(){
      var i = this.history.length
      var lastBid = ''
      var lastBidPos = -1
      var rdblPos = -1
      var dblPos = -1
      var contract = {
        bid: null,
        declarer: null,
        pxr: null
      }
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
      var canDbl = (lastBidPos >= 0 && dblPos < 0 && rdblPos < 0 && (this.history.length - lastBidPos) % 2 === 1)
      var canRdbl = (lastBidPos >= 0 && rdblPos < 0 && dblPos >= 0 && (this.history.length - dblPos) % 2 === 1)
      // detect if bidding has ended
      i = this.history.length
      if (this.history.length >= 4){
        if (this.history[i-1] === 'P' && this.history[i-2] === 'P' && this.history[i-3] === 'P' ){
          if (this.history[i-4] === 'P'){
            contract.bid = 'PO'
          } else {
            contract.bid = lastBid
            for (let j = lastBidPos % 2; j <= lastBidPos; j+=2){
              if(this.strain_of_call(this.history[j]) === this.strain_of_call(lastBid)){
                contract.declarer = this.PLAYERS[(this.boardNum + j) % 4]
                break
              }
            }
            if (rdblPos >= 0){
              contract.pxr = 'R'
            } else if (dblPos >= 0){
              contract.pxr = 'X'
            } else {
              contract.pxr = 'P'
            }
          }
        }
      }
      return [lastBid, canDbl, canRdbl, contract]
    },
    contract: function(){
      return this.biddingState[3]
    }
  },
  methods: {
    addHistory: function(call){
      this.history.push(call)
    },
    advanceBoard: function(){
      this.history = []
      if(this.boardNum === 16){
        this.boardNum = 0
      }
      this.boardNum += 1
    },
    undo: function(){
      if (this.history.length > 0){
        this.history.pop()
      }
    },
    is_vul(player){
      if (['E', 'W'].includes(player)){
        return [3, 4, 6, 7, 9, 10, 13, 16].includes(player)
      } else {
        return [2, 4, 5, 7, 10, 12, 13, 15].includes(player)
      }
    },
    strain_of_call(call){
      if(call.length === 1){
        return ''
      } else {
        return call[1]
      }
    },
  }
}
</script>

<style>
  #biddingtable{
    overflow-y: auto;
    max-height: 90vh;
  }
</style>