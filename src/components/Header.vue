<template>
  <b-container class="px-0 rounded-header" >
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
  </b-container>
</template>

<script>
export default {
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  }
}
</script>

<style scoped>
li.align-right >>> .nav-link {
  margin-left: auto !important;
}
.no-padding >>> .nav-link {
  display: block;
  padding: 0px !important;
}
a.nav-link {
  color: white;
  font-size: 0.9rem !important;
}
.router-link-active {
  color: white;
  text-decoration-line: underline;
}
a.nav-link:hover {
  color: white;
  text-decoration-line: underline;
  transition: 2s;
}
.nav {
  left: 0px;
  height: 40px;
  background-color: #2C64B4;
  width: 100%;
  display: flex;
  justify-content: center;
  border-radius: 4rem;
}
.nav ul {
  margin: 0;
  padding: 0;
}
.nav ul li {
  margin: 0;
  padding: 0;
  float:left;
}
.nav ul li a {
  text-decoration: none;
  padding: 10px 20px;
  display: inline-block !important;
  color: #FFF;
  text-align: center;
  margin: 0;
}

</style>