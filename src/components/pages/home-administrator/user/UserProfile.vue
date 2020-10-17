<template>
  <v-card flat style="min-height: 80vh;">
    <v-row justify="center">
      <v-avatar
        size="120"
        class="custom-avatar"
      >
        <v-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRF9EPMJydmM1ovfcplqvXM0zzDjr7XoPFeQg&usqp=CAU"></v-img>
      </v-avatar>
      <div class="mt-3">
        <v-card-title class="text-uppercase font-weight-bold">
          Joshua A. Galit
        </v-card-title>
        <v-card-subtitle>
          SPMI - Web/Developer
        </v-card-subtitle>
      </div>
    </v-row>
    <v-divider class="mt-5 mx-4"></v-divider>
    <v-card flat>
      <v-card-title class="subtitle-2">
        Age: <span class="ml-2 primary--text font-weight-bold">21</span>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-card-title class="subtitle-2">
      Gender: <span class="ml-2 primary--text font-weight-bold">Male</span>
    </v-card-title>
    <v-divider class="mx-4"></v-divider>
    <v-card-title class="subtitle-2">
      Civil Status: <span class="ml-2 primary--text font-weight-bold">Single</span>
    </v-card-title>
    <v-divider class="mx-4"></v-divider>
    <v-card-title class="subtitle-2">
      Email: <span class="ml-2 primary--text font-weight-bold">joshuimalay@gmial.com</span>
    </v-card-title>
    <v-divider class="mx-4"></v-divider>
    <v-card-title class="subtitle-2">
      Company: <span class="ml-2 primary--text font-weight-bold">SPMI</span>
    </v-card-title>
    <v-divider class="mx-4"></v-divider>
    <v-card-title class="subtitle-2">
      Department: <span class="ml-2 primary--text font-weight-bold">OPM</span>
    </v-card-title>
    <v-divider class="mx-4"></v-divider>
    <v-card-title class="subtitle-2">
      Nationality: <span class="ml-2 primary--text font-weight-bold">Philippine, Filipino</span>
    </v-card-title>
    <v-divider class="mx-4"></v-divider>
    <v-card-title class="subtitle-2">
      Occupation: <span class="ml-2 primary--text font-weight-bold">Web developer/Video Editor</span>
    </v-card-title>
    <v-divider class="mx-4"></v-divider>
    </v-card>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        
      }
    }
  }
</script>

<style scoped>
  .custom-avatar {
    border: 1px solid lightgray;
  }
</style>