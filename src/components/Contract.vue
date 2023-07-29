<template>
  <div>
    <template v-if="contract.bid===undefined">{{ " " }}</template>
    <template v-else-if="contract.declarer===undefined">Pass Out</template>
    <template v-else>
      <span
        :class="'label-' + contract.bid[1]"
        v-html="bid_html"
      ></span>
      <span>{{pxr}}</span>
      <span style="margin-left: 0.5em"> by {{contract.declarer}}</span>
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

const strains = {'N': 'N', 'S': '&#9828;', 'H': '&#9825;', 'D': '&#9826;', 'C': '&#9831;'} 
const pxr_map = {'P': '', 'X': 'X', 'R': 'XX'}
export default {
  name: 'Contract',
  computed: {
    ...mapGetters('history', ['contract']),
    pxr(){
      return pxr_map[this.contract.pxr]
    },
    bid_html(){
      return this.contract.bid[0] + strains[this.contract.bid[1]]
    }
  }
}
</script>