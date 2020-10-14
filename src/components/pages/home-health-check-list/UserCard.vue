<template>
  <div class="user-card">
    <v-row>
      <v-col cols="12" md="6">
        <v-card-title>
          {{ `${user.firstname} ${user.middlename.split(' ').map(x => x[0].toUpperCase()).join('')}. ${user.lastname}` }}
        </v-card-title>
        <v-card-subtitle>
          <strong>{{ `${user.company}` }}</strong> - {{ `${user.occupation}` }}
        </v-card-subtitle>
      </v-col>
      <v-col cols="12" md="6">
        <slot name="purpose"></slot>
      </v-col>
    </v-row>
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