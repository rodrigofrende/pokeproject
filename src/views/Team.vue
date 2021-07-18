<template>
<b-container class="white-background">
  <b-row v-if="myTeam.length > 0">
    <!-- <b-col cols="12" md="4" > -->
      <v-col
        cols="12"
        xl="6"
        lg="6"
        md="6"
        sm="12"
        xs="12"
        v-for="pokemon in myTeam"
        :key="pokemon.id"
      >
        <v-card class="d-flex">
          <v-col cols="4" class="">
            <b-avatar size="4rem" :src="pokemon.sprites.versions['generation-v']['black-white'].animated.front_default" />
          </v-col>
          <v-col cols="4" class="">
            <span>{{pokemon.name}}</span>
          </v-col>
          <v-col cols="4" class="">
          </v-col>
        </v-card>
      </v-col>
    <!-- </b-col> -->
  </b-row>

  <b-row class="pt-5 " v-else>
    <b-col cols="12 pt-5">
      <span class="game-font">Tu equipo está vacio.</span>
    </b-col>
    <b-col cols="12 py-2">
      <b-button @click="$router.push('/')" class="btn-pokemon game-font" >Agregar Pokemons</b-button>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import localData from '@/mixins/localData'
export default {
  name: 'Team',
  computed: {
    myTeam () {
      return this.$store.state.myTeam
    }
  },
  mixins: [localData],
  mounted () {
    this.getLocalStorageInfo()
    console.log('My team: ', this.myTeam)
  }
}
</script>

<style>

</style>