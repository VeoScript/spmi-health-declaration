<template>
  <v-dialog
    class="preview-modal"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    v-model="show"
  >
    <v-card class="gray">
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
           <v-icon left>mdi-content-save</v-icon> Save
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <!-- Preview checklist selected and the user basic info... -->
      <v-container  class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col sm="6" md="6" cols="12">
            <v-card flat outlined>
              <v-card-title>CHECKLIST RESULT</v-card-title>
              <v-card-subtitle class="font-italic">
                <strong>09-13-2020</strong>
              </v-card-subtitle>
              <v-container>
                <v-row class="ml-5">
                  <v-col cols="12">
                    <span>Purpose(s)</span><br>
                    <span>- 
                      <strong class="text-uppercase font-italic red--text">
                        {{ purpose }}
                      </strong>
                    </span>
                  </v-col>
                </v-row>
                <v-row class="ml-5">
                  <v-col cols="12">
                    <!-- SYMPTOMS ARRAYS DATA -->
                    <span>Symptoms</span><br>
                    <span>- 
                      <strong 
                        class="font-italic red--text"
                        v-for="symptom in symptoms" :key="symptom"
                      >
                        {{ `${symptom}, ` }}
                      </strong>
                      <strong class="font-italic red--text">{{ noSymptoms }}</strong>
                    </span>

                  </v-col>
                </v-row>
                <v-row class="ml-5">
                  <v-col cols="12">
                     <!-- TRAVEL HISTORY -->
                    <span>Travel History</span><br>
                    <div class="ml-2">
                      <small>Outside Country</small><br>
                      <span>- 
                        <strong
                          class="font-italic red--text" 
                          v-for="outside in travelOutsideCountry" :key="outside"
                        >
                          {{ `${outside}, ` }}
                        </strong>
                        <strong class="font-italic red--text" v-show="noTravelOusideCountry">
                          {{ ` ${noTravelOusideCountry}, ` }}
                        </strong>
                        <strong class="font-italic red--text" v-show="othersTravelledOutsideCoutry">
                          {{ ` ${othersTravelledOutsideCoutry} ` }}
                        </strong>
                      </span>
                    </div>
                    <div class="ml-2">
                      <!-- TRAVEL LOCAL COUNTRY -->
                      <small>Local Area</small><br>
                      <span>-
                        <strong 
                          class="font-italic red--text"
                          v-for="local in travelLocal" :key="local"
                        >
                          {{ `${local}, ` }}
                        </strong>
                        <strong class="font-italic red--text" v-show="noTravelLocal">
                          {{ ` ${noTravelLocal}, ` }}
                        </strong>
                        <strong class="font-italic red--text" v-show="othersTravelledLocal">
                          {{ ` ${othersTravelledLocal} ` }}
                        </strong>
                      </span>
                    </div>
                    <!-- END TRAVEL HISTORY -->
                  </v-col>
                </v-row>
                <v-row class="ml-5">
                  <v-col cols="12">
                    <span>Do you have a family members tested for covid-19 RT-PCR test?</span><br>
                    <span>- <strong class="font-italic red--text">{{ familyMemberTestedRTPCR }}</strong></span>
                  </v-col>
                </v-row>
                <v-row class="ml-5">
                  <v-col cols="12">
                    <span>Do you have a neighbors tested for covid-19 RT-PCR test?</span><br>
                    <span>- <strong class="font-italic red--text">{{ neighborTestedRTPCR }}</strong></span>
                  </v-col>
                </v-row>
                <v-divider class="mx-5"></v-divider>
                <v-row class="justify-center">
                  <v-col sm="12" md="12" cols="12">
                    <div class="text-justify mx-5 gray--text font-weight-light subtitle-2 font-italic">
                      I hereby authorize SPMI, to collect and process the data indicated herein for the purpose of effecting control of the COVID-19 infection. I understand that my personal information is protected by RA 10173, Data Privacy Act of 2012, and that I am required by RA 11469, Bayanihan to Heal as One Act, to provide truthful information. <br> 
                    </div>
                    <v-row class="justify-center">
                      <v-col sm="8" md="8" cols="12">
                        <span class="body-2 font-weight-medium">If you agree type your password to confirm.</span>
                        <v-text-field
                          label="Password"
                          :type="showPass ? 'text' : 'password'"
                          :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
                          @click:append="showPass = !showPass"
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
    data () {
      return {
        showPass: false
      }
    },
    props: {
      visible: {
        type: Boolean,
        required: true
      },
      purpose: {
        type: String,
        required: false,
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