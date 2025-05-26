<template>
  <div v-resize="onResize">
    <BiddingTable @click.native="toggleDialog()" />
    <v-dialog
      v-model="boxDialog"
      width="unset"
      :transition="false"
    >
      <BoxSelect @selectedCall="boxDialog = false"/>
    </v-dialog>
    <v-dialog width="unset" v-model="resetDialog">
      <v-card>
        <v-card-title>
          Reset All History?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="resetDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="error"
            @click="resetAll(); resetDialog = false"
          >
            Reset
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-footer fixed padless id="control-footer">
      <v-row justify="center" no-gutters>
        <v-col cols=12 id="contract">
          <Contract />
        </v-col>
        <v-col :cols="tdOpened ? 2 : biddingEnded ? 10 : 12">
          <v-btn block id="td-button" class="d-flex align-center justify-center" @click="tdOpened=!tdOpened">
            TD
          </v-btn>
        </v-col>
        <template v-if="tdOpened">
          <v-col cols=2>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn 
                  block id="reset-button" class="d-flex align-center justify-center" 
                  @click.native="resetDialog=true"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-nuke</v-icon>
                </v-btn>
              </template>
              <span>Reset</span>
            </v-tooltip>
          </v-col>
          <v-col cols=4>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  block id="undo-button" class="d-flex align-center justify-center"
                  @click="undo()"
                  v-bind="attrs"
                  v-on="on"  
                >
                  <v-icon>mdi-arrow-u-left-top</v-icon>
                </v-btn>
              </template>
              <span> Undo last call </span>
            </v-tooltip>
          </v-col>
          <v-col cols=2>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn 
                  block id="unwind-button" class="d-flex align-center justify-center" 
                  @click="unwindBoard()"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-skip-previous</v-icon>
                </v-btn>
              </template>
              <span> Nav to previous board </span>
            </v-tooltip>  
          </v-col>
        </template>
        <v-col cols=2 v-if="biddingEnded || tdOpened">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn 
                block id="advance-button" class="d-flex align-center justify-center" 
                @click="advanceBoard()"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-skip-next</v-icon>
              </v-btn>
            </template>
            <span>Nav to next board</span>
          </v-tooltip>
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
    BiddingTable,
    BoxSelect,
    Contract
  },
  data(){
    return {
      boxDialog: false,
      tdOpened: false,
      resetDialog: false,
      sideLength: null,
    }
  },
  computed: {
    ...mapGetters('history', ['contract']),
    biddingEnded: function() {
      return this.contract.bid !== undefined
    }
  },
  methods: {
    ...mapMutations('sizing', ['changeSideLength']),
    ...mapMutations('history', ['undo', 'advanceBoard', 'unwindBoard', 'resetAll']),
    onResize: function(){
      this.sideLength = (Math.min(900, window.innerWidth, window.innerHeight * 0.85))
      this.changeSideLength(this.sideLength)
    },
    toggleDialog: function() {
      if (!this.biddingEnded) {
        this.boxDialog = true
      }
    }
  },
  mounted(){
    this.onResize()
  }
}
</script>

<style lang="scss">
  $color-heart: #af3535;
  $color-spade: #2b3b94;
  $color-diamond: #dd9b44;
  $color-club: #5d8b47;
  $color-nt: #302f46;
  $color-background: #e0e0e0;
  $color-light: #f0f0f0;
  $color-vul: #f56d6d;
  $color-nv: #75ffca;
  $color-current: #eee066;
  $color-noncur: #acbabd;
  $color-unwind: #9ba8eb;
  $color-td: #fd9621;
  $color-reset: #ee2222;

  html{
    background-color: $color-background;
  }

  #app, #control-footer {
    background-color: $color-background;
    max-width: 1000px;
    min-width: 400px;
    margin: auto;
  }

  #td-button {background-color: $color-td;}
  #undo-button {background-color: $color-vul;}
  #unwind-button {background-color: $color-unwind;}
  #advance-button {background-color: $color-nv;}
  #reset-button {background-color: $color-current;}

  #undo-button, #reset-button, #call-button, #unwind-button, #advance-button, #td-button{height: 10vh}

  #contract, .player-nv, .player-v, .call-choice span, .table-label{
    font-weight: 900;
    max-width: unset;
    font-display: block;
  }

  .box-bids {
    background-color: $color-background;
    backface-visibility: hidden;
  }

  .label-N {color: $color-nt !important;}
  .label-S {
    color: transparent !important;
    text-shadow: 0 0 0 $color-spade;
  }
  .label-H {
    color: transparent !important;
    text-shadow: 0 0 0 $color-heart;
  }
  .label-D {
    color: transparent !important;
    text-shadow: 0 0 0 $color-diamond;
  }
  .label-C {
    color: transparent !important;
    text-shadow: 0 0 0 $color-club;
  }

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

  button[disabled="disabled"] span {
    color: transparent !important;
    text-shadow: 0 0 0 $color-background;
  }

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

  @media screen and (max-width: 600px) {
    #contract, .call-choice span, .table-label{
      font-size: 30px;
      font-display: block;
    }
  }

  @media screen and (min-width: 601px) and (max-width: 900px) {
    #contract, .call-choice span, .table-label{
      font-size: 40px;
      font-display: block;
    }
  }

  @media screen and (min-width: 901px) {
    #contract, .call-choice span, .table-label{
      font-size: 50px;
      font-display: block;
    }
  }

  .biddingtable{
    top: 42.5%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: transparent;
  }

  .playertray {
    margin: 3px;
    padding: 3px;
    vertical-align: text-bottom;
    border-radius: 3px;
    overflow: auto;;
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

  .table-label{
    transform: rotate(180deg);
    line-height: 1;
    text-align: center;
  }

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