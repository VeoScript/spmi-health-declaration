<template>
  <v-app>
    <v-main>
      <v-alert text
               prominent
               type="error"
               icon="mdi-cloud-alert"
               dismissible
               v-show="error"
               outlined>
        <b>{{ error }}</b>
      </v-alert> <!-- ERROR MESSAGE ALERT -->
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card flat>
              <v-card-text align="center" justify="center">
                <v-img src='@/assets/spmi_official.png' max-width="190"/>
                <p>Covid-19 Health Declaration</p>
              </v-card-text>
              <v-card-text>
                <v-form ref="form"
                        :disabled="loading">
                  <v-text-field label="Email"
                                type="email"
                                autocomplete="off"
                                filled
                                rounded
                                v-model="form.email"
                                class="font-weight-light rounded-sm"
                                :rules="[required('Email'), emailRules('Email')]">
                  </v-text-field>
                  <v-text-field label="Password"
                                autocomplete="off"
                                filled
                                rounded
                                v-model="form.password"
                                class="font-weight-light rounded-sm"
                                :rules="[required('Password')]"
                                :type="showPass ? 'text' : 'password'"
                                :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
                                @click:append="showPass = !showPass"
                                @keyup.enter="onLogin">
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn text 
                       color="primary"
                       class="text-capitalize"
                       @click="dialog = true"> 
                  Create Account
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn depressed
                       dark
                       large
                       tile
                       color="blue"
                       class="text-capitalize"
                       @click="onLogin"
                       :loading="loading">
                  Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- Registration Dialog -->
      <register :form="form"
                :visible="dialog"
                :error="error"
                :loading="loading"
                @close="dialog = false"
                @submitForm="onRegister"
                @clearForm="onClear">
      </register>

    </v-main>
  </v-app>
</template>

<script>

  import { auth } from '@/services'
  import { toastAlertStatus } from '@/utils'
  import { ADD_USERS_MUTATION } from '@/graphql/mutations'
  export default {
    name: 'login',

    components: {
      Register: () => import('./Register')
    },

    data () {
      return {
        error: '',
        dialog: false,
        loading: false,
        form: {
          lastname: '',
          firstname: '',
          middlename: '',
          birthday: '',
          age: '',
          gender: '',
          civilStatus: '',
          contactNumber: '',
          address: '',
          nationality: '',
          occupation: '',
          department: '',
          company: '',
          email: '',
          password: ''
        },
        showPass: false,
        required (propertyType) { 
          return v => v && v.length > 0 || `${propertyType} is required.`
        },
        emailRules (propertyType) {
          return v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || `${propertyType} address must be valid.`
        }
      }
    },

    methods: {
      
      // ===== REGISTER USERS FIREBASE AND HASURA ====
      onRegister () {
        this.loading = true
        const { email, password } = this.form
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((firebase) => {
            this.saveInHasura (firebase)
            toastAlertStatus('success', 'Successfully Registered.') 
          })
          .catch(error => {
            this.errorProvider(error)
          })
      },

      // ====== SAVE INFORMATION IN HASURA ====
      saveInHasura (firebase) {
        const { lastname, firstname, middlename, birthday,
          gender, civilStatus, contactNumber, occupation,
          department, company, email, password, nationality, address } = this.form

        this
         .$apollo
         .mutate({
           mutation: ADD_USERS_MUTATION,
           variables: {
             firebase_id: firebase.uid,
             lastname,
             firstname,
             middlename,
             birthday,
             gender,
             civil_status: civilStatus,
             contact_number: contactNumber,
             occupation,
             department,
             company,
             email,
             password,
             nationality,
             address
           }
         })
         .then(() => {
            this.loading = false
            this.$router.push('/v/health-checklist')
            this.onClear() // CALLING CLEAR AFTER SUCCESSFULLY REGISTER
         })
         .catch(error => {
            this.loading = false
            this.errorProvider(error)
          })
      },

      // ===== CLEAR TEXTBOX AND RESET VALIDATION FORM ====
      onClear () {
        let self = this
        self.$refs.form.reset()
        self.form = {}
      },

      // ==== LOGIN AUTHENTICATION ==== 
      onLogin () {
        let self = this
        if (self.$refs.form.validate()) {
          this.loading = true
          const { email, password } = this.form
          auth
           .signInWithEmailAndPassword(email, password)
           .then(() => {
              this.loading = false
              this.$refs.form.reset()
              toastAlertStatus('success', 'Welcome to SPMI Covid19 Health Declaration')
              this.$router.push('/v/health-checklist')
           })
           .catch(error => { 
              this.errorProvider(error)
              toastAlertStatus('error', error)
           })

        }
      },

      // ==== ERROR PROVIDER TEXT MESSAGE ====
      errorProvider (error) {
        this.loading = false
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode) {
          toastAlertStatus('error', errorCode.split('/')[1])
          return this.error = errorCode
        } else if (errorMessage) {
          toastAlertStatus('error', errorMessage.split('/')[1])
          return this.error = errorMessage
        } else {
          toastAlertStatus('error', error.split('/')[1])
          return this.error = error
        }
      }
    }


  }
</script>