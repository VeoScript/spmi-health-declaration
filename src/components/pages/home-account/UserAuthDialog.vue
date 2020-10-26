<template>
  <v-dialog v-model="show" max-width="400px">
    <v-card color="basil">
      <v-card-title class="text-center justify-center py-6">
        <h4 class="font-weight-medium display basil--text">
          <v-icon left color="basil">mdi-pencil</v-icon> Update Authentication
        </h4>
      </v-card-title>
      
      <v-tabs v-model="tab"
              background-color="transparent"
              color="basil"
              grow>
        <v-tab v-for="item in tabs"
               :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card color="basil">
            <v-card-text>
              <v-form :disabled="loading" 
                      ref="formE"
                      v-model="valid"
                      lazy-validation>
                <v-alert dense
                        outlined
                        type="error"
                        tile
                        border="bottom"
                        dismissible
                        v-show="error">
                  {{ error }}
                </v-alert>
                <v-alert dense
                        outlined
                        type="success"
                        tile
                        border="bottom"
                        dismissible
                        v-show="success">
                  {{ success }}
                </v-alert>
                <v-text-field label="Email" 
                              prepend-inner-icon="mdi-email-outline"
                              :rules="[required('Email'), emailRules('Email')]"
                              v-model="user.email"
                              :loading="loading">
                </v-text-field>
                <v-btn block 
                       dark 
                       color="primary" 
                       tile 
                       depressed
                       @click="onSaveUpdatedEmail(user)"
                       :loading="loading">
                  <v-icon left>mdi-content-save</v-icon> Save
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card color="basil"
                  ref="formP"
                  v-model="valid"
                  lazy-validation>
            <v-card-text>
              <v-form :disabled="loading" > 
                <v-alert dense
                        outlined
                        type="error"
                        tile
                        border="bottom"
                        dismissible
                        v-show="error">
                  {{ error }}
                </v-alert>
                <v-text-field label="Password" 
                              prepend-inner-icon="mdi-lock-outline"
                              :type="showPassword ? 'text' : 'password'"
                              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                              @click:append="showPassword = !showPassword"
                              v-model="user.password"
                              :loading="loading"
                              :rules="passwordRules">
                </v-text-field>
                <v-btn block 
                       dark 
                       color="primary" 
                       tile 
                       @click="onSaveUpdatedPassword(user)"
                       depressed
                       :loading="loading">
                  <v-icon left>mdi-content-save</v-icon> Save
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-dialog> 
</template>

<script>
  import gql from 'graphql-tag'
  import { fb, auth } from '@/services'
  import { toastAlertStatus } from '@/utils'
  export default {
    props: {
      visible: {
        type: Boolean,
        required: true
      },
      user: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        loading: false,
        valid: true,
        showPassword: false,
        tab: null,
        tabs: ['Email', 'Password'],
        error: '',
        success: '',
        required(propertyType) { 
          return v => v && v.length > 0 || `${propertyType} is required.`
        },
        emailRules(propertyType) {
          return v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || `${propertyType} address must be valid.`
        },
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 5) || 'Password must have 5+ characters',
          v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character',
          v => /(?=.*\d)/.test(v) || 'Must have one number',
          v => /([!@$%])/.test(v) || 'Must have one special character [!@#$%]'
        ]
      }
    },
    computed: {
      show: {
        get () {
          return this.visible
        },
        set (value) {
          if (!value) {
            this.$emit('close')
          }
        }
      }
    },
    methods: {
      // FIREBASE UPDATE EMAIL
      onSaveUpdatedEmail (user) {
        if (this.$refs.formE.validate()) {
          this.loading = true
          fb.auth()
            .currentUser
            .updateEmail(user.email)
            .then(() => {
              this.error = ''
              this.loading = false // SET LOADING INTO FALSE
              toastAlertStatus('success', `Successfully Updated Email in Firebase`)
              this.updateAccountInHasura(user) // UPDATE EMAIL IN HASURA
            })
            .catch(error => {
              this.loading = false // SET LOADING INTO FALSE
              this.error = error
               this.success = ''
              toastAlertStatus('error', error)
            })
        }
      },
      // FIREBASE UPDATE PASSWORD
      onSaveUpdatedPassword (user) {
        if (this.$refs.formE.validate()) {
          this.loading = true
          fb.auth()
            .currentUser
            .updatePassword(user.password)
            .then(() => {
              this.error = ''
              this.loading = false // SET LOADING INTO FALSE
              toastAlertStatus('success', `Successfully Updated Password in Firebase`)
              this.updateAccountInHasura(user) // UPDATE PASSWORD IN HASURA
            })
            .catch(error => {
              this.loading = false // SET LOADING INTO FALSE
              this.error = error
              this.success = ''
              toastAlertStatus('error', error)
            })
        }
      },
      // UPDATE EMAIL AND PASSWORD IN HASURA GRAPHQL ACCOUNTS
      updateAccountInHasura(user) {
        this
          .$apollo
          .mutate({
              mutation: gql`
                mutation updateAuthUserMutation($firebase_id: String, $email: String, $password: String) {
                  update_users(where: {firebase_id: {_eq: $firebase_id}}, _set: {email: $email, password: $password}) {
                    affected_rows
                    returning {
                      id
                      lastname
                      middlename
                      firstname
                    }
                  }
                }
              `,
              variables: {
                firebase_id: auth ? auth.currentUser.uid : undefined,
                email: user.email,
                password: user.password
              }
          })
          .then(() => {
            this.error = ''
            this.success = 'Successfully Updated!'
            toastAlertStatus('success', 'Successfully Updated in Hasura Server')
          })
          .catch(error => {
            this.success = ''
            toastAlertStatus('error', error)
          })
      }
    }
  }
</script>