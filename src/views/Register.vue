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
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
                label="Last Name"
                filled
                rounded
                class="rounded-sm"
                v-model="form.lastname"
            ></v-text-field>
            <v-text-field
                label="First Name"
                filled
                rounded
                class="rounded-sm"
                v-model="form.firstname"
            ></v-text-field>
            <v-text-field
                label="Middle Name"
                filled
                rounded
                class="rounded-sm"
                v-model="form.middlename"
            ></v-text-field>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Age"
                  filled
                  rounded
                  class="rounded-sm"
                  v-model="form.age"
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
            ></v-select>
            <v-text-field
                label="Contact Number"
                filled
                rounded
                class="rounded-sm"
                v-model="form.contactNumber"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Occupation"
              filled
              rounded
              class="rounded-sm"
              v-model="form.occupation"
            ></v-text-field>
            <v-text-field
              label="Department"
              filled
              rounded
              class="rounded-sm"
              v-model="form.department"
            ></v-text-field>
            <v-text-field
              label="Company"
              filled
              rounded
              class="rounded-sm"
              v-model="form.company"
            ></v-text-field>
            <v-text-field
              label="Email"
              filled
              rounded
              class="rounded-sm mt-3"
              v-model="form.email"
            ></v-text-field>
            <v-text-field
              label="Password"
              filled
              rounded
              class="rounded-sm mt-3"
              v-model="form.password"
            ></v-text-field>
            <v-text-field
              label="Re-Enter Password"
              filled
              rounded
              class="rounded-sm"
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
          >
            Cancel
          </v-btn>
        </v-card-actions>
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
        genderList: ['Male', 'Female'],
        civilStatusList: ['Single', 'Married', 'Divorced', 'widowed ']
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
        this.$emit('submitForm')
      }
    }
  }
</script>