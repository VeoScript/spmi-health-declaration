<template>
  <v-app>
    <router-view></router-view>
    <scroll-to-top/>
  </v-app>
</template>

<script>
export default {
  components: {
    ScrollToTop: () => import('@/components/ScrollToTop')
  }
}
</script>

<style lang="scss" src="@/assets/css/app.scss"></style>
