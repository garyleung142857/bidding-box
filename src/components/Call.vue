<template>
  <v-card
    :height="sideLength * 0.16"
    :width="sideLength * 0.18"
    class="d-flex align-center justify-end pr-3"
    :class="to_class(biddingCall)"
    v-html="to_html(biddingCall)"
    :elevation="is_special ? 0 : 5"
  />
</template>

<script>
import { mapGetters } from 'vuex'

const strains = {'N': 'N', 'S': '&#9828;', 'H': '&#9825;', 'D': '&#9826;', 'C': '&#9831;'}
const pxr = {'P': 'P', 'X': 'X', 'R': 'X <br> X'}

export default {
  name: 'Call',
  props: {
    biddingCall: String
  },
  computed: {
    ...mapGetters('sizing', ['sideLength']),
    is_special(){
      return ['A', 'B', 'E'].includes(this.biddingCall)
    },
  },
  methods: {
    to_html(str){
      if(this.is_special){return ''}
      if(str in pxr){return pxr[str]}
      return str[0] + '<br>' + strains[str[1]]
    },
    to_class(str){
      // for css coloring
      var class_list = ['table-label']
      if(str.length === 2 || ['P', 'X', 'R'].includes(str)){
        class_list.push('normal-label')
      }
      class_list.push(`label-${str[str.length - 1]}`)
      return class_list
    }
  }
}
</script>