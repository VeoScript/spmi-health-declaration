<template>
  <v-app>
    <router-view></router-view>
    <scroll-to-top/>
  </v-app>
</template>

<script>
export default {
  components: {
    ScrollToTop: () => import('@/components/mixins/ScrollToTop')
  }
}
</script>

<style lang="scss" src="@/assets/css/app.scss"></style>
