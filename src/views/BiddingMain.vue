<template>
  <div v-resize="onResize">
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
import { mapMutations } from 'vuex'
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
    ...mapMutations('sizing', ['changeSideLength']),
    onResize: function(){
      this.sideLength = (Math.min(window.innerWidth, window.innerHeight * 0.9))
      this.changeSideLength(this.sideLength)
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

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap');

  $color-heart: #af3535;
  $color-spade: #2f3b80;
  $color-diamond: #dd9b44;
  $color-club: #5d8b47;
  $color-nt: #302f46;
  $color-background: #f3f3f3;
  $color-light: #fcfcfc;
  $color-vul: #f37272;
  $color-nv: #75ffca;
  $color-current: #eee066;
  $color-noncur: #ced3d4;
  $color-call: #9ba8eb;

  #app, #control-footer {
    background-color: $color-background;
    font-family: 'Roboto', sans-serif;
  }

  #undo-button {background-color: $color-vul;}
  #call-button {background-color: $color-call;}
  #advance-button {background-color: $color-nv;}

  #undo-button, #call-button, #advance-button, #contract{height: 10vh}

  #contract, .player-nv, .player-v, .call-choice span, .table-label{
    font-weight: bold;
    max-width: unset;
  }

  .box-bids {background-color: $color-background;}

  .label-N {color: $color-nt !important;}
  .label-S {color: $color-spade !important;}
  .label-H {color: $color-heart !important;}
  .label-D {color: $color-diamond !important;}
  .label-C {color: $color-club !important;}

  .label-P, .label-X, .label-R {color: $color-background !important;}

  .label-E {
    background-color: transparent !important;
    box-shadow: none !important;
  }

  .table-label.label-P {background-color: $color-club !important;}
  .table-label.label-X {background-color: $color-heart !important;}
  .table-label.label-R {background-color: $color-spade !important;}

  #control-footer .v-icon{color: $color-nt !important;}

  #call-P {background-color: $color-club;}
  #call-X {background-color: $color-heart;}
  #call-R {background-color: $color-spade;}

  button[disabled="disabled"] span {color: $color-background !important;}

  .bid-choice, .normal-label {background-color: $color-light !important;}


  .player-v {
    background-color: $color-vul !important;
    color: $color-light !important;
  }

  .player-nv {
    background-color: $color-nv !important;
    color: $color-nt !important;
  }

  .call-choice {padding: 0px !important;}

  #contract, .call-choice span, .table-label{font-size: x-large;}

  .biddingtable{
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
    background-color: $color-noncur !important;
  }

  .tray-holder{overflow: auto;}

  .playertray.current{background-color: $color-current !important;}

  .biddingtable, .name-tag, .playertray, .tablecenter, .board-num{
    position: absolute;
  }

  .playertray#S {
    bottom: 0;
    right: 0;
    transform: rotate(0deg);
  }

  .playertray#N {
    top: 0;
    left: 0;
    transform: rotate(180deg);
  }

  .playertray#E {
    top: 0;
    right: 0;
    transform: rotate(-90deg) translateY(-100%);
    transform-origin: top right;
  }

  .playertray#W {
    bottom: 0;
    left: 0;
    transform: rotate(90deg) translateX(-100%) ;
    transform-origin: bottom left;
  }

  .table-label{transform: rotate(180deg);}

  .tablecenter{
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
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

  .box-bids#N{transform: rotate(180deg);}
  .box-bids#E{transform: rotate(-90deg);}
  .box-bids#W{transform: rotate(90deg);}
  .box-bids#S{transform: rotate(0deg);}

  ::-webkit-scrollbar {display: none;}
</style>