<template>
  <div class="home">
    <nav-bar /> <!-- NAVIGATION LINKS --> 
    <v-main class="main">
      <v-container fluid>
        <router-view
        ></router-view> <!-- DYNAMIC CONTENT -->
      </v-container>
    </v-main> <!-- MAIN CONTENT -->  
    <foot-bar /> <!-- FOOTER BAR INFO -->
  </div>
</template>

<script>
  export default {
    components: {
      NavBar: () => import('@/components/layouts/NavBar'),
      FootBar: () => import('@/components/layouts/FootBar'),
    }
  }
</script>

<style scoped>
.main {
  background: #F6F7FB !important;
}
</style>