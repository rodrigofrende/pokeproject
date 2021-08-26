<template>
<b-container>
  <h5 class="game-font">Pokemons más elegidos</h5>
  <div class="small">
    <BarChart :data="submittedNames" />
  </div>
</b-container>
</template>

<script>
import BarChart from '@/services/Charts/BarChart.js'
export default {
  props: {
    submittedNames: {
      type: Array
    }
  },
  components: {
    BarChart
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