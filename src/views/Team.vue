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
          <v-col cols="4" class="px-0">
            <b-avatar class="pokemon-avatar bg-transparent" square size="6rem" :src="pokemon.isShiny ? pokemon.sprites.versions['generation-v']['black-white'].animated.front_shiny : pokemon.sprites.versions['generation-v']['black-white'].animated.front_default" />
          </v-col>
          <v-col cols="6" class="px-0">
            <v-col cols="12" class="my-1 mt-auto py-0">
              <span class="float-left text-capitalize game-font">{{pokemon.name}}</span>
            </v-col>
            <v-col cols="12 mt-4">
              <span id="exp-span" class="float-left mt-1 text-capitalize game-font">Exp:</span>
            </v-col>
            <v-col cols="12 mt-1 py-1">
              <v-progress-linear
                :value="(pokemon.exp * 100) / pokemon.totalExp"
                height="25"
                rounded
              >
                <strong>{{ pokemon.exp }} / {{pokemon.totalExp}}</strong>
              </v-progress-linear>
            </v-col>
          </v-col>
          <v-col cols="2" class="d-flex px-0">
            <EnergyType 
              class="mx-1"
              v-for="type in pokemon.types"
              :key="type.slot"
              :image="resolveImage(type.type.name)"
              :type="type.type.name"
            />
          </v-col>
        </v-card>
      </v-col>
    <!-- </b-col> -->
    <b-col cols="12" class="my-3 game-font">
      <span class="ml-3 float-left">Integrantes del Equipo: {{ myTeam.length }} / 6 </span>
    </b-col>
    <b-col cols="12" class="my-3 game-font">
      <b-button  v-b-tooltip="{
        title: 'Enviar los datos de tu equipo ayuda a recolectar información y mostrarla en la sección de Estadísticas.',
        placement: 'bottom',
        customClass: 'left-0',
      }" @click="sendTeam" >Enviar mi equipo</b-button>
    </b-col>
  </b-row>

  <b-row class="pt-5 " v-else>
    <b-col cols="12 pt-5">
      <span class="btn-pokemon game-font">Tu equipo está vacio.</span>
    </b-col>
    <b-col cols="12 py-2">
      <b-button @click="$router.push('/')" class="btn-pokemon game-font" >Agregar Pokemons</b-button>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import EnergyType from '@/components/EnergyType'
import localData from '@/mixins/localData'
import resolveImage from '@/mixins/resolveImage'
export default {
  name: 'Team',
  data () {
    return {
      exp: 55,
      totalExp: 0
    }
  },
  computed: {
    myTeam () {
      return this.$store.state.myTeam
    }
  },
  components: {
    EnergyType
  },
  mixins: [localData, resolveImage],
  mounted () {
    this.getLocalStorageInfo()
  },
  methods: {
    sendTeam () {
      const team = this.myTeam
      if (team.length === 6) {
        // do  sarasa
      } else {
        return this.$notify({
          group: 'foo',
          type: 'error',
          title: 'Error',
          text: 'Tu equipo tiene que estar completo.'
        })
      }
    }
  }
}
</script>

<style scoped>
.text-black {
  color: #242424;
  font-size: 1rem;
  font-weight: 700;
}
#exp-span {
  font-size: 0.6rem;
}
.v-progress-linear {
  overflow: hidden;
  position: relative;
  color: white;
  transition: 0.2s cubic-bezier(0.4, 0, 0.6, 1);
  width: 100%;
  background: #2C64B4;
}
::v-deep .v-progress-linear__background {
    bottom: 0;
    left: 0;
    position: absolute;
    top: 0;
    background: rgb(236, 230, 230) !important;
    transition: inherit;
}
button.btn.btn-secondary {
  background-color: #2C64B4 !important;
  color: white !important;
}
button.btn.btn-secondary:hover {
  background-color: #2C64B4 !important;
  color: #242424 !important;
  opacity: 0.99;
}
::v-deep .pokemon-avatar.b-avatar-img {
  padding: 0.6rem !important;
  margin: 0rem !important;
  width: 100% ;
  height: 100%;
  object-fit: contain !important;
}
::v-deep .b-avatar .b-avatar-img img {
  object-fit: contain !important;
}
</style>