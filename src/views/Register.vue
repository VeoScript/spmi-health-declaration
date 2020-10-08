<template>
  <v-dialog 
    v-model="show" 
    transition="dialog-bottom-transition" 
    width="1000"
    fullscreen
  >
    <v-toolbar 
      flat
      color="blue-grey lighten-5"
    >
      <v-btn 
        icon 
        @click="show = !show"
        text
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title class="font-weight-light darkgrey--text">Create Account (<b>Registration</b>)</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        x-large
        class="font-weight-light rounded-sm"
      >
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
        <v-form ref="form">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="Last Name"
                filled
                rounded
                class="rounded-sm"
                v-model="form.lastname"
                :rules="[required('Lastname')]"
                ref="lastname"
              ></v-text-field>
              <v-text-field
                label="First Name"
                filled
                rounded
                class="rounded-sm"
                v-model="form.firstname"
                :rules="[required('Firstname')]"
              ></v-text-field>
              <v-text-field
                label="Middle Name"
                filled
                rounded
                class="rounded-sm"
                v-model="form.middlename"
                :rules="[required('Middlename')]"
              ></v-text-field>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Age"
                    filled
                    rounded
                    class="rounded-sm"
                    v-model="form.age"
                    :rules="[required('Age')]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    :items="genderList"
                    label="Gender"
                    filled
                    rounded
                    class="rounded-sm"
                    v-model="form.gender"
                    :rules="[required('Gender')]"
                  ></v-select>
                </v-col>
              </v-row>
              <v-select
                :items="civilStatusList"
                label="Civil Status"
                filled
                rounded
                class="rounded-sm"
                v-model="form.civilStatus"
                :rules="[required('Civil Status')]"
              ></v-select>
              <v-text-field
                label="Contact Number"
                filled
                rounded
                class="rounded-sm"
                v-model="form.contactNumber"
                :rules="[required('Contact Number')]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Occupation"
                filled
                rounded
                class="rounded-sm"
                v-model="form.occupation"
                :rules="[required('Occupation')]"
              ></v-text-field>
              <v-text-field
                label="Department"
                filled
                rounded
                class="rounded-sm"
                v-model="form.department"
                :rules="[required('Department')]"
              ></v-text-field>
              <v-text-field
                label="Company"
                filled
                rounded
                class="rounded-sm"
                v-model="form.company"
                :rules="[required('Company')]"
              ></v-text-field>
              <v-text-field
                label="Email"
                filled
                rounded
                class="rounded-sm mt-3"
                v-model="form.email"
                :rules="[required('Email'), emailRules('Email')]"
              ></v-text-field>
              <v-text-field
                label="Password"
                filled
                rounded
                class="rounded-sm mt-3"
                v-model="form.password"
                :rules="passwordRules"
                :type="showPass ? 'text' : 'password'"
                :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="showPass = !showPass"
              ></v-text-field>
              <v-text-field
                label="Re-Enter Password"
                filled
                rounded
                class="rounded-sm"
                :type="showPass2 ? 'text' : 'password'"
                :append-icon="showPass2 ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="showPass2 = !showPass2"
                :rules="[(form.password === confirm_password) || 'Password must match']"
                v-model="confirm_password"
              ></v-text-field>
            </v-col>   
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn 
              depressed
              dark
              large
              tile
              color="blue"
              class="text-capitalize"
              @click="onRegister"
            >
            Register
            </v-btn>
            <v-btn 
              depressed
              dark
              large
              tile
              color="grey"
              class="text-capitalize"
              @click="onClear"
            >
              Cancel
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
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
      }
    },
    data () {
      return {
        showPass: false,
        showPass2: false,
        confirm_password: '',
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
          v => /([!@$%])/.test(v) || 'Must have one special character [!@#$%]'
        ],
        genderList: ['Male', 'Female'],
        civilStatusList: ['Single', 'Married', 'Divorced', 'widowed '],
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
      }
    }
  }
</script>