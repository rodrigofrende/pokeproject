<template>
  <b-container>
      <b-row v-if="pokemon.id">
        <b-col >
          <span class="game-font">{{pokemon.id}} </span>
          <span class="game-font">{{pokemon.name}} </span>
          <b-avatar size="10rem" :src="pokemon.sprites.front_default" />
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
  }
}
</script>

<style>

</style>