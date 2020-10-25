<style scoped>
  .account {
    min-height: 100vh;
  }
</style>

<template>
  <div class="account">
    
    <user-auth-profile
    ></user-auth-profile> <!-- USER AUTHENTICATION WITH PROFILE -->
  
    <v-row align="center" justify="center">
      <v-col cols="12">
        
        <user-personal-details>
          <template #info-title>
            <div class="gray--text text-uppercase font-weight-bold">
              Personal Details
            </div>
          </template>
          <template #user-fullname>
            <v-col cols="12" md="3">
              <v-text-field
                label="Firstname"
                outlined
                class="rounded-sm"
                value="Joshua"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                label="Middlename"
                outlined
                class="rounded-sm"
                value="Adoro"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                label="Lastname"
                outlined
                class="rounded-sm"
                value="Galit"
              ></v-text-field>
            </v-col>
          </template>
          <template #user-details>
            <v-col cols="12" md="3">
              <v-select
                :items="['Male', 'Female']"
                label="Gender"
                outlined
                value="Male"
                class="rounded-sm"
              ></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-menu
                ref="menu"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    label="Birth Date"
                    readonly
                    outlined
                    class="rounded-sm"
                    v-bind="attrs"
                    v-on="on"
                    value="March 20, 1999"
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
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
          </template>
        </user-personal-details> <!-- USER PERSONAL DETAILS INFO -->


        <user-contact-details>
          <template #info-details>
            <div class="gray--text text-uppercase font-weight-bold">
              Contact Details
            </div>
          </template>
          <template #user-contact>
            <v-row align="center" justify="center">
              <v-col cols="12" md="3">
                <v-text-field
                  label="Contact Number"
                  outlined
                  class="rounded-sm"
                  value="09657268947"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  label="Occupation"
                  outlined
                  class="rounded-sm"
                  value="Web Developer/Video Editor"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-select
                  :items="['ADMIN', 'OPM', 'PRODUCTION', 'QUALITY CONTROL', 'TECHNICAL', 'SECURITY']"
                  label="Department"
                  outlined
                  class="rounded-sm"
                  value="ADMIN"
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
                  value="SPMI"
                ></v-select>
              </v-col>
              <v-col cols="12" md="3">
                <v-select
                  :items="countries"
                  label="Nationality"
                  outlined
                  class="rounded-sm"
                  value="Philippine, Filipino"
                ></v-select>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  label="Address"
                  class="rounded-sm"
                  value="Brgy. Anahawan Bato, Leyte"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </template>
        </user-contact-details>
        
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import countries from '@/static/countries.json'
  export default {
    components: {
      UserAuthProfile: () => import('./UserAuthProfile'),
      UserPersonalDetails: () => import('./UserPersonalDetails'),
      UserContactDetails: () => import('./UserContactDetails')
    },
    data () {
      return {
        countries: []
      }
    },
    methods: {
      nationalityData () {
        countries.forEach((element) => {
          this.countries.push(element.nationality)
        })
      }
    },
    created () {
      this.nationalityData()
    }
  }
</script>