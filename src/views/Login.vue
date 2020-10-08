<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card flat>
              <v-card-text align="center" justify="center">
                <v-img src='@/assets/spmi_official.png' max-width="190"/>
                <p>Covid-19 Health Declaration</p>
              </v-card-text>
              <v-card-text>
                <v-form
                  ref="form"
                  lazy-validation
                >
                  <v-text-field
                    label="Email"
                    type="email"
                    autocomplete="off"
                    filled
                    rounded
                    v-model="state.form.email"
                    class="font-weight-light rounded-sm"
                  ></v-text-field>

                  <v-text-field
                    label="Password"
                    autocomplete="off"
                    filled
                    rounded
                    v-model="state.form.password"
                    class="font-weight-light rounded-sm"
                  ></v-text-field>
                </v-form>

              </v-card-text>
              <v-card-actions>
                
                <v-btn 
                  text 
                  color="primary"
                  class="text-capitalize"
                  @click="state.dialog = true"
                > 
                  Create Account
                </v-btn>

                <v-spacer></v-spacer>
                <v-btn 
                  depressed
                  dark
                  large
                  tile
                  color="blue"
                  class="text-capitalize"
                >
                Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- Registration Dialog -->
      <register 
        :form="state.form"
        :visible="state.dialog"
        @close="state.dialog = false"
        @submitForm="onRegister"
      />

    </v-main>
  </v-app>
</template>

<script>

  import { reactive } from '@vue/composition-api'

  export default {
    name: 'login',

    components: {
      Register: () => import('./Register')
    },

    setup () {
      let state = reactive({
        dialog: false,
        form: {
          lastname: '',
          firstname: '',
          middlename: '',
          age: '',
          gender: '',
          civilStatus: '',
          contactNumber: '',
          occupation: '',
          department: '',
          company: '',
          email: '',
          password: ''
        }
      })

      function onRegister() {
        alert(state.form.lastname)
      }

      return {
        state,
        onRegister
      }
    }

  }
</script>