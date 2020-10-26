<style scoped>
  .account {
    min-height: 100vh;
  }
</style>

<template>
  <div class="account">
    
    <v-flex class="mb-3 container"
           v-if="$apollo.loading"
          >
      <v-skeleton-loader type="list-item-avatar-two-line">
      </v-skeleton-loader>
    </v-flex>
    <user-auth-profile v-else
                       v-for="(user, index) in users" 
                       :key="index"
                       :user="user">
    </user-auth-profile> <!-- USER AUTHENTICATION WITH PROFILE -->
  
     <v-flex class="container" v-if="$apollo.loading">
       <v-skeleton-loader type="table">
        </v-skeleton-loader>
     </v-flex>

    <v-row v-else
           align="center" 
           justify="center">
      <v-col cols="12">
        
        <v-form ref="form">
          <user-details :users="users">
            <template #user-title>
              <div class="gray--text text-uppercase font-weight-bold">
                Personal Details
              </div>
            </template>
            <template #user-text-fields="{ user }">
              <v-row align="center" justify="center" class="mb-3">
                <v-col cols="12" md="3">
                  <v-text-field label="Firstname"
                                outlined
                                class="rounded-sm"
                                v-model="user.firstname"
                                :rules="[required('Firstname')]"
                                :disabled="loading">
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field label="Middlename"
                                outlined
                                :disabled="loading"
                                class="rounded-sm"
                                v-model="user.middlename"
                                :rules="[required('Middlename')]">
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field label="Lastname"
                                outlined
                                :disabled="loading"
                                class="rounded-sm"
                                v-model="user.lastname"
                                :rules="[required('Lastname')]">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row align="center" justify="center" class="mb-3">
                <v-col cols="12" md="3">
                  <v-select :items="['Male', 'Female']"
                            label="Gender"
                            outlined
                            v-model="user.gender"
                            class="rounded-sm"
                            :disabled="loading"
                            :rules="[required('Gender')]">
                  </v-select>
                </v-col>
                <v-col cols="12" md="3">
                  <v-menu ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="user.birthday"
                                    label="Birth Date"
                                    readonly
                                    outlined
                                    class="rounded-sm"
                                    v-bind="attrs"
                                    v-on="on"
                                    :disabled="loading"
                                    :rules="[required('Birth date')]">
                      </v-text-field>
                    </template>
                    <v-date-picker ref="picker"
                                   v-model="user.birthday"
                                   :max="new Date().toISOString().substr(0, 10)"
                                   min="1950-01-01"
                                   @change="dateSave">
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" md="3">
                  <v-select :items="['Single', 'Married', 'Divorced', 'Widowed']"
                            label="Civil Status"
                            outlined
                            class="rounded-sm"
                            value="Single"
                            :disabled="loading"
                            :rules="[required('Civil Status')]">
                  </v-select>
                </v-col>
              </v-row>
            </template>
          </user-details> <!-- USER PERSONAL DETAILS -->

          <user-details :users="users">
            <template #user-title>
              <div class="gray--text text-uppercase font-weight-bold">
                Contact Details
              </div>
            </template>
            <template #user-text-fields="{ user }">
              <v-row align="center" justify="center">
                <v-col cols="12" md="3">
                  <v-text-field label="Contact Number"
                                outlined
                                class="rounded-sm"
                                v-model="user.contact_number"
                                :rules="[required('Contact Number')]"
                                :disabled="loading">
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field label="Occupation"
                                outlined
                                class="rounded-sm"
                                v-model="user.occupation"
                                :rules="[required('Occupation')]"
                                :disabled="loading">
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-select :items="['ADMIN', 'OPM', 'PRODUCTION', 'QUALITY CONTROL', 'TECHNICAL', 'SECURITY']"
                            label="Department"
                            outlined
                            class="rounded-sm"
                            v-model="user.department"
                            :rules="[required('Department')]"
                            :disabled="loading">
                  </v-select>
                </v-col>
              </v-row>
              <v-row align="center" justify="center">
                <v-col cols="12" md="3">
                  <v-select :items="['SPMI', 'VACI', 'GGC', 'SECURITY']"
                            label="Company"
                            outlined
                            class="rounded-sm"
                            v-model="user.company"
                            :rules="[required('Company')]"
                            :disabled="loading">
                  </v-select>
                </v-col>
                <v-col cols="12" md="3">
                  <v-select :items="countries"
                            label="Nationality"
                            outlined
                            class="rounded-sm"
                            v-model="user.nationality"
                            :rules="[required('Nationality')]"
                            :disabled="loading">
                  </v-select>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field label="Address"
                                class="rounded-sm"
                                v-model="user.address"
                                :rules="[required('Address')]"
                                outlined
                                :disabled="loading">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row align="center" justify="center">
                <v-btn class="primary rounded-sm" 
                      depressed
                      large
                      :loading="loading"
                      @click="onSaveAccountChanges(user)"
                      style="min-width: 340px;">
                  <v-icon left>mdi-content-save</v-icon> Save Changes
                </v-btn>
              </v-row>
              <v-row align="center" justify="center" class="mt-5">
                <small class="gray--text">Be responsible for your correct information.</small>
              </v-row>
            </template>
          </user-details> <!-- USER CONTACT DETAILS -->
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import { auth } from '@/services'
  import { toastAlertStatus } from '@/utils'
  import countries from '@/static/countries.json'
  import { GET_USER_BASIC_INFO } from '@/graphql/queries'
  import { UPDATE_USERS_MUTATION } from '@/graphql/mutations'
  import { GET_USER_BASIC_INFO_SUBSCRIPTION } from '@/graphql/subscriptions'
  export default {
    components: {
      UserDetails: () => import('./UserDetails'),
      UserAuthProfile: () => import('./UserAuthProfile')
    },
    data () {
      return {
        loading: false,
        menu: false,
        users: [],
        countries: [],
        required (propertyType) { 
          return v => v && v.length > 0 || `${propertyType} is required.`
        }
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
      },

      // ==== ON SAVE DATA CHANGES ===
      onSaveAccountChanges (user) {
        if (this.$refs.form.validate()) {
          this.loading = true
          const { firstname, lastname, middlename, nationality,  occupation, gender, 
                  department, company, civil_status, birthday, address, contact_number } = user

          this.$apollo.mutate({
              mutation: UPDATE_USERS_MUTATION,
              variables: {
                firebase_id: auth ? auth.currentUser.uid : undefined,
                firstname, 
                lastname, 
                middlename, 
                nationality, 
                occupation, 
                gender, 
                department, 
                company, 
                civil_status, 
                birthday, 
                address, 
                contact_number
              }
          })
          .then(() => {
            this.loading = false
            toastAlertStatus('success', 'Successfully Updated!')
          })
          .catch(error => {
            this.loading = false
            toastAlertStatus('error', error)
          })
        }
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