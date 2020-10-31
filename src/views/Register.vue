<template>
  <v-dialog v-model="show" 
            transition="dialog-bottom-transition" 
            width="1000"
            fullscreen>
    <v-toolbar flat color="blue-grey lighten-5">
      <v-btn icon 
             @click="show = !show"
             text>
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title class="font-weight-light darkgrey--text">Create Account (<b>Registration</b>)</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text
             x-large
             class="font-weight-light rounded-sm"
             @click="onRegister"
             :loading="loading">
        Save
      </v-btn>
    </v-toolbar>
    <v-card flat>
      <v-container>
        <v-row class="mt-5">
          <v-col align="center" justify="center">
            <v-img src='@/assets/spmi_official.png' max-width="240"/>
            <p>Covid-19 Health Declaration</p>
          </v-col>
        </v-row>
        <v-alert text
                 prominent
                 type="error"
                 icon="mdi-cloud-alert"
                 outlined
                 v-show="error">
          <b>{{ error }}</b>
        </v-alert>
        <v-form ref="form" :disabled="loading">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field label="Last Name"
                            filled
                            rounded
                            class="rounded-sm"
                            v-model="form.lastname"
                            :rules="[required('Last Name')]"
                            ref="lastname">
              </v-text-field>
              <v-text-field label="First Name"
                            filled
                            rounded
                            class="rounded-sm"
                            v-model="form.firstname"
                            :rules="[required('First Name')]">
              </v-text-field>
              <v-text-field label="Middle Name"
                            filled
                            rounded
                            class="rounded-sm"
                            v-model="form.middlename">
              </v-text-field>
              <v-menu ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="form.birthday"
                                label="Birth Date"
                                readonly
                                filled
                                rounded
                                class="rounded-sm"
                                v-bind="attrs"
                                v-on="on"
                                :rules="[required('Birthday')]">
                  </v-text-field>
                </template>
                <v-date-picker ref="picker"
                               v-model="form.birthday"
                               :max="new Date().toISOString().substr(0, 10)"
                               min="1950-01-01"
                               @change="dateSave">
                </v-date-picker>
              </v-menu>
              <v-select :items="genderList"
                        label="Gender"
                        filled
                        rounded
                        class="rounded-sm"
                        v-model="form.gender"
                        :rules="[required('Gender')]">
              </v-select>
              <v-select :items="civilStatusList"
                        label="Civil Status"
                        filled
                        rounded
                        class="rounded-sm"
                        v-model="form.civilStatus"
                        :rules="[required('Civil Status')]">
              </v-select>
              <v-text-field label="Contact Number"
                            filled
                            rounded
                            class="rounded-sm"
                            v-model="form.contactNumber"
                            :rules="[required('Contact Number')]">
              </v-text-field>
              <v-text-field label="Current Address"
                            filled
                            rounded
                            class="rounded-sm"
                            v-model="form.address"
                            :rules="[required('Current Address')]">
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select :items="countries"
                        label="Nationality"
                        filled
                        rounded
                        class="rounded-sm"
                        v-model="form.nationality"
                        :rules="[required('Nationality')]">
              </v-select>
              <v-select :items="companyList"
                        label="Company"
                        filled
                        rounded
                        class="rounded-sm"
                        v-model="form.company"
                        :rules="[required('Company')]">
              </v-select>
              <v-select :items="departmentList"
                        label="Department"
                        filled
                        rounded
                        class="rounded-sm"
                        v-model="form.department"
                        :rules="[required('Department')]">
              </v-select>
              <v-text-field
                label="Occupation"
                filled
                rounded
                class="rounded-sm"
                v-model="form.occupation"
                :rules="[required('Occupation')]"
              ></v-text-field>
              <v-text-field label="Email"
                            filled
                            rounded
                            class="rounded-sm"
                            v-model="form.email"
                            :rules="[required('Email'), emailRules('Email')]">
              </v-text-field>
              <v-text-field label="Password"
                            filled
                            rounded
                            class="rounded-sm"
                            v-model="form.password"
                            :type="showPass ? 'text' : 'password'"
                            :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
                            @click:append="showPass = !showPass"
                            :rules="passwordRules">
              </v-text-field>
              <v-text-field label="Re-Enter Password"
                            filled
                            rounded
                            class="rounded-sm"
                            v-model="confirm_password"
                            :type="showPass ? 'text' : 'password'"
                            :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
                            @click:append="showPass = !showPass"
                            :rules="[(form.password === confirm_password) || 'Password must match']">
              </v-text-field>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn depressed
                       dark
                       large
                       color="blue"
                       class="text-capitalize rounded-sm"
                       @click="onRegister"
                       :loading="loading">
                  Register
                </v-btn>
                <v-btn depressed
                       dark
                       large
                       color="grey"
                       class="text-capitalize rounded-sm"
                       @click="onClear">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-col>   
          </v-row>
        </v-form>
        <small class="gray--text">Be responsible for your correct information.</small>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  import countries from '@/static/countries.json'
  export default {
    name: 'register',
    props: {
      visible: {
        type: Boolean,
        required: true
      },
      form: {
        type: Object,
        required: true
      },
      error: {
        type: String,
        required: false
      },
      loading: {
        type: Boolean,
        required: false
      }
    },
    data () {
      return {
        showPass: false,
        showPass2: false,
        confirm_password: '',
        menu: false,
        minAge(propertyType) {
          return v => v && this.form.age >= 12 || `${propertyType} must be at least 12 years old.`
        },
        maxAge(propertyType) {
          return v => v && this.form.age < 100 || `${propertyType} must be less than 100 years old.`
        },
        required (propertyType) { 
          return v => v && v.length > 0 || `${propertyType} is required.`
        },
        emailRules (propertyType) {
          return v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || `${propertyType} address must be valid.`
        },
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 5) || 'Password must have 5+ characters',
          v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character',
          v => /(?=.*\d)/.test(v) || 'Must have one number',
          v => /([!@#$%])/.test(v) || 'Must have one special character [!@#$%]'
        ],
        genderList: ['Male', 'Female'],
        civilStatusList: ['Single', 'Married', 'Divorced', 'Widowed'],
        companyList: ['SPMI', 'VACI', 'GGC', 'SECURITY'],
        departmentList: ['ADMIN', 'OPM', 'PRODUCTION', 'QUALITY CONTROL', 'TECHNICAL', 'SECURITY'],
        countries: []
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
      dateSave (date) {
        this.$refs.menu.save(date)
      },
      onRegister () {
        let self = this
        if (self.$refs.form.validate()) {
          this.$emit('submitForm')
        }
      },
      onClear () {
        let self = this
        self.$refs.form.reset()
        this.$emit('clearForm')
      },
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
