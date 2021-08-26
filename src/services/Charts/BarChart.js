import { Doughnut  } from 'vue-chartjs'
 
export default {
  extends: Doughnut ,
  props: {
    submittedNames: {
      type: Array
    }
  },
  props: {
    data: {
      type: Array
    }
  },
  data () {
    return {
      options: {
      },
      chartInfo: {
        labels: [],
        datasets: [{
          borderWidth: 2,
          borderColor: [          
          ],
          backgroundColor: [             
          ],
          data: []
        }],
      }
    }
  },
  methods: {
    randomColor () {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    calculateData (data) {
      var counts = [];
      data.forEach((x) => {
          const addedPokemon = counts.find(pokemon => pokemon.id === x.pokemonId)
          if (addedPokemon) {
            addedPokemon.count = addedPokemon.count + 1 
          } else {  
            counts.push({
              id: x.pokemonId,
              name: x.name,
              count: 1
            })
          }
      });
      counts.forEach(element => {
        this.chartInfo.labels = this.chartInfo.labels.concat(element.name)
        this.chartInfo.datasets[0].data.push(element.count)
        this.chartInfo.datasets[0].backgroundColor.push(this.randomColor())
      });
    }
  },
  mounted () {
    this.calculateData(this.data)
    // Overwriting base render method with actual data.
    this.renderChart(this.chartInfo, this.options)
  }
}