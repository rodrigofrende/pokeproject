const mixin = {
    methods: {
      getLocalStorageInfo () {
        var team = JSON.parse(localStorage.getItem("myTeam"))
        var favs = JSON.parse(localStorage.getItem("myFavs"))
        if (team) {
          this.$store.dispatch('setPokemonTeam', team)
        }
        if (favs) {
          this.$store.dispatch('setPokemonFavs', favs)
        }
      }
    }
  }
  
  export default mixin
  