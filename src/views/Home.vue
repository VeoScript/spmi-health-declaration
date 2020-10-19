<template>
  <div class="home" style="margin-bottom: 50px;">
    <nav-bar /> <!-- NAVIGATION LINKS --> 
    <v-main>
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