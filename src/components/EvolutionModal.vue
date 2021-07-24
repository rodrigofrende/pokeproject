<template>
  <div>
    <b-modal
      no-close-on-esc
      no-close-on-backdrop
      @close="close"
      centered
      hide-footer
      v-model="show"
      size="lg"
      id="modalPokemon"
    >
      <template #modal-header="{}">
        <div>
          <h5 class="text-capitalize">Evolucionar A {{pokemon.name}}</h5>
        </div>
        <button
          type="button"
          @click="close"
          aria-label="Close"
          class="close ml-auto"
        >
          ×
        </button>
      </template>
      <v-row>
        <v-col xl="5" lg="5" md="5" sm="12" xs="12">
          old pokemon
        </v-col>
        <v-col xl="2" lg="2" md="2" sm="12" xs="12">
          =>
        </v-col>
        <v-col xl="5" lg="5" md="5" sm="12" xs="12">
          new pokemon
        </v-col>
      </v-row>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "PokemonModal",
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    pokemon: {
      type: Object,
    },
  },
  data() {
    return {
      modalData: [],
      e6: 1,
    };
  },
  methods: {
    close() {
      this.$emit("closeModal");
    },
    async loadModalData(url) {},
  },
  watch: {
    async show(val) {
      if (val === true) {
      }
    },
  },
};
</script>

<style scoped>
::v-deep #modalPokemon___BV_modal_title_ {
  text-transform: capitalize !important;
}

::v-deep .close {
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer !important;
}
</style>