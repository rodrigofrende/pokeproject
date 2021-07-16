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
        <v-card >
          <span>{{pokemon.name}}</span>
          <v-card-actions>
            
          </v-card-actions>
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
export default {
  name: 'Team',
  computed: {
    myTeam () {
      return this.$store.state.myTeam
    }
  },
}
</script>

<style>

</style>