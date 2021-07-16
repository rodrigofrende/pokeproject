import Vue from 'vue'
import Vuex from 'vuex'

const axios = require('axios');

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      pokemonDataList: [],
      favoritePokemonList: [],
      loadingData: false,
      myTeam: []
    },
    mutations: {
      setLoadingData (state, status) {
        state.loadingData = status
      },
      addPokemon (state, payload) {
        const dto = {
          id: payload.id,
          order: payload.order,
          name: payload.name,
          sprites: payload.sprites
        }
        state.myTeam.push(dto)
        localStorage.setItem("myTeam", JSON.stringify(state.myTeam));
      },
      async setPokemonList (state, payload) {
        payload.sort((a, b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0))
        state.pokemonDataList = payload
        console.log('Pokemon list', state.pokemonDataList)
      },
      fillMyTeam (state, payload) {
        state.myTeam = payload
      }
    },
    actions: {
      setPokemonTeam ({ commit }, team) {
        commit('fillMyTeam', team)
      },
      async getListOfPokemons ({ commit }) {
        commit('setLoadingData', true)
        
        const promises = [];
        for (let i = 1; i <= 150; i++) {
          const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
          promises.push(fetch(url).then(res => res.json()));
        }
        Promise.all(promises).then(results => {
            const pokemon = results.map(data => ({
              name: data.name,
              id: data.id,
              sprites: data.sprites, // ["front_default"]
              types: data.types,
              species: data.species,
              height: data.height,
              weight: data.weight,
              ability: data.abilities.map(ability => ability.ability.name).join(','),
              moves: data.moves.map(move => move.move.name).slice(0, 10).join(', ')
            }));
            sendData(pokemon);
          })
          .catch((reason) => {
            if (reason === -999) {
              console.error("Had previously handled error");
            } else {
              console.error(`Trouble with promiseGetWord(): ${reason}`);
            }
          })
          function sendData(jsonData) {
            commit('setPokemonList', jsonData)
          }
          commit('setLoadingData', false)
      },
      addToMyTeam ({ commit }, pokemon) {
        commit('addPokemon', pokemon)
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
  