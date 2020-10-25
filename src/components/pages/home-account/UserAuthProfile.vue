<template>
  <v-row align="center" justify="center">
    <v-avatar
      size="100"
      style="border: 2px solid #eee;"
    >
      <v-img :src="getDefaultUserProfile"></v-img>
    </v-avatar>
    <v-card flat class="ml-2 justify-center">
      <v-card-title class="text-uppercase font-weight-bold justify-left">
        {{ getFullname }}
      </v-card-title>
      <v-card-subtitle>
        <v-btn depressed small class="text-capitalize" text outlined>
          Edit Auth
        </v-btn>
      </v-card-subtitle>
    </v-card>
  </v-row>
</template>

<script>
  export default {
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    computed: {
      getFullname () {
        let { firstname, middlename, lastname } = this.user
        return `${firstname} ${middlename.split(' ').map(x => x[0].toUpperCase()).join('')}. ${lastname}`
      },
      getDefaultUserProfile () {
        let { gender } = this.user
        return gender === 'Male' ? require('@/assets/imgs/male.jpg') : require('@/assets/imgs/female.jpg')
      }
    }
  }
</script>