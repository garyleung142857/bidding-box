<template>
  <v-app id="app">
    <BiddingMain/>
  </v-app>
</template>

<script>
import BiddingMain from "../src/views/BiddingMain.vue"
export default {
  components: {
    BiddingMain
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Noto Sans HK Variable', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
