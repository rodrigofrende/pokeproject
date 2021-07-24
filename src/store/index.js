import Vue from 'vue'
import Vuex from 'vuex'

const axios = require('axios');

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      pokemonDataList: [],
      favoritePokemonList: [],
      loadingData: false,
      myTeam: [],
      myFavs: [],
      userData: {
        points: 0
      }
    },
    mutations: {
      setLoadingData (state, status) {
        state.loadingData = status
      },
      addFav (state, payload) {
        const isShiny = Math.random() < 0.15
        const dto = {
          id: payload.id,
          order: payload.order,
          name: payload.name,
          sprites: payload.sprites,
          types: payload.types,
          height: payload.height,
          weight: payload.weight,
          totalExp: payload.base_experience
        }
        state.myFavs.push(dto)
        localStorage.setItem("myFavs", JSON.stringify(state.myFavs))
      },
      addPokemon (state, payload) {
        const isShiny = Math.random() < 0.15
        const dto = {
          id: payload.id,
          isShiny: isShiny,
          order: payload.order,
          name: payload.name,
          sprites: payload.sprites,
          types: payload.types,
          height: payload.height,
          weight: payload.weight,
          exp: 0,
          totalExp: payload.base_experience
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
      },
      fillMyFavs (state, payload) {
        state.myFavs = payload
      },
      fillUserData (state, payload) {
        state.userData.points = payload.points
      },
      createNewUserData (state) {
        state.userData.points = 50
        const dto = {
          points: state.userData.points
        }
        localStorage.setItem("userData", JSON.stringify(dto))
      }
    },
    actions: {
      setPokemonTeam ({ commit }, team) {
        commit('fillMyTeam', team)
      },
      createUserData ({ commit }) {
        commit('createNewUserData')
      },
      setPokemonFavs ({ commit }, favs) {
        commit('fillMyFavs', favs)
      },
      setUserData ({ commit }, userData) {
        commit('fillUserData', userData)
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
              order: data.order,
              height: data.height,
              weight: data.weight,
              base_experience: data.base_experience,
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
      },
      addToMyFavs ({ commit }, pokemon) {
        commit('addFav', pokemon)
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
  