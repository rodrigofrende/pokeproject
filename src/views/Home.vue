<template>
<b-container class="white-background">
  <b-row v-if="pokemonList.length > 0" data-app>
    <!-- <b-col cols="12" md="4" > -->
        <b-col cols="2" md="6" class="">
        </b-col>
        <b-col cols="2" class="pt-3 ">
          <v-btn icon class="float-right">
            <v-icon @click="filterFavs" :class="showFavs ? 'red' : ''">mdi-heart</v-icon>
          </v-btn>
        </b-col>
        <b-col cols="8" md="4" class="pt-3">
          <b-input-group size="sm" class="mb-2 game-font">
            <b-input-group-prepend is-text>
              <b-icon animation="" icon="search"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="search" v-model="filterValue" placeholder="Buscar Pokemon..."></b-form-input>
          </b-input-group>
        </b-col>
      <v-col
          v-for="pokemon in (isFilterActive ? filteredPokemonList : pokemonList)"
          :key="pokemon.id"
          cols="12"
          xl="2"
          lg="3"
          md="4"
          sm="6"
          xs="6"
        >
          <v-card :class="cardType(pokemon.types[0].type.name)">
            <PokemonCard 
              :pokemon="pokemon"
            />

            <v-card-actions>
              
            </v-card-actions>
          </v-card>
        </v-col>

      <v-dialog
        v-model="dialog"
        width="500"
      >
        <v-card>
          <v-card-title class="game-font">
            Crea tu Equipo
          </v-card-title>
          <v-card-text class="px-5 py-0">
            <p class="game-font">Tu equipo debe tener 6 integrantes, los podes agregar desde el boton + en la tarjeta de cada Pokemon.</p>
            <p class="game-font">Al agregar un Pokemon a tu equipo tenés 10% de probabilidades de que éste sea SHINY . Podes modificar tu equipo en todo momento, pero recordá que solo podes enviarlo 3 veces.</p>
            <p class="game-font">Enviar los datos de tu equipo ayuda a que la aplicación crezca y cuente con más datos para mostrar en la sección de Estadísticas .</p>
          </v-card-text>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              class="game-font"
              @click="closeDialog"
            >
              Entendido!
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    <!-- </b-col> -->
  </b-row>
  
  <b-row class="pt-5 " v-else>
    <b-col cols="12 py-5">
      <span class="game-font">Cargando...</span>
    </b-col>
  </b-row>

  <NewUserModal @close="closeNewUserModal" :show="showNewUserModal" />
</b-container>
</template>

