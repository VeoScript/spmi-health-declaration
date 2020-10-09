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
                  @submit.prevent="onLogin"
                >
                  <v-text-field
                    label="Email"
                    type="email"
                    autocomplete="off"
                    filled
                    rounded
                    v-model="state.form.email"
                    class="font-weight-light rounded-sm"
                    :rules="[state.required('Email'), state.emailRules('Email')]"
                  ></v-text-field>
                  <v-text-field
                    label="Password"
                    autocomplete="off"
                    filled
                    rounded
                    v-model="state.form.password"
                    class="font-weight-light rounded-sm"
                    :rules="[state.required('Password')]"
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
                  @click="onLogin"
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
        @clearForm="onClear"
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
        },
        required (propertyType) { 
          return v => v && v.length > 0 || `${propertyType} is required.`
        },
        emailRules (propertyType) {
          return v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || `${propertyType} address must be valid.`
        }
      })

      onRegister = () => {
        alert(state.form)
      }

      onClear = () => {
        this.$refs.form.reset()
        state.form = {}
      }

      onLogin = () => {
        let self = this
        if (self.$refs.form.validate()) {
          alert('GOOOD')
        }
      }

      return {
        state,
        onRegister,
        onClear,
        onLogin
      }
    }

  }
</script>