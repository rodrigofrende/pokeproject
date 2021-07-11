<template>
<b-container class="white-background">
  <b-row v-if="pokemonList.length > 0">
    <!-- <b-col cols="12" md="4" > -->
      <v-col
          v-for="pokemon in pokemonList"
          :key="pokemon.id"
          cols="12"
          xl="3"
          lg="3"
          md="4"
          sm="6"
          xs="6"
        >
          <v-card>
            <PokemonCard 
              :pokemon="pokemon"
            />

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
    <!-- </b-col> -->
  </b-row>

  <b-row class="pt-5 " v-else>
    <b-col cols="12 py-5">
      <span class="game-font">Cargando...</span>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
  import PokemonCard from '@/components/PokemonCard'
  export default {
    name: 'Home',
    components: {
      PokemonCard,
    },
    data: () => ({
      value: 50,
      attrs: {
        class: 'mb-6',
        align: 'center',
        boilerplate: true,
        elevation: 2,
      },
    }),
    async mounted () {
      await this.$store.dispatch('getListOfPokemons')
    },
    computed: {
      pokemonList () {
        return this.$store.state.pokemonDataList
      }
    }
  }
</script>
<style scoped>
.white-background {
  background-color: #fff !important;
  border-radius: 2rem;
  height: fit-content;
  min-height: 90vh;
}
</style>
