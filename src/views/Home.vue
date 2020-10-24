<template>
  <div class="home">
    <nav-bar /> <!-- NAVIGATION LINKS --> 
    <v-main>
      <v-container fluid>
        <router-view></router-view> <!-- DYNAMIC CONTENT -->
      </v-container>
      <v-divider class="mx-5"></v-divider>
      <foot-bar /> <!-- FOOTER BAR INFO -->
    </v-main> <!-- MAIN CONTENT -->  
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