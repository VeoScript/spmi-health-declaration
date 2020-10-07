<template>
  <v-app>
    <nav-bar/>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>  
    <back-to-top/>
    <foot-bar/>
  </v-app>
</template>

<script>
export default {
  components: {
    NavBar: () => import('@/components/NavBar'),
    FootBar: () => import('@/components/FootBar'),
    BackToTop: () => import('@/components/BackToTop')
  }
}
</script>

<style lang="scss" src="@/assets/css/app.scss"></style>
