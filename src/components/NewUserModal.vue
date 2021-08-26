<template>
  <div>
    <b-modal
      no-close-on-esc
      no-close-on-backdrop
      @close="close"
      centered
      hide-footer
      v-model="show"
      size="md"
      id="modalPokemon"
    >
      <template #modal-header="{}">
        <div>
          <h5 class="text-capitalize">Hola!</h5>
        </div>
      </template>
      <b-row >
        <b-col>
          <b-form-input class="d-inline" v-model="userName" placeholder="Ingresa tu nombre..."></b-form-input>
          <b-button class="mt-3 float-right" :disabled="!userName.length > 0" @click="saveName" >Confirmar</b-button>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import { getSubmittedNames, postNewUser } from '@/services/Firebase/firebase'
export default {
  data () {
    return {
      userName: '',
      submittedNames: []
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  async mounted () {
    this.submittedNames = await getSubmittedNames()
  },
  methods: {
    close () {
      this.$emit('close')
    },
    async saveName () {
      var validName = true
      this.submittedNames.forEach(item => {
        if (item.name.toLowerCase() === this.userName.toLowerCase()) {
          validName = false
        }
      });
      if (!validName) {
        return this.$notify({
          group: "foo",
          type: "error",
          title: "Error",
          text:
            this.userName +
            " ya se encuentra en uso. Elegí otro nombre",
        });
      } else {
        this.$store.dispatch('setNewUserName', this.userName)
        await postNewUser(this.userName)
        this.close()
        return this.$notify({
          group: "foo",
          type: "info",
          title: "Bienvenido " + this.userName + " !",
        });
      }
    }
  }
};
</script>

<style scoped>
.close {
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC) 14 0,pointer !important;
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
.disabled {
  cursor: not-allowed;
}
</style>