<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="7" sm="7">
        <user-result />
      </v-col>
      <v-divider vertical inset></v-divider>
      <v-col cols="12" md="4" sm="7">
        <user-profile />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    components: {
      UserProfile: () => import('./UserProfile'),
      UserResult: () => import('./UserResult')
    }
  }
</script>