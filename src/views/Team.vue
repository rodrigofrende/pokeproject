<template>
<b-container class="white-background"  data-app>
  <b-row v-if="myTeam.length > 0">
    <!-- <b-col cols="12" md="4" > -->
      <v-col
        cols="12"
        xl="6"
        lg="6"
        md="6"
        sm="10 mx-auto"
        v-for="pokemon in myTeam"
        :key="pokemon.id"
      >
        <v-card class="d-flex pokemon-card mx-1">
          <v-col cols="4" class="px-0">
            <b-avatar class="pokemon-avatar bg-transparent" square size="6rem" :src="pokemon.isShiny ? pokemon.sprites.versions['generation-v']['black-white'].animated.front_shiny : pokemon.sprites.versions['generation-v']['black-white'].animated.front_default" />
          </v-col>
          <v-col cols="6 my-auto" class="px-0">
            <v-col cols="12" class="my-1 mt-auto py-0">
              <span class="float-left text-capitalize game-font">{{pokemon.name}}</span>
            </v-col>
            <v-col cols="12 d-flex">
              <span class="float-left text-capitalize game-font my-auto">Tipo:</span>
              <EnergyType 
                class="mx-1"
                v-for="type in pokemon.types"
                size="1.5rem"
                :key="type.slot"
                :image="resolveImage(type.type.name)"
                :type="type.type.name"
              />
            </v-col>
          </v-col>
          <v-col cols="2" class="">
            <v-btn icon class="mx-auto my-auto" >
              <v-icon :class="isFaved(pokemon.id) ? 'red' : ''" v-b-tooltip="{
                title: 'Favorito',
                placement: 'left',
                customClass: 'left-0',
              }"
              @click="removeFav(pokemon)"
              >mdi-heart</v-icon>
            </v-btn>
            <v-btn icon class="mx-auto my-auto">
              <v-icon class="mx-auto my-auto" v-b-tooltip="{
                title: 'Remover',
                placement: 'left',
                customClass: 'left-0',
              }"
              @click="remove(pokemon)"
                >mdi-minus-circle</v-icon
              >
            </v-btn>
            <div>
              <v-icon v-if="pokemon.isShiny" v-b-tooltip="{
                title: 'Felicidades! es Shiny',
                placement: 'left',
                customClass: 'left-0',
              }" class="mx-auto my-auto shiny"
                >mdi-alpha-s-circle</v-icon
              >
              <v-icon v-else class="mx-auto my-auto" v-b-tooltip="{
                title: 'Not Shiny :(',
                placement: 'left',
                customClass: 'left-0',
              }"
                >mdi-alpha-s-circle</v-icon
              >
            </div>
          </v-col>
        </v-card>
      </v-col>
    <!-- </b-col> -->
    <v-col cols="12" class="my-3 game-font mx-auto">
      <span class="">Integrantes del Equipo: {{ myTeam.length }} / 6 </span>
    </v-col>
    <b-col cols="12" class="my-3 game-font">
      <b-button  v-b-tooltip="{
        title: 'Enviar los datos de tu equipo ayuda a recolectar información y mostrarla en la sección de Estadísticas.',
        placement: 'bottom',
        customClass: 'left-0',
      }" @click="sendTeam" 
      :disabled="teamSended"
      >Enviar mi equipo</b-button>
    </b-col>
  </b-row>

  <b-row class="pt-5 " v-else>
    <b-col cols="12 pt-5">
      <span class="btn-pokemon game-font">Tu equipo está vacio.</span>
    </b-col>
    <b-col cols="12 py-2">
      <v-dialog
        v-model="dialog"
        width="500"
      >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="btn-pokemon game-font"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Agregar Pokemons
        </v-btn>
      </template>
        <v-card>
          <v-card-title class="game-font">
            Crea tu Equipo
          </v-card-title>
          <v-card-text class="px-5 py-0">
            <p class="game-font">Al agregar un Pokemon a tu equipo tenés 10% de probabilidades de que éste sea SHINY . Podes modificar tu equipo en todo momento, pero recordá que una vez saques al Pokemon todo el progreso que hayas tenido con el se va a perder.</p>
            <p class="game-font">Además tenes la opción de enviar los datos de tu equipo, esto ayuda a que la aplicación crezca y cuenta con la información .</p>
          </v-card-text>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              class="game-font"
              @click="goHome"
            >
              Entendido!
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import EnergyType from '@/components/EnergyType'
// mixins
import localData from '@/mixins/localData'
import resolveImage from '@/mixins/resolveImage'
import confirmation from '@/mixins/confirmation'
// services
import { postMyTeam } from '@/services/Firebase/firebase'
export default {
  name: 'Team',
  data () {
    return {
      teamSended: false,
      dialog: false,
      exp: 55,
      totalExp: 0,
      selectedPokemon: null
    }
  },
  computed: {
    myTeam () {
      return this.$store.state.myTeam
    },
    userData () {
      return this.$store.state.userData
    },
    myFavs() {
      return this.$store.state.myFavs;
    },
  },
  components: {
    EnergyType
  },
  mixins: [localData, resolveImage, confirmation],
  async mounted () {
    await this.getLocalStorageInfo()
  },
  methods: {
    removeFav(pokemon) {
      var index = this.myFavs
        .map((x) => {
          return x.id;
        })
        .indexOf(pokemon.id);
      if (index > 0) {
        this.myFavs.splice(index, 1);
        this.$store.dispatch('removeOfMyFavs', pokemon)
        return this.$notify({
          group: "foo",
          type: "info",
          title: "Info",
          text:
            pokemon.name.charAt(0).toUpperCase() +
            pokemon.name.slice(1) +
            " fue removido de tus favoritos.",
        });
      } else {
        this.$store.dispatch('addToMyFavs', pokemon)
        return this.$notify({
          group: "foo",
          type: "success",
          title: "Éxito !",
          text:
            pokemon.name.charAt(0).toUpperCase() +
            pokemon.name.slice(1) +
            " fue agregado de tus favoritos.",
        });
      }
    },
    isFaved(id) {
      const isAdded = this.myFavs.find((x) => x.id === id);
      return isAdded;
    },
    async remove (pokemon) {
        const body = ({
          text: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} va a ser removido de tu equipo`,
          cancelTitle: 'Cancelar',
          okTitle: 'Confirmar'
        })
        const confirm = await this.showConfirmationBox(body)

        if (confirm) {
          var index = this.myTeam
          .map((x) => {
            return x.id;
          })
          .indexOf(pokemon.id);

          this.myTeam.splice(index, 1)
          this.$store.dispatch('removeOfMyTeam', pokemon)
          return this.$notify({
            group: "foo",
            type: "info",
            title: "Info",
            text:
              pokemon.name.charAt(0).toUpperCase() +
              pokemon.name.slice(1) +
              " fue removido de tu equipo.",
          })
        } else {
          return
        }
    },
    async goHome () {
      this.dialog = false
      //todo: loader
      await this.$router.push('/')
    },
    async sendTeam () {
      const team = this.myTeam
      if (team.length === 6 && !this.teamSended) {
        this.teamSended = true
        await postMyTeam(team)
        return this.$notify({
          group: 'foo',
          type: 'success',
          title: 'Exito!',
          text: 'Tu equipo fue enviado'
        })
      } else {
        if (this.teamSended) {
          return this.$notify({
            group: 'foo',
            type: 'error',
            title: 'Error',
            text: 'Tu equipo ya fue enviado'
          })
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
}
</script>

<style scoped>
::v-deep .btn.btn-col.order-2:hover {
  order: 1;
  background-color: #2C64B4;
}
::v-deep .btn.btn-col.order-1:hover {
  order: 1;
  background-color: rgba(189, 22, 22, 0.842);
}
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
button.btn.btn-secondary:hover:not(.disabled) {
  background-color: #2C64B4 !important;
  color: #242424 !important;
  opacity: 0.99;
}
::v-deep .b-avatar .b-avatar-img img {
  object-fit: contain !important;
}
.mdi-timer-sand:hover {
  color: #242424 !important;
}
.mdi-heart.red {
  color: red !important;
}
.mdi-minus-circle:hover {
  color: rgb(189, 18, 18) !important;
  opacity: 0.8;
}
.mdi-heart:hover {
  color: rgb(189, 18, 18) !important;
  opacity: 0.8;
}
.mdi-alpha-s-circle.shiny {
  color: darkgoldenrod;
}
.pokemon-card:hover {
  box-shadow: 1px 1px 3px 1.5px rgb(81, 84, 92) !important;
}
</style>