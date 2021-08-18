<template>
  <!-- <b-container class="px-0 rounded-header" >
    <b-nav align="center" class="game-font">
      <b-nav-item to="/" v-b-tooltip="{
          title: 'Inicio',
          placement: 'left',
        }" class="mx-2 no-padding">
        <img src="@/assets/pokeball.png" height="40px" width="40px" alt="pokeball">
      </b-nav-item>
      <b-nav-item class="px-2" to="/MyTeam" >Mi Equipo</b-nav-item>
      <b-nav-item class="px-2" >Acerca de</b-nav-item>
    </b-nav>
  </b-container> -->
  <div>
    <b-navbar class="pokemon-nav py-0" toggleable="lg">
      <b-navbar-brand class="" href="#">
        <img src="@/assets/pokeball.png" height="40px" width="40px" alt="pokeball">
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item @click="gotoHome" href="#">Inicio</b-nav-item>
          <b-nav-item class="px-2" to="/MyTeam" >Mi Equipo</b-nav-item>
          <b-nav-item class="px-2" v-b-tooltip="{
            title: 'En desarrollo!',
            placement: 'right',
          }" disabled>Estadisticas</b-nav-item>
          <b-nav-item class="px-2" v-b-tooltip="{
            title: 'En desarrollo!',
            placement: 'right',
          }" disabled>Acerca de</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  },
  methods: {
    gotoHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.pokemon-nav {
  background-color: #2C64B4;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  margin: 0 20px;
}
.pokemon-nav >>> a.nav-link {
  color: white;
  font-family: 'Press Start 2P';
  font-size: 0.7rem;
}
.pokemon-nav >>> a.nav-link.active {
  text-decoration: underline;
}
.pokemon-nav >>> a.navbar-brand {
  font-family: 'Press Start 2P';
  font-size: 0.7rem;
  cursor: auto;
}
</style>