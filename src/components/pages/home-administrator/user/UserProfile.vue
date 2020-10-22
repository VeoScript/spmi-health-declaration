<template>
  <v-card flat>
    <v-row justify="center" align="center" class="mx-3">
      <v-avatar
        size="100"
        class="custom-avatar"
      >
        <v-img :src="getDefaultUserProfile"></v-img>
      </v-avatar>
      <v-row align="center" justify="center">
        <v-card flat class="ml-4 justify-center">
          <v-card-title class="text-uppercase font-weight-bold justify-center">
            {{ getFulname }}
          </v-card-title>
          <v-card-subtitle>
            <span class="text-uppercase justify-center">{{ user.company }}</span> - {{ user.occupation }}
          </v-card-subtitle>
        </v-card>
      </v-row>
    </v-row>
    <v-card flat>
      <v-card-title class="subtitle-2">
        Age: <span class="ml-2 primary--text font-weight-bold">{{ getUserAge }}</span>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-card-title class="subtitle-2">
        Gender: <span class="ml-2 primary--text font-weight-bold">{{ user.gender }}</span>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-card-title class="subtitle-2">
        Civil Status: <span class="ml-2 primary--text font-weight-bold">{{ user.civil_status }}</span>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-card-title class="subtitle-2">
        Birthday: <span class="ml-2 primary--text font-weight-bold">{{ getUserFormattedBirthDate }}</span>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-card-title class="subtitle-2">
        Email: <span class="ml-2 primary--text font-weight-bold">{{ user.email }}</span>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-card-title class="subtitle-2">
        Company: <span class="ml-2 primary--text font-weight-bold text-uppercase">{{ user.company }}</span>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-card-title class="subtitle-2">
        Department: <span class="ml-2 primary--text font-weight-bold">{{ user.department }}</span>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-card-title class="subtitle-2">
        Nationality: <span class="ml-2 primary--text font-weight-bold">{{ user.nationality }}</span>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-card-title class="subtitle-2">
        Occupation: <span class="ml-2 primary--text font-weight-bold">{{ user.occupation }}</span>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-card-title class="subtitle-2">
        Current Address: <span class="ml-2 primary--text font-weight-bold">{{ user.address }}</span>
      </v-card-title>
    </v-card>
  </v-card>
</template>

<script>
  import moment from 'moment'
  export default {
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    computed: {
      getFulname () {
        let { firstname, middlename, lastname } = this.user
        return `${firstname} ${middlename.split(' ').map(x => x[0].toUpperCase()).join('')}. ${lastname}`
      },
      getDefaultUserProfile () {
        let { gender } = this.user
        return gender === 'Male' ? require('@/assets/imgs/male.jpg') : require('@/assets/imgs/female.jpg')
      },
      getUserAge () {
        let { birthday } = this.user
        let today = new Date()
        let birthDate = new Date(birthday)
        var age = today.getFullYear() - birthDate.getFullYear()
        let m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age
      },
      getUserFormattedBirthDate () {
        let { birthday } = this.user
        return moment(String(birthday)).format('MMMM DD, YYYY')
      }
    }
  }
</script>

<style scoped>
  .custom-avatar {
    border: 1px solid lightgray;
  }
</style>