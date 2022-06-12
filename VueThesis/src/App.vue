<script>
  import Navbar from './components/Navbar.vue'
  import Footer from './components/Footer.vue'
  export default {
    components: {
      Navbar,
      Footer
    },
  }

</script>
<template>
  <Navbar/>
  <router-view :key="$route.fullPath"/>
  <Footer/>
</template>

<style>
#app {
  font-family : Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing : antialiased;
  -moz-osx-font-smoothing : grayscale;
  text-align : center;
  color : #2c3e50;
  /* margin-top: 60px; */
}
</style>