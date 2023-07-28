<template>
  <v-card
    :height="sideLength * 0.16"
    :width="sideLength * 0.18"
    class="d-flex align-center justify-end pr-3"
    :class="to_class(biddingCall)"
    v-html="to_html(biddingCall)"
    :elevation="is_special ? 0 : 5"
  >
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Call',
  props: {
    biddingCall: String
  },
  data(){
    return {
      levels: ['1', '2', '3', '4', '5', '6', '7'],
      strains: {'N': 'N', 'S': '&#9828;', 'H': '&#9825;', 'D': '&#9826;', 'C': '&#9831;'},
      pxr : {'P': 'P', 'X': 'X', 'R': 'XX'}
    }
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
      if(str in this.pxr){return this.pxr[str]}
      return str[0] + '<br>' + this.strains[str[1]]
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