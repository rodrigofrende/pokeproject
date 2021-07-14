<template>
<div>
  <b-modal no-close-on-esc no-close-on-backdrop @close="close" centered hide-footer v-model="show" size="md" id="modalPokemon">
    <template #modal-header="{ }">
      <div>
        <h5 class="text-capitalize">{{pokemon.name}}</h5>
        <span v-if=" modalData.pokemonDesc" class="subtitle">{{ modalData.pokemonDesc.genus }}</span>
      </div>
      <button type="button" @click="close" aria-label="Close" class="close ml-auto">×</button>
    </template>

    <b-row v-if="modalData.textEntry" class="">
      <b-col class="d-flex pt-1 px-3" cols="12">
        <div class="ml-auto d-flex">
          <EnergyType 
            class="mx-1"
            v-for="type in pokemon.types"
            :key="type.slot"
            :image="resolveImage(type.type.name)"
            :type="type.type.name"
          />
        </div>
      </b-col>
      <!-- componente para mostrar los types del pokemon -->
    </b-row>

    <b-carousel
      id="myCarousel"
      style="text-shadow: 0px 0px 2px #000"
      controls
    >
    <b-carousel-slide
      v-for="(item,i) in pokemonSprites"
      :key="i"
      :img-src="item"
    ></b-carousel-slide>
  </b-carousel>

  <b-row v-if="modalData.textEntry" class="my-2">
    <p class="text-center px-3">{{ modalData.textEntry.flavor_text}}</p>
  </b-row>

  </b-modal>
</div>
</template>

<script>
import { getPokemonModalData } from '@/services/PokemonServices/api'
import EnergyType from '@/components/EnergyType'
export default {
  name: 'PokemonModal',
  components: {
    EnergyType
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    pokemon: {
      type: Object
    }
  },
  data () {
    return {
      pokemonSprites: [],
      artWork: ["official-artwork"],
      modalData: []
    }
  },
  methods: {
    close () {
      this.$emit('closeModal')
    },
    resolveImage (type) {
      switch (type) {
        case 'grass':
          return 'grass_type.png'
        case 'poison':
          return 'poison-type.png' 
        case 'fire':
          return 'fire_type.png'
        case 'flying':
          return 'fly-type.png'
        case 'water':
          return 'water_type.png'
        case 'bug':
          return 'bug-type.png'
        case 'normal':
          return 'normal-type.png'
        case 'ground':
          return 'ground_type.png'
        case 'electric':
          return 'electric_type.png'
        case 'fairy':
          return 'fairy-type.png'
        case 'fighting':
          return 'figth-type.png'
        case 'psychic':
          return 'psy-type.png'
        case 'rock':
          return 'rock-type.png'
        case 'steel':
          return 'steel-type.png'
        case 'ice':
          return 'ice-type.png'
        case 'ghost':
          return 'ghost-type.png'
        case 'dragon':
          return 'dragon-type.png'
        default:
          return ''
      }
    },
    async loadModalData (url) {
      const data = await getPokemonModalData(url)
      const dto = {
        textEntry: data.flavor_text_entries.find(x => x.language.name === 'es') || '',
        pokemonDesc: data.genera.find(x => x.language.name === 'es') || ''
      }
      this.modalData = dto
    }
  },
  watch: {
    async show (val) {
      if (val === true) {
        const spritesFolder = this.pokemon.sprites

        await this.loadModalData(this.pokemon.species.url)

        this.pokemonSprites.push(spritesFolder.front_default)
        this.pokemonSprites.push(spritesFolder.back_default)
        // if (spritesFolder.front_female !== null) this.pokemonSprites.push(spritesFolder.front_female)
        // if (spritesFolder.back_female !== null) this.pokemonSprites.push(spritesFolder.back_female)
        if (spritesFolder.front_shiny !== null) this.pokemonSprites.push(spritesFolder.front_shiny)
        if (spritesFolder.back_shiny !== null) this.pokemonSprites.push(spritesFolder.back_shiny)
        if (spritesFolder.front_shiny_female !== null) this.pokemonSprites.push(spritesFolder.front_shiny_female)
        if (spritesFolder.back_shiny_female !== null) this.pokemonSprites.push(spritesFolder.back_shiny_female)
        // this.pokemonSprites.push(this.pokemon.sprites.other.dream_world.front_default)
        // this.pokemonSprites.push(this.pokemon.sprites.other[this.artWork].front_default)
      }
    }
  }

}
</script>

<style scoped>
::v-deep #modalPokemon___BV_modal_title_ {
  text-transform: capitalize !important;
}
::v-deep .img-fluid {
  width: 12rem !important;
  height: 12rem !important;
  margin: 0 auto;
}
::v-deep .carousel-control-prev-icon {
 background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23242424' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E") !important;
}

::v-deep .carousel-control-next-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23242424' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E") !important;
}
::v-deep .carousel-control-next:hover,::v-deep .carousel-control-prev:hover {
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC) 14 0,pointer !important;
}
::v-deep .close {
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC) 14 0,pointer !important;
}
.subtitle {
  font-size: 0.6rem;
}
p {
  font-size: 0.8rem;
}
h5 {
  margin-bottom: 0px !important;
}
</style>