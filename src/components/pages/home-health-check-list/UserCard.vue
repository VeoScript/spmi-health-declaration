<template>
  <div class="user-card">
    <v-card 
      flat
      class="mt-4"
    >
      <v-card-title class="e_name">
        {{ `${user.firstname} ${user.middlename} ${user.lastname}` }}
      </v-card-title>
      <v-card-subtitle class="e_com"><strong>
        {{ `${user.company}` }}</strong> - {{ `${user.occupation}` }}
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: 'user-card',
    props: {
      user: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user-card{
    .e_name{
      font-size: 25px;
      font-weight: bolder;
      font-variant-caps: all-petite-caps;
    }
    .e_com{
      font-size: 18px;
      font-variant-caps: all-petite-caps;
    }
  }
</style>