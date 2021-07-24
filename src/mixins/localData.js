const mixin = {
    methods: {
      getLocalStorageInfo () {
        var team = JSON.parse(localStorage.getItem("myTeam"))
        var favs = JSON.parse(localStorage.getItem("myFavs"))
        var userData = JSON.parse(localStorage.getItem("userData"))
        if (team) {
          this.$store.dispatch('setPokemonTeam', team)
        }
        if (favs) {
          this.$store.dispatch('setPokemonFavs', favs)
        }
        if (userData) {
          this.$store.dispatch('setUserData', userData)
        } else {
          this.$store.dispatch('createUserData')
        }
      }
    }
  }
  
  export default mixin
  