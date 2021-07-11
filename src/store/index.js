import Vue from 'vue'
import Vuex from 'vuex'

const axios = require('axios');

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      pokemonDataList: [],
      favoritePokemonList: [],
      loadingData: false
    },
    mutations: {
      setLoadingData (state, status) {
        state.loadingData = status
      },
      async setPokemonList (state, payload) {
        payload.sort((a, b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0))
        state.pokemonDataList = payload
        console.log('Pokemon list', state.pokemonDataList)
      }
    },
    actions: {
      async getListOfPokemons ({ commit }) {
        commit('setLoadingData', true)
        const data = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=151')
        const pokemonUrlList = data.data.results

        var allDataPokemonList = []
        if (pokemonUrlList.length > 0) {
          for await (var item of pokemonUrlList){
            const pokemon = await axios.get(`${item.url}`)
            allDataPokemonList.push(pokemon.data)
          }
          commit('setPokemonList', allDataPokemonList)
        }
        commit('setLoadingData', false)
      }
    },
    modules: {
    //   sidebar
    },
    getters: {
    //   token: state => state.token
    }
  })
  
  export default store
  // Accede al store directamente desde cualquier parte del proyecto
  window.store = store
  