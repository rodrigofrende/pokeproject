<template>
  <b-container>
  <h5 class="game-font">Cantidad de Pokemons Shiny</h5>
  <div class="small">
    <PieChart :data="submittedNames"/>
  </div>
</b-container>
</template>

<script>
import PieChart from '@/services/Charts/PieChart.js'
export default {
  props: {
    submittedNames: {
      type: Array
    }
  },
  components: {
    PieChart
  },
  data () {
    return {
      datacollection: null
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.small {
    max-width: 600px;
    margin:  10px auto;
  }
</style>