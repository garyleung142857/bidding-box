<template>
  <v-card
    :height="this.sideLength * 0.15"
    :width="this.sideLength * 0.15"
    class="d-flex align-center justify-center"
    :class="this.to_class(this.biddingCall)"
    v-html="this.to_html(this.biddingCall)"
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
  },
  methods: {
    to_html(str){
      if(['A', 'B', 'E'].includes(str)){return ''}
      if(str in this.pxr){return this.pxr[str]}
      return str[0] + this.strains[str[1]]
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