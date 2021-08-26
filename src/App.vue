<template>
  <div id="app" class="black-background mh-100 px-0">
    <div class="px-3">
      <Header class="py-2"/>
      <router-view />
    </div>
    <v-btn
      v-if="currentRouteName !== 'Team'"
      class="floating-button"
      elevation="2"
      fab
      href="#"
    ><img src="@/assets/pokeball.png" height="40px" width="40px" alt="pokeball"></v-btn>
    <notifications width="500px" :closeOnClick="true" position="bottom right" group="foo" />
  </div>
</template>
<script>
import Header from '@/components/Header'
export default {
  components: {
    Header
  },
  computed: {
    currentRouteName() {
      console.log(this.$route.name)
      return this.$route.name;
    }
  }
}
</script>


<style lang="scss">
html {
  scroll-behavior: smooth;
}
.floating-button {
  position: fixed !important;
  bottom: 10vh !important;
  right: 5vw !important;
  z-index: 1 !important;
}
.modal-open {
  padding-right: 0px !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.btn-pokemon {
  background-color: #2C64B4 !important;
  color: white !important;
}
.btn-pokemon:hover {
  background-color: #2C64B4 !important;
  color: #242424 !important;
  opacity: 0.99;
}
.white-background {
  background-color: #fff !important;
  border-radius: 2rem;
  height: fit-content;
  min-height: 90vh;
  padding: 1.5rem 3rem;
}
.black-background {
  min-height: 100vh !important;
  background: #242424 !important;
}

#nav {
  padding: 30px;
}
.vue-notification {
  padding: 1.5rem !important;
  margin: 1rem 10px 10px !important;
  max-width: 80%;
 
  color: #ffffff;
  background: #44A4FC;
  border-left: 5px solid #187FE7;
 
  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }
 
  &.error {
    background: #E54D42;
    border-left-color: #B82E24;
  }
 
  &.success {
    background: #68CD86;
    border-left-color: #42A85F;
  }
}
</style>