<script>
  import NewUserModal from '@/components/NewUserModal'
  import PokemonCard from '@/components/PokemonCard'
  import localData from '@/mixins/localData'
  export default {
    name: 'Home',
    components: {
      PokemonCard,
      NewUserModal
    },
    mixins: [localData],
    data: () => ({
      dialog: false,
      showNewUserModal: false,
      showFavs: false,
      value: 50,
      filteredPokemonList: [],
      isFilterActive: false,
      filterValue: '',
      attrs: {
        class: 'mb-6',
        align: 'center',
        boilerplate: true,
        elevation: 2,
      },
    }),
    async mounted () {
      await this.$store.dispatch('getListOfPokemons')
      this.getLocalStorageInfo()
    },
    computed: {
      isNewUser () {
        return this.$store.state.isNewUser
      },
      pokemonList () {
        return this.$store.state.pokemonDataList
      },
      myFavs() {
        return this.$store.state.myFavs
      }
    },
    watch: {
      isNewUser (val) {
        if (val === true) {
          this.showNewUserModal = true
        }
      },
      filterValue (val) {
        if (val !== '') {
          this.isFilterActive = true
          this.filteredPokemonList = 
           this.showFavs ? this.myFavs.filter(x => x.name.toLowerCase().includes(val.toLowerCase())) : 
           this.pokemonList.filter(x => x.name.toLowerCase().includes(val.toLowerCase()))
        } else {
          if (!this.showFavs) {
            this.isFilterActive = false
          }
          this.filteredPokemonList = 
            this.showFavs ? this.myFavs.filter(x => x.name.toLowerCase().includes(val.toLowerCase())) :
            []
        }
      }
    },
    methods: {
      closeNewUserModal () {
        this.showNewUserModal = false
        this.dialog = true
      },
      closeDialog () {
        this.dialog = false
      },
      filterFavs () {
        this.showFavs = !this.showFavs
        if (this.showFavs) {
          this.isFilterActive = true
          const myFavs = this.myFavs
          var result = this.pokemonList.filter(function (o1) {
              return myFavs.some(function (o2) {
                  return o1.id === o2.id // return the ones with equal id
            })
          })
          this.filteredPokemonList = result
        } else {
          this.isFilterActive = false
        }
      },
      cardType (type) {
        switch (type) {
          case 'fire':
            return 'card-background fire'
          case 'water':
            return 'card-background water'
          case 'grass':
            return 'card-background grass'
          case 'psychic':
            return 'card-background psychic'
          case 'ghost':
            return 'card-background psychic'
          case 'dragon':
            return 'card-background dragon'
          case 'electric':
            return 'card-background electric'
          case 'bug':
            return 'card-background bug'
          case 'poison':
            return 'card-background bug'
          case 'ground':
            return 'card-background ground'
          case 'fighting':
            return 'card-background ground'
          case 'rock':
            return 'card-background ground'
          case 'normal':
            return 'card-background normal'
          case 'ice': 
            return 'card-background ice'
          case 'fairy':
            return 'card-background fairy'
          default:
            break;
        }
      }
    }
  }
