<template>
  <v-row>
    <v-col sm="5" md="5" cols="12">
      <v-card outlined>
        <v-card-title>Account</v-card-title>
        <v-card-subtitle>Main Information</v-card-subtitle>
        <v-divider></v-divider>
        <v-row class="mx-1 mt-2">
          <v-col sm="12" md="12" cols="12">
            <v-card outlined color="gray lighten-3" class="px-2 py-2">
              <div class="caption">Name</div>
              <div class="body-2 text-uppercase font-weight-bold">{{ `${user.firstname} ${user.middlename.split(' ').map(x => x[0].toUpperCase()).join('')}. ${user.lastname}` }}</div>
            </v-card>
          </v-col>
          <v-col sm="12" md="12" cols="12">
            <v-card outlined color="gray lighten-3" class="px-2 py-2">
              <div class="caption">Occupation</div>
              <div class="body-2 text-uppercase font-weight-bold">{{ `${user.occupation}` }}</div>
            </v-card>
          </v-col>
          <v-col sm="6" md="6" cols="12">
            <v-card outlined color="gray lighten-3" class="px-2 py-2">
              <div class="caption">Company</div>
              <div class="body-2 text-uppercase font-weight-bold">{{ `${user.company}` }}</div>
            </v-card>
          </v-col>
          <v-col sm="6" md="6" cols="12">
            <v-card outlined color="gray lighten-3" class="px-2 py-2">
              <div class="caption">Department</div>
              <div class="body-2 text-uppercase font-weight-bold">{{ `${user.department}` }}</div>
            </v-card>
          </v-col>
          <v-col sm="12" md="12" cols="12">
            <edit-main-information class="mr-1"/>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col sm="7" md="7" cols="12">
      <v-card outlined>
        <v-card-title>Other Information</v-card-title>
        <v-card-subtitle>Basic Information and User Account</v-card-subtitle>
        <v-divider></v-divider>
        <v-row class="mx-1 mt-2">
          <v-col sm="4" md="4" cols="12">
            <v-card outlined color="gray lighten-3" class="px-2 py-2">
              <div class="caption">Age</div>
              <div class="body-2 text-uppercase font-weight-bold">{{ `${user.age}` }}</div>
            </v-card>
          </v-col>
          <v-col sm="4" md="4" cols="12">
            <v-card outlined color="gray lighten-3" class="px-2 py-2">
              <div class="caption">Gender</div>
              <div class="body-2 text-uppercase font-weight-bold">{{ `${user.gender}` }}</div>
            </v-card>
          </v-col>
          <v-col sm="4" md="4" cols="12">
            <v-card outlined color="gray lighten-3" class="px-2 py-2">
              <div class="caption">Nationality</div>
              <div class="body-2 text-uppercase font-weight-bold">{{ `${user.nationality}` }}</div>
            </v-card>
          </v-col>
          <v-col sm="6" md="6" cols="12">
            <v-card outlined color="gray lighten-3" class="px-2 py-2">
              <div class="caption">Civil Status</div>
              <div class="body-2 text-uppercase font-weight-bold">{{ `${user.civil_status}` }}</div>
            </v-card>
          </v-col>
          <v-col sm="6" md="6" cols="12">
            <v-card outlined color="gray lighten-3" class="px-2 py-2">
              <div class="caption">Contact Number</div>
              <div class="body-2 text-uppercase font-weight-bold">{{ `${user.contact_number}` }}</div>
            </v-card>
          </v-col>
          <v-col sm="6" md="6" cols="12">
            <v-card outlined color="gray lighten-3" class="px-2 py-2">
              <div class="caption">Email</div>
              <div class="body-2 font-weight-bold">{{ `${user.email}` }}</div>
            </v-card>
          </v-col>
          <v-col sm="6" md="6" cols="12">
            <v-card outlined color="gray lighten-3" class="px-2 py-2">
              <div class="caption">Address</div>
              <div class="body-2 font-weight-bold">{{ `${user.address}` }}</div>
            </v-card>
          </v-col>
          <v-col sm="12" md="12" cols="12" class="text-right">
            <v-btn outlined tile small color="success"><v-icon>mdi-pencil</v-icon> Edit</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'user-account',
    components: {
      EditMainInformation: () => import('./EditMainInformation.vue')
    },
    props: {
      user: {
        type: Object,
        required: true
      }
    }
  }
</script>