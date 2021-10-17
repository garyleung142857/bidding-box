<template>
  <div>
    <BiddingTable
      :history="this.history"
      :boardNum="this.boardNum"
      :curPlayer="this.curPlayer"
      :ended="this.contract.bid != null"
    ></BiddingTable>
    <v-footer fixed padless id="control-footer">
      <v-row justify="center" no-gutters>
        <v-col cols=3>
          <v-btn block id="undo-button" class="d-flex align-center justify-center" @click="undo()">
            <v-icon>mdi-arrow-u-left-top</v-icon>
          </v-btn>
        </v-col>
        <v-col col=6 v-if="contract.bid == null">
          <v-dialog v-model="dialog" width="90vw">
            <template v-slot:activator="{on, attrs}">
              <v-btn block id="call-button" class="d-flex align-center justify-center" v-bind="attrs" v-on="on">
                <v-icon>mdi-arrow-up-box</v-icon>
              </v-btn>
            </template>
            <v-card elevation=0>
              <BoxSelect
                @selectCall="addHistory($event); dialog=false"
                :biddingState="biddingState"
              ></BoxSelect>
            </v-card>
          </v-dialog>
        </v-col>
        <v-col col=6 v-else>
          <div id="contract" class="d-flex align-center justify-center">
           <Contract :contract="contract" :vul="is_vul(contract.declarer)"></Contract>
          </div>
        </v-col>
        <v-col cols=3>
          <v-btn block id="advance-button" class="d-flex align-center justify-center" @click="advanceBoard()">
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
      history: ['P', '1C', 'X', '1D', '1H', '1S', '1N', 'P'],
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

  #app, #control-footer {
    background-color: #f5e9d9;
  }

  #biddingtable {
    overflow-y: auto;
    max-height: 90vh;
  }

  #undo-button {background-color: #f88080;}
  #call-button {background-color: #9ba8eb}
  #advance-button {background-color: #a3e684;}

  #undo-button, #call-button, #advance-button, #contract{height: 10vh}

  #contract, .player-nv, .player-v, .call-choice span, .table-label {
    font-weight: bold;
  }

  #boxselect {background-color: #fcffee;}

  .label-N span, .label-N {color: #302f46;}
  .label-S span, .label-S {color: #2f3b80;}
  .label-H span, .label-H {color: #af3535;}
  .label-D span, .label-D {color: #dd9b44;}
  .label-C span, .label-C {color: #5d8b47;}

  .label-P, .label-X, .label-R, .label-P span, .label-X span, .label-R span {color: #4a495e}

  .table-label.label-P {background-color: #ccf7b9 !important;}
  .table-label.label-X {background-color: #fac2c2 !important;}
  .table-label.label-R {background-color: #c7cefc !important;}

  #control-footer .v-icon{color: #4a495e !important;}

  #call-P {background-color: #5d8b47;}
  #call-X {background-color: #af3535;}
  #call-R {background-color: #2f3b80;}

  #call-P span, #call-X span, #call-R span {color: #f5f5f5}

  button[disabled="disabled"] span {color: #f5f5f5;}

  .bid-choice .normal-label #contract {background-color: #f5f5f5 !important;}

  .label-A {border: #4a495e 3px solid !important;}
  .label-A, .label-B, .label-E {
    background-color: #f5e9d9 !important;
    box-shadow: none !important;
  }

  .player-v {
    background-color: #f37272 !important;
    color: #fcffee !important;
  }

  .player-nv {
    background-color: #fafad2 !important;
    color: #4a495e !important;
  }

  .call-choice {padding: 0px !important;}

  #contract, .call-choice span, .table-label{font-size: x-large;}

</style>