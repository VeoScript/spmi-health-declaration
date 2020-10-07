<template>
  <v-app>
    <nav-bar/>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>  
    <foot-bar/>
    <scroll-to-top/>
  </v-app>
</template>

<script>
export default {
  components: {
    NavBar: () => import('@/components/NavBar'),
    FootBar: () => import('@/components/FootBar'),
    ScrollToTop: () => import('@/components/ScrollToTop')
  }
}
</script>

<style lang="scss" src="@/assets/css/app.scss"></style>
