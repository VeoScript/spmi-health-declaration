<template>
  <div class="user-card">
    <v-row>
      <v-col cols="12" md="6">
        <v-card-title>
          {{ getFullanme }}
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
    },
    computed: {
      getFullanme () {
        let { firstname, middlename, lastname } = this.user
        return `${firstname.charAt(0).toUpperCase() + firstname.slice(1)} 
                ${middlename ? middlename.split(' ').map(x => x[0].toUpperCase()).join('') + '.' : ''} 
                ${lastname.charAt(0).toUpperCase() + lastname.slice(1)}`
      }
    }
  }
</script>