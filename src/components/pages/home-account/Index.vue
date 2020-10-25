<style scoped>
  .account {
    min-height: 100vh;
  }
</style>

<template>
  <div class="account">
    
    <user-auth-profile
      v-for="(user, index) in users" 
      :key="index"
      :user="user"
    ></user-auth-profile> <!-- USER AUTHENTICATION WITH PROFILE -->
  
    <v-row align="center" justify="center">
      <v-col cols="12">
        
        <user-details :users="users">
          <template #user-title>
            <div class="gray--text text-uppercase font-weight-bold">
              Personal Details
            </div>
          </template>
          <template #user-text-fields="{ user }">
            <v-row align="center" justify="center" class="mb-3">
              <v-col cols="12" md="3">
                <v-text-field
                  label="Firstname"
                  outlined
                  class="rounded-sm"
                  v-model="user.firstname"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  label="Middlename"
                  outlined
                  class="rounded-sm"
                  v-model="user.middlename"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  label="Lastname"
                  outlined
                  class="rounded-sm"
                  v-model="user.lastname"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center" justify="center" class="mb-3">
              <v-col cols="12" md="3">
                <v-select
                  :items="['Male', 'Female']"
                  label="Gender"
                  outlined
                  v-model="user.gender"
                  class="rounded-sm"
                ></v-select>
              </v-col>
              <v-col cols="12" md="3">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="user.birthday"
                      label="Birth Date"
                      readonly
                      outlined
                      class="rounded-sm"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="user.birthday"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="dateSave"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="3">
                <v-select
                  :items="['Single', 'Married', 'Divorced', 'Widowed']"
                  label="Civil Status"
                  outlined
                  class="rounded-sm"
                  value="Single"
                ></v-select>
              </v-col>
            </v-row>
          </template>
        </user-details> <!-- USER PERSONAL DETAILS INFO -->


        <user-details :users="users">
          <template #user-title>
            <div class="gray--text text-uppercase font-weight-bold">
              Contact Details
            </div>
          </template>
          <template #user-text-fields="{ user }">
            <v-row align="center" justify="center">
              <v-col cols="12" md="3">
                <v-text-field
                  label="Contact Number"
                  outlined
                  class="rounded-sm"
                  v-model="user.contact_number"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  label="Occupation"
                  outlined
                  class="rounded-sm"
                  v-model="user.occupation"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-select
                  :items="['ADMIN', 'OPM', 'PRODUCTION', 'QUALITY CONTROL', 'TECHNICAL', 'SECURITY']"
                  label="Department"
                  outlined
                  class="rounded-sm"
                  v-model="user.department"
                ></v-select>
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-col cols="12" md="3">
                <v-select
                  :items="['SPMI', 'VACI', 'GGC', 'SECURITY']"
                  label="Company"
                  outlined
                  class="rounded-sm"
                  v-model="user.company"
                ></v-select>
              </v-col>
              <v-col cols="12" md="3">
                <v-select
                  :items="countries"
                  label="Nationality"
                  outlined
                  class="rounded-sm"
                  v-model="user.nationality"
                ></v-select>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  label="Address"
                  class="rounded-sm"
                  v-model="user.address"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </template>
        </user-details>
        
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import { auth } from '@/services'
  import { toastAlertStatus } from '@/utils'
  import countries from '@/static/countries.json'
  import { GET_USER_BASIC_INFO } from '@/graphql/queries'
  import { GET_USER_BASIC_INFO_SUBSCRIPTION } from '@/graphql/subscriptions'
  export default {
    components: {
      UserDetails: () => import('./UserDetails'),
      UserAuthProfile: () => import('./UserAuthProfile')
    },
    data () {
      return {
        menu: false,
        users: [],
        countries: []
      }
    },
    methods: {
      nationalityData () {
        countries.forEach((element) => {
          this.countries.push(element.nationality)
        })
      },
      dateSave (date) {
        this.$refs.menu.save(date)
      }
    },
    created () {
      this.nationalityData()
    },
    apollo: {
      users: {
        query: auth ? GET_USER_BASIC_INFO : undefined,
        error (error) {
          toastAlertStatus('error', error)
        },
        variables () {
          return {
            firebase_id: auth ? auth.currentUser.uid : undefined
          }
        },
        subscribeToMore: {
          document: auth ? GET_USER_BASIC_INFO_SUBSCRIPTION : undefined,
          variables () {
            return {
              firebase_id: auth ? auth.currentUser.uid : undefined
            }
          },
          updateQuery(previousResult, { subscriptionData }) {
            if (previousResult) {
              return {
                users: [
                  ...subscriptionData.data.users
                ]
              }
            }
          }
        },
        result ({ data }) {
          this.users = data.users
        }
      }
    }
  }
</script>