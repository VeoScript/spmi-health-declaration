<template>
  <v-footer padless style="background:#eee;">
    <v-col
      class="text-center mt-5"
      cols="12"
    >
      <p id="lblcopyright">©{{ new Date().getFullYear() }} Covid-19 Health Declaration, Specialty Pulp Manufacturing Inc.</p>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: 'FootBar',
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  })
}
</script>