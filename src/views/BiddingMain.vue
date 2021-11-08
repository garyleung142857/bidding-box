<template>
  <div v-resize="onResize">
    <BiddingTable
      :history="this.history"
      :boardNum="this.boardNum"
      :curPlayer="this.curPlayer"
      :ended="this.contract.bid != null"
      :sideLength="this.sideLength"
    ></BiddingTable>
    <v-footer fixed padless id="control-footer">
      <v-row justify="center" no-gutters>
        <v-col cols=3>
          <v-btn block id="undo-button" class="d-flex align-center justify-center" @click="undo()">
            <v-icon>mdi-arrow-u-left-top</v-icon>
          </v-btn>
        </v-col>
        <v-col col=6 v-if="contract.bid == null">
          <v-dialog width="unset" v-model="dialog">
            <template v-slot:activator="{on, attrs}">
              <v-btn block id="call-button" class="d-flex align-center justify-center" v-bind="attrs" v-on="on">
                <v-icon>mdi-arrow-up-box</v-icon>
              </v-btn>
            </template>
            <BoxSelect
              @selectCall="addHistory($event); dialog=false"
              :biddingState="biddingState"
              :sideLength="this.sideLength"
            ></BoxSelect>
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
import BiddingTable from '@/components/BiddingTable.vue'
import BoxSelect from '@/components/BoxSelect.vue'
import Contract from '@/components/Contract.vue'

export default {
  name: 'BiddingMain',
  components: {
    BiddingTable, BoxSelect, Contract
  },
  data(){
    return {
      PLAYERS: ['W', 'N', 'E', 'S'],
      history: [],
      boardNum: 1,
      dialog: false,
      sideLength: null,
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
      return [this.curPlayer, lastBid, canDbl, canRdbl, contract]
    },
    contract: function(){
      return this.biddingState[4]
    }
  },
  methods: {
    onResize: function(){
      var len_of_largest_sq = Math.min(window.innerWidth, window.innerHeight * 0.9)
      this.sideLength = len_of_largest_sq
    },
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
  },
  mounted(){
    this.onResize()
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap');

  #app, #control-footer {
    background-color: #f5e9d9;
    font-family: 'Roboto', sans-serif;
  }

  #undo-button {background-color: #f88080;}
  #call-button {background-color: #9ba8eb}
  #advance-button {background-color: #a3e684;}

  #undo-button, #call-button, #advance-button, #contract{height: 10vh}

  #contract, .player-nv, .player-v, .call-choice span, .table-label {
    font-weight: bold;
    max-width: unset
  }

  .box-bids {background-color: #fcffee;}

  .label-N span, .label-N {color: #302f46;}
  .label-S span, .label-S {color: #2f3b80;}
  .label-H span, .label-H {color: #af3535;}
  .label-D span, .label-D {color: #dd9b44;}
  .label-C span, .label-C {color: #5d8b47;}

  .label-P, .label-X, .label-R, .label-P span, .label-X span, .label-R span {color: #4a495e}

  .table-label.label-P {background-color: #d7f8c9 !important;}
  .table-label.label-X {background-color: #fac2c2 !important;}
  .table-label.label-R {background-color: #c7cefc !important;}

  #control-footer .v-icon{color: #4a495e !important;}

  #call-P {background-color: #5d8b47;}
  #call-X {background-color: #af3535;}
  #call-R {background-color: #2f3b80;}

  #call-P span, #call-X span, #call-R span {color: #f5f5f5}

  button[disabled="disabled"] span {color: #f5f5f5;}

  .bid-choice .normal-label #contract {background-color: #f5f5f5 !important;}

  .label-B, .label-E {
    background-color: transparent !important;
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

  #biddingtable{
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: transparent;
  }

  .playertray {
    margin: 3px;
    padding: 3px;
    vertical-align: text-bottom;
    border-radius: 3px;
    overflow-y: auto;
    background-color: rgb(206, 211, 212) !important;
  }

  .tray-holder{
    overflow: auto;
  }

  .playertray.current{
    background-color: rgb(255, 254, 187) !important;
  }

  #playertray-S {
    position: absolute;
    bottom: 0;
    right: 0;
    transform: rotate(0deg);
  }

  #playertray-N {
    position: absolute;
    top: 0;
    left: 0;
    transform: rotate(180deg);
  }

  #playertray-E {
    position: absolute;
    top: 0;
    right: 0;
    transform: rotate(-90deg) translateY(-100%);
    transform-origin: top right;
  }

  #playertray-W {
    position: absolute;
    bottom: 0;
    left: 0;
    transform: rotate(90deg) translateX(-100%) ;
    transform-origin: bottom left;
  }

  .table-label{
    transform: rotate(180deg);
  }

  .tablecenter{
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  .name-tag{
    position: absolute;
  }

  .name-tag#tag-N{
    top: 0;
    left: 50%;
    transform: rotate(0deg) translateX(-50%);
  }

  .name-tag#tag-S{
    bottom: 0;
    left: 50%;
    transform: rotate(180deg) translateX(50%);
  }

  .name-tag#tag-E{
    top: 50%;
    right: 0;
    transform: rotate(90deg) translateX(50%);
    transform-origin: top right;
  }

  .name-tag#tag-W{
    top: 50%;
    left: 0;
    transform: rotate(-90deg) translateX(-50%);
    transform-origin: top left;
  }

  .board-num{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: x-large;
    font-weight: bold;
  }

  .box-bids{
    padding: 0;
    margin: 0;
  }

  .box-bids#W{
    transform: rotate(90deg);
  }

  .box-bids#E{
    transform: rotate(-90deg);
  }

  .box-bids#N{
    transform: rotate(180deg);
  }

  .box-bids#S{
    transform: rotate(0deg);
  }

</style>