</script>
<style scoped>
.card-background {
  border: 5px solid rgb(230, 230, 22) !important;
}
.card-background.fairy {
  background: rgb(106,39,100);
  background: -moz-linear-gradient(0deg, rgba(106,39,100,1) 0%, rgba(203,83,190,1) 100%);
  background: -webkit-linear-gradient(0deg, rgba(106,39,100,1) 0%, rgba(203,83,190,1) 100%);
  background: linear-gradient(0deg, rgba(106,39,100,1) 0%, rgba(203,83,190,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#6a2764",endColorstr="#cb53be",GradientType=1);
}
.card-background.ice {
  background: rgb(24,61,98);
  background: -moz-linear-gradient(0deg, rgba(24,61,98,1) 0%, rgba(4,136,227,1) 100%);
  background: -webkit-linear-gradient(0deg, rgba(24,61,98,1) 0%, rgba(4,136,227,1) 100%);
  background: linear-gradient(0deg, rgba(24,61,98,1) 0%, rgba(4,136,227,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#183d62",endColorstr="#0488e3",GradientType=1);
}
.card-background.ground {
  background: rgb(91,63,17);
  background: -moz-linear-gradient(0deg, rgba(91,63,17,1) 0%, rgba(187,116,0,1) 100%);
  background: -webkit-linear-gradient(0deg, rgba(91,63,17,1) 0%, rgba(187,116,0,1) 100%);
  background: linear-gradient(0deg, rgba(91,63,17,1) 0%, rgba(187,116,0,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#5b3f11",endColorstr="#bb7400",GradientType=1);
}
.card-background.normal {
  background: rgb(205,205,205);
  background: -moz-linear-gradient(0deg, rgba(205,205,205,1) 0%, rgba(121,121,121,1) 100%);
  background: -webkit-linear-gradient(0deg, rgba(205,205,205,1) 0%, rgba(121,121,121,1) 100%);
  background: linear-gradient(0deg, rgba(205,205,205,1) 0%, rgba(121,121,121,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#cdcdcd",endColorstr="#797979",GradientType=1);
}
.card-background.bug {
  background: rgb(108,134,38);
  background: -moz-linear-gradient(0deg, rgba(108,134,38,0.7572071064754027) 0%, rgba(125,159,17,1) 100%);
  background: -webkit-linear-gradient(0deg, rgba(108,134,38,0.7572071064754027) 0%, rgba(125,159,17,1) 100%);
  background: linear-gradient(0deg, rgba(108,134,38,0.7572071064754027) 0%, rgba(125,159,17,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#6c8626",endColorstr="#7d9f11",GradientType=1);
}
.card-background.psychic {
  background: rgb(237,86,247);
  background: -moz-linear-gradient(0deg, rgba(237,86,247,0.8720530448507529) 0%, rgba(112,27,99,1) 100%);
  background: -webkit-linear-gradient(0deg, rgba(237,86,247,0.8720530448507529) 0%, rgba(112,27,99,1) 100%);
  background: linear-gradient(0deg, rgba(237,86,247,0.8720530448507529) 0%, rgba(112,27,99,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ed56f7",endColorstr="#701b63",GradientType=1);
}

.card-background.electric {
  background: rgb(170,159,33);
  background: -moz-linear-gradient(0deg, rgba(170,159,33,0.7572071064754027) 0%, rgba(224,228,20,1) 100%);
  background: -webkit-linear-gradient(0deg, rgba(170,159,33,0.7572071064754027) 0%, rgba(224,228,20,1) 100%);
  background: linear-gradient(0deg, rgba(170,159,33,0.7572071064754027) 0%, rgba(224,228,20,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#aa9f21",endColorstr="#e0e414",GradientType=1);
}
.card-background.fire {
  background: rgb(253,159,45);
  background: -moz-linear-gradient(0deg, rgba(253,159,45,1) 0%, rgba(215,19,19,0.8720530448507529) 100%);
  background: -webkit-linear-gradient(0deg, rgba(253,159,45,1) 0%, rgba(215,19,19,0.8720530448507529) 100%);
  background: linear-gradient(0deg, rgba(253,159,45,1) 0%, rgba(215,19,19,0.8720530448507529) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#fd9f2d",endColorstr="#d71313",GradientType=1);
}
.card-background.water {
  background: rgb(86,204,247);
  background: -moz-linear-gradient(0deg, rgba(86,204,247,0.8720530448507529) 0%, rgba(8,59,252,1) 100%);
  background: -webkit-linear-gradient(0deg, rgba(86,204,247,0.8720530448507529) 0%, rgba(8,59,252,1) 100%);
  background: linear-gradient(0deg, rgba(86,204,247,0.8720530448507529) 0%, rgba(8,59,252,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#56ccf7",endColorstr="#083bfc",GradientType=1);
}
.card-background.grass {
  background: rgb(86,247,126);
  background: -moz-linear-gradient(0deg, rgba(86,247,126,0.8720530448507529) 0%, rgba(27,112,41,1) 100%);
  background: -webkit-linear-gradient(0deg, rgba(86,247,126,0.8720530448507529) 0%, rgba(27,112,41,1) 100%);
  background: linear-gradient(0deg, rgba(86,247,126,0.8720530448507529) 0%, rgba(27,112,41,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#56f77e",endColorstr="#1b7029",GradientType=1);
}
.card-background.dragon {
  background: rgb(94,75,94);
  background: -moz-linear-gradient(0deg, rgba(94,75,94,0.7572071064754027) 0%, rgba(64,56,64,1) 100%);
  background: -webkit-linear-gradient(0deg, rgba(94,75,94,0.7572071064754027) 0%, rgba(64,56,64,1) 100%);
  background: linear-gradient(0deg, rgba(94,75,94,0.7572071064754027) 0%, rgba(64,56,64,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#5e4b5e",endColorstr="#403840",GradientType=1);
}
.mdi-heart.red {
  color: red !important;
}
.mdi-information:hover {
  color: rgba(0, 0, 0, 0.897) !important;
}
.mdi-heart.red:hover {
  color: rgba(168, 6, 6, 0.39) !important;
}
button.btn.btn-secondary {
  background-color: #2C64B4 !important;
  color: white !important;
}
button.btn.btn-secondary:hover:not(.disabled) {
  background-color: #2C64B4 !important;
  color: #242424 !important;
  opacity: 0.99;
}
</style>
