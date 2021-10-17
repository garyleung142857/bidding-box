<template>
  <div>
    <template v-if="this.contract.declarer==null">Pass Out</template>
    <template v-else>
      <span
        :class="'label-' + this.contract.bid[1]"
        v-html="this.bid_to_html(this.contract.bid)"
      ></span>
      <span>{{this.to_pxr(this.contract.pxr)}}</span>
      <span style="margin-left: 0.5em"> by {{this.contract.declarer}}</span>
    </template>
  </div>
</template>
<script>
export default {
  name: 'Contract',
  props: {
    contract: Object,
    vul: Boolean
  },
  data(){
    return {
      strains: {'N': 'N', 'S': '&#9828;', 'H': '&#9825;', 'D': '&#9826;', 'C': '&#9831;'},
    }
  },
  methods: {
    bid_to_html(str){
      return str[0] + this.strains[str[1]]
    },
    to_pxr(str){
      if (str === 'P'){
        return ''
      } else if (str === 'X') {
        return 'X'
      } else {
        return 'XX'
      }
    }
  }
}
</script>