<template>
  <v-row justify="center" no-gutters>
    <v-col cols=3>
      <v-btn block color="warning">Undo</v-btn>
    </v-col>
    <v-col col=6>
      <v-dialog width="90vw">
        <template v-slot:activator="{on, attrs}">
          <v-btn block color="primary" v-bind="attrs" v-on="on">
            Box
          </v-btn>
        </template>
        <v-card>
          <BoxSelect />
        </v-card>
      </v-dialog>
    </v-col>
    <v-col cols=3>
      <v-btn block>-></v-btn>
    </v-col>
  </v-row>
</template>

<script>
import BoxSelect from '@/views/BoxSelect.vue'

export default {
  name: 'BiddingFooter',
  components: {
    BoxSelect
  },
  data(){
    return {}
  },
  
}
</script>