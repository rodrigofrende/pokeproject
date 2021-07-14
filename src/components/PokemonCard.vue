<template>
  <b-container v-if="pokemon.id"  class="px-0">
      <b-row >
        <b-col cols="12" class="text-left">
          <span class="game-font pl-3">{{pokemon.id}} </span>
          <span class="game-font">{{pokemon.name}} </span>
        </b-col>
      </b-row>
      <b-row class="">
        <b-col class="py-0 d-flex col-12">
          <b-list-group-item class="d-flex">
            <b-nav vertical class="game-font mx-2 my-auto">
              <v-spacer></v-spacer>

              <v-btn color="red lighten-2" icon>
                <v-icon  >mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-plus-circle</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon @click="showPokemonModal(pokemon)">mdi-information</v-icon>
              </v-btn>
            </b-nav>
          </b-list-group-item>
          <b-avatar
            button
            class="ml-1 bg-transparent"
            @click="changeSprite()"
            square size="9rem"
            :src="isFrontSprite ? pokemon.sprites.front_default : pokemon.sprites.back_default">
          </b-avatar>
        </b-col>
        <b-col class="py-0">
          <span class="game-font subtitle w-75 px-4">{{pokemon.weight / 10}} kg, {{pokemon.height / 10}} m</span>
        </b-col>
      </b-row>
      <PokemonModal 
        :show="showModal"
        :pokemon="pokemon"
        @closeModal="closeModal"
      />
  </b-container>
</template>

<script>
import PokemonModal from '@/components/PokemonModal'
export default {
  name: 'PokemonCard',
  props: {
    pokemon: {
      type: Object
    }
  },
  components: {
    PokemonModal
  },
  data () {
    return {
      isFrontSprite: true,
      showModal: false
    }
  },
  methods: {
    changeSprite () {
      this.isFrontSprite = !this.isFrontSprite
    },
    showPokemonModal (pokemon) {
      console.log(pokemon)
      this.showModal = true
    },
    closeModal () {
      this.showModal = false
    }
  }
}
</script>

<style scoped>
.v-card {
  border-radius: 0.8rem !important;
}
.game-font.subtitle {
  font-size: 0.6rem;
  background-color: goldenrod;
  padding: 1px;
  box-shadow: 1px 1px 3px 1.5px black !important;
}
.game-font {
  text-transform: capitalize;
}
.list-group-item {
  position: relative;
  display: block;
  padding: 0.1rem 0.1rem;
  border: none;
  background-color: transparent !important;
}
.btn-secondary.focus,.btn-secondary.hover, .btn-secondary:focus, .btn-secondary:hover {
    color: #fff;
    background-color: none;
    border-color: none !important;
    box-shadow: none !important;
    /* CURSOR FIX */
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC) 14 0,pointer !important;
}
</style>