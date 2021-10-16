<template>
  <div>
    <div v-if="false">
      <BoxSelect />
    </div>
    <div>
      <BiddingTable />
    </div>
    <v-footer fixed>
      <Footer />
    </v-footer>
  </div>
</template>

<script>
import BiddingTable from '@/views/BiddingTable.vue'
import BoxSelect from '@/views/BoxSelect.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'BiddingMain',
  components: {
    BiddingTable, BoxSelect, Footer
  },
  data(){
    return{}
  }
}
</script>