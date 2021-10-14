<template>
  <v-card
    height="7vh"
    class="d-flex align-center justify-center ma-1"
  >
    <div
      v-html="this.to_html(this.call)"
      v-bind:class="'table-call label-' + this.to_strain(this.call)"
    ></div>
  </v-card>
</template>

<script>
export default {
  name: 'Call',
  props: ['call'],
  data(){
    return {
      levels: ['1', '2', '3', '4', '5', '6', '7'],
      strains: {'N': 'N', 'S': '&#9828;', 'H': '&#9825;', 'D': '&#9826;', 'C': '&#9831;'},
      pxr : {'P': 'Pass', 'X': 'Dbl', 'R': 'Rdbl'}
    }
  },
  methods: {
    to_html(str){
      if(str === '_'){return ''}
      if(str in this.pxr){return this.pxr[str]}
      return str[0] + this.strains[str[1]]
    },
    to_strain(str){
      // for css coloring. returns one of the 5 strains or pxr or _
      if(str.length === 1){return str}
      return str[1]
    }
  }
}
</script>

<style scoped>
  .label-N {color: black}
  .label-S {color: blue;}
  .label-H {color: red;}
  .label-D {color: orange;}
  .label-C {color: green;}

  .table-call{
    font-size: x-large; 
    font-weight: bold;
  }

</style>