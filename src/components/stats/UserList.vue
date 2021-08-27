<template>
<b-container>
  <h5 class="game-font pt-1 pb-3">Usuarios que colaboraron con ésta pagina: </h5>
  <label v-for="user in users" :key="user.name">
    <span class="mx-3 game-font wall-name" v-b-tooltip="{
        title: user.name + ' gracias por contribuir!',
        placement: 'bottom',
        customClass: 'mt-2',
      }"> 
      {{user.name}}
    </span>
  </label>
</b-container>
</template>

<script>
export default {
  props: {
    users: {
      type: Array
    }
  }
}
</script>

<style scoped>
.wall-name {
  font-size: 0.8rem;
  border: 1px solid darkslategrey;
  border-radius: 1rem;
  padding: 6px 10px;
  flex-grow: initial;
  flex-shrink: initial;
}
.wall-name:hover {
  transition-duration: 0.2s;
  font-size: 0.9rem;
}

@media only screen and (max-width: 600px) {
  .wall-name {
    font-size: 0.6rem;
    margin-left: 0.5rem !important;
    margin-right: 0.5rem !important;
  }
  .wall-name:hover {
    font-size: 0.75rem;
  }
}
</style>