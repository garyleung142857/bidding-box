<template>
  <div v-resize="onResize">
    <BiddingTable />
    <v-footer fixed padless id="control-footer">
      <v-row justify="center" no-gutters>
        <v-col cols=3>
          <v-btn block id="undo-button" class="d-flex align-center justify-center" @click="undo()">
            <v-icon>mdi-arrow-u-left-top</v-icon>
          </v-btn>
        </v-col>
        <v-col col=6 v-if="contract.bid == undefined">
          <v-dialog width="unset" v-model="dialog">
            <template v-slot:activator="{on, attrs}">
              <v-btn block id="call-button" class="d-flex align-center justify-center" v-bind="attrs" v-on="on">
                <v-icon>mdi-arrow-up-box</v-icon>
              </v-btn>
            </template>
            <BoxSelect @selectedCall="dialog = false"/>
          </v-dialog>
        </v-col>
        <v-col col=6 v-else>
          <div id="contract" class="d-flex align-center justify-center">
           <Contract />
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
import { mapGetters, mapMutations } from 'vuex'
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
      dialog: false,
      sideLength: null,
    }
  },
  computed: {
    ...mapGetters('history', ['contract'])
  },
  methods: {
    ...mapMutations('sizing', ['changeSideLength']),
    ...mapMutations('history', ['undo', 'advanceBoard']),
    onResize: function(){
      this.sideLength = (Math.min(window.innerWidth, window.innerHeight * 0.9))
      this.changeSideLength(this.sideLength)
    }
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