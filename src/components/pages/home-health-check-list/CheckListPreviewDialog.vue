<template>
  <v-dialog
    class="preview-modal"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    v-model="show"
  >
    <v-card style="background: #fff;">
      <v-toolbar class="dgbox">
        <v-btn
          icon
          @click="show = !show"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Preview Health Checklist</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            text
          >
            Save
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <!-- Preview checklist selected and the user basic info... -->
      <v-container fluid>
        <v-row class="justify-center">
          <v-col sm="6" md="6" cols="12">
            <v-card id="defaultcard">
              <v-card-title>CHECKLIST RESULT</v-card-title>
              <v-card-subtitle><strong>09-13-2020</strong></v-card-subtitle>
              <v-container fluid>
                <v-row class="ml-5">
                  <v-col cols="12">
                    <span>Purpose(s)</span><br>
                    <span>- <strong class="text-uppercase">{{ purpose }}</strong></span>
                  </v-col>
                </v-row>
                <v-row class="ml-5">
                  <v-col cols="12">
                    <span>Symptoms</span><br>
                    <span>- 
                      <strong 
                        v-for="symptom in symptoms" :key="symptom"
                      >
                        {{ `${symptom}, ` }}
                      </strong>
                      <strong>{{ noSymptoms }}</strong>
                    </span>
                  </v-col>
                </v-row>
                <v-row class="ml-5">
                  <v-col cols="12">
                    <span>Travel History</span><br>
                    <span>- 
                      <strong 
                        v-for="symptom in symptoms" :key="symptom"
                      >
                        {{ `${symptom}, ` }}
                      </strong>
                      <strong>{{ noSymptoms }}</strong>
                    </span>
                  </v-col>
                </v-row>
                <v-row class="ml-5">
                  <v-col cols="12">
                    <span>Do you have a family members tested for covid-19 RT-PCR test?</span><br>
                    <span>- <strong>No</strong></span>
                  </v-col>
                </v-row>
                <v-row class="ml-5">
                  <v-col cols="12">
                    <span>Do you have a neighbors tested for covid-19 RT-PCR test?</span><br>
                    <span>- <strong>No</strong></span>
                  </v-col>
                </v-row>
                <hr>
                <v-row class="justify-center">
                  <v-col sm="12" md="12" cols="12">
                    <div class="defaulttxt-p2 text-center">
                      I hereby authorize SPMI, to collect and process the data indicated
                      herein for the purpose of effecting control of the COVID-19 infection.
                      I understand that my personal information is protected by 
                      RA 10173, Data Privacy Act of 2012,
                      and that I am required by RA 11469, Bayanihan to Heal as One Act,
                      to provide truthful information. <br> <br>

                      if you agree type your password to confirm.
                    </div>
                    <v-row class="justify-center">
                      <v-col sm="8" md="8" cols="12">
                        <v-text-field
                          label="Password"
                          type="password"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'preview-modal',
    props: {
      visible: {
        type: Boolean,
        required: true
      },
      purpose: {
        type: String,
        required: true,
      },
      noSymptoms: {
        type: String,
        required: false
      },
      noTravelOusideCountry: {
        type: String,
        required: false
      },
      noTravelLocal: {
        type: String,
        required: false
      },
      othersTravelledOutsideCoutry: {
        type: String,
        required: false
      },
      othersTravelledLocal: {
        type: String,
        required: false
      },
      symptoms: {
        type: Array,
        required: false
      },
      travelOutsideCountry: {
        type: Array,
        required: false
      },
      travelLocal: {
        type: Array,
        required: false
      },
      familyMemberTestedRTPCR: {
        type: String,
        required: false
      },
      neighborTestedRTPCR: {
        type: String,
        required: false
      }
    },
    computed: {
      show: {
        get () {
          return this.visible
        },
        set (value) {
          if (!value) {
            this.$emit('close-dialog')
          }
        }
      }
    }
  }
</script>