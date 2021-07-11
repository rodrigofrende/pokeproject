<template>
  <b-container>
      <b-row v-if="pokemon.id">
        <b-col >
          <span class="game-font">{{pokemon.id}} </span>
          <span class="game-font">{{pokemon.name}} </span>
          <!-- <b-avatar square size="10rem" :src="pokemon.sprites.front_default" /> -->
          <b-list-group-item class="d-flex">
            <b-nav vertical class="game-font my-auto">
              <span>H</span>
              <span>O</span>
              <span>L</span>
              <span>A</span>
            </b-nav>
            <b-avatar button @click="changeSprite()" square size="10rem" :src="isFrontSprite ? pokemon.sprites.front_default : pokemon.sprites.back_default"></b-avatar>
          </b-list-group-item>
        </b-col>
      </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'PokemonCard',
  props: {
    pokemon: {
      type: Object
    }
  },
  data () {
    return {
      isFrontSprite: true
    }
  },
  methods: {
    changeSprite() {
      this.isFrontSprite = !this.isFrontSprite
    }
  }
}
</script>

<style scoped>
.v-card {
  border-radius: 0.8rem !important;
}
</style>