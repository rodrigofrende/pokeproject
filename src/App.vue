<template>
  <div id="app" class="black-background mh-100 px-0">
    <div class="px-3">
      <Header class="py-2"/>
      <router-view />
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header'
export default {
  components: {
    Header
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.black-background {
  min-height: 100vh !important;
  background: #242424 !important;
}

#nav {
  padding: 30px;
}
</style>
