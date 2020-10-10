<template>
  <div class="home mt-4">
    <nav-bar/>
      <v-main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-main>  
      <foot-bar/>
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
