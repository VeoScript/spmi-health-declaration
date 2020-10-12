<template>
  <div class="dashboard">
    <v-alert
      text
      prominent
      type="warning"
      icon="mdi-alert"
      dismissible
      outlined
      v-show="error"
    >
      {{ error }}
    </v-alert>
    <v-container fluid>
      <v-form ref="form">
        <v-row no-gutters>
          <v-col cols="12">

            <!-- USER CARD -->
            <v-skeleton-loader
              class="mt-4"
              v-if="$apollo.loading"
              type="list-item-avatar-two-line"
            ></v-skeleton-loader> <!--apollo loading when data is fetching --> 
            <user-card
              v-else
              v-for="user in users" 
              :key="user.id" :user="user"
            >
              <template #purpose>
                <v-text-field
                  label="Please Indicate your purpose (e.g. Visit, Work) "
                  filled
                  v-model="purpose"
                  :rules="[required('Purpose')]"
                  style="position: relative; top: 15px;"
                  class="rounded-sm"
                ></v-text-field>
              </template>
            </user-card> <!-- USER INFORMATION -->

          </v-col>
        </v-row>
        <v-row>
          <v-col sm="6" md="6" cols="12">
            <!-- SYMPTOMS CARD -->
            <symptoms-card>
              <template #symptoms>
                <v-row no-gutters>
                  <v-col sm="6" md="6" cols="12">
                    <v-checkbox
                      label="Fever"
                      hide-details
                      value="Fever"
                      v-model="checkList.symptoms"
                      @change="onChangeSymptomatic"
                    ></v-checkbox>
                    <v-checkbox
                      label="Headache"
                      value="Headache"
                      hide-details
                      v-model="checkList.symptoms"
                      @change="onChangeSymptomatic"
                    ></v-checkbox>
                    <v-checkbox
                      label="Sore Throat"
                      value="Sore Throat"
                      hide-details
                      v-model="checkList.symptoms"
                      @change="onChangeSymptomatic"
                    ></v-checkbox>
                    <v-checkbox
                      label="Body Weakness/Pain"
                      value="Body Weakness/Pain"
                      v-model="checkList.symptoms"
                      @change="onChangeSymptomatic"
                      hide-details
                    ></v-checkbox>
                  </v-col>
                  <v-col sm="6" md="6" cols="12">
                    <v-checkbox
                      label="Cough"
                      value="Cough"
                      hide-details
                      v-model="checkList.symptoms"
                      @change="onChangeSymptomatic"
                    ></v-checkbox>
                    <v-checkbox
                      label="Difficulty in Breathing"
                      value="Difficulty in Breathing"
                      hide-details
                      v-model="checkList.symptoms"
                      @change="onChangeSymptomatic"
                    ></v-checkbox>
                    <v-checkbox
                      label="None of the Above"
                      value="None of the Above"
                      hide-details
                      v-model="noSymptoms"
                      @click="onChangeNoSymptoms"
                    ></v-checkbox>
                  </v-col>
                </v-row>
                <v-divider class="my-4"></v-divider>
                <v-row no-gutters>
                  <v-col sm="12" md="12" cols="12" >
                    <span>
                      Do you have a family members tested for
                      covid-19 RT-PCR test?  
                    </span>
                    <div class="d-flex">
                      <v-checkbox
                        label="Yes"
                        value="Yes"
                        hide-details
                        v-model="familyMemberTestedRTPCR"
                      ></v-checkbox>
                      <v-checkbox
                        label="No"
                        value="No"
                        class="ml-3"
                        hide-details
                        v-model="familyMemberTestedRTPCR"
                      ></v-checkbox>
                    </div>
                  </v-col>
                </v-row>
                <br>
                <v-row no-gutters>
                  <v-col sm="12" md="12" cols="12" >
                    <span>
                      Do you have a neighbors tested for
                      covid-19 RT-PCR test?
                    </span>
                    <div class="d-flex">
                      <v-checkbox
                        label="Yes"
                        value="Yes"
                        hide-details
                        v-model="neighborTestedRTPCR"
                      ></v-checkbox>
                      <v-checkbox
                        label="No"
                        value="No"
                        hide-details
                        class="ml-3"
                        v-model="neighborTestedRTPCR"
                      ></v-checkbox>
                    </div>
                  </v-col>
                </v-row>
              </template>
            </symptoms-card>
          </v-col> <!-- END SYMPTOMS CARD -->

          <v-col sm="6" md="6" cols="12">
            <!-- TRAVEL HISTORY CARD -->
            <travel-history-card>
              <template #travel-history>
                <v-row no-gutters class="pa-2">
                  <v-col sm="12" md="12" cols="12">
                    <div class="body-2 font-weight-medium gray--text">Outside of the Country</div>
                  </v-col>
                  <v-col sm="6" md="3" cols="12">
                    <v-checkbox
                      label="China"
                      value="China"
                      hide-details
                      v-model="checkList.travelOutsideCountry"
                      @change="onChangeTravelledOutsideCountry"
                    ></v-checkbox>
                    <v-checkbox
                      label="Japan"
                      value="Japan"
                      hide-details
                      v-model="checkList.travelOutsideCountry"
                      @change="onChangeTravelledOutsideCountry"
                    ></v-checkbox>
                    <v-checkbox
                      label="South Korea"
                      value="South Korea"
                      hide-details
                      v-model="checkList.travelOutsideCountry"
                      @change="onChangeTravelledOutsideCountry"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-checkbox
                      label="Iran"
                      value="Iran"
                      hide-details
                      v-model="checkList.travelOutsideCountry"
                      @change="onChangeTravelledOutsideCountry"
                    ></v-checkbox>
                    <v-checkbox
                      label="USA"
                      value="USA"
                      hide-details
                      v-model="checkList.travelOutsideCountry"
                      @change="onChangeTravelledOutsideCountry"
                    ></v-checkbox>
                     <v-checkbox
                      label="Paris"
                      value="Paris"
                      hide-details
                      v-model="checkList.travelOutsideCountry"
                      @change="onChangeTravelledOutsideCountry"
                    ></v-checkbox>
                  </v-col>
                  <v-col sm="6" md="3" cols="12">
                    <v-checkbox
                      label="None of the Above"
                      value="None of the Above"
                      hide-details
                      v-model="noTravelOusideCountry"
                      @click="onChangeNoTravelOusideCountry"
                    ></v-checkbox>
                    <v-text-field
                      label="Others"
                      clearable
                      v-model="othersTravelledOutsideCoutry"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-divider class="mt-5"></v-divider>
                <v-row no-gutters class="pa-3">
                  <v-col sm="12" md="12" cols="12">
                    <div class="body-2 font-weight-medium gray--text">Local Area</div>
                  </v-col>
                  <v-col sm="6" md="3" cols="12">
                    <v-checkbox
                      label="Metro Manila"
                      value="Metro Manila"
                      hide-details
                      v-model="checkList.travelLocal"
                      @change="onChangeTravelledLocal"
                    ></v-checkbox>
                    <v-checkbox
                      label="Cebu City"
                      value="Cebu City"
                      hide-details
                      v-model="checkList.travelLocal"
                      @change="onChangeTravelledLocal"
                    ></v-checkbox>
                    <v-checkbox
                      label="Quezon City"
                      value="Quezon City"
                      hide-details
                      v-model="checkList.travelLocal"
                      @change="onChangeTravelledLocal"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-checkbox
                      label="Dumaguete"
                      value="Dumaguete"
                      hide-details
                      v-model="checkList.travelLocal"
                      @change="onChangeTravelledLocal"
                    ></v-checkbox>
                    <v-checkbox
                      label="Ormoc City"
                      value="Ormoc City"
                      v-model="checkList.travelLocal"
                      hide-details
                      @change="onChangeTravelledLocal"
                    ></v-checkbox>
                    <v-checkbox
                      label="Tacloban City"
                      value="Paris"
                      v-model="checkList.travelLocal"
                      hide-details
                      @change="onChangeTravelledLocal"
                    ></v-checkbox>
                  </v-col>
                  <v-col sm="6" md="3" cols="12">
                    <v-checkbox
                      label="None of the Above"
                      value="None of the Above"
                      hide-details
                      v-model="noTravelLocal"
                      @click="onChangeNoTravelLocal"
                    ></v-checkbox>
                    <v-text-field
                      label="Others"
                      clearable
                      v-model="othersTravelledLocal"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </template>
            </travel-history-card>
          </v-col>
          
           <!-- ======== HEALTH CHECK PREVIEW ====== -->
          <check-list-preview-dialog 
            :purpose="purpose"
            :noSymptoms="noSymptoms"
            :noTravelLocal="noTravelLocal"
            :noTravelOusideCountry="noTravelOusideCountry"
            :othersTravelledOutsideCoutry="othersTravelledOutsideCoutry"
            :othersTravelledLocal="othersTravelledLocal"
            :symptoms="checkList.symptoms"
            :travelLocal="checkList.travelLocal"
            :travelOutsideCountry="checkList.travelOutsideCountry"
            :familyMemberTestedRTPCR="familyMemberTestedRTPCR"
            :neighborTestedRTPCR="neighborTestedRTPCR"
            :visible="dialog"
            :users="users"
            @close-dialog="dialog = false"
          ></check-list-preview-dialog>

          <!-- ACTION BUTTON  -->
          <v-col sm="12" md="12" cols="12" class="text-right">
            <v-btn
              color="primary"
              x-large
              @click="onPreviewHealthCheckList"
            >
             <v-icon left>mdi-view-carousel</v-icon> Preview
            </v-btn>
            <v-btn 
              color="gray" 
              class="mx-2" 
              x-large 
              outlined
              @click="onClearHealthCheckList"
            >
              <v-icon left>mdi-backup-restore</v-icon> Clear
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template> 

<script>
  import { auth } from '@/services'
  import { toastAlertStatus } from '@/utils'
  import { GET_USER_BASIC_INFO } from '@/graphql/queries'
  import { GET_USER_BASIC_INFO_SUBSCRIPTION } from '@/graphql/subscriptions'
  export default {
    name: "HealthChecklist",
    components: {
      SymptomsCard: () => import('./SymptomsCard'),
      TravelHistoryCard: () => import('./TravelHistoryCard'),
      UserCard: () => import('./UserCard'),
      CheckListPreviewDialog: () => import('./CheckListPreviewDialog')
    },
    data () {
      return {
        dialog: false,
        error: '',
        purpose: '',
        noSymptoms: '',
        noTravelOusideCountry: '',
        noTravelLocal: '',
        othersTravelledOutsideCoutry: '',
        othersTravelledLocal: '',
        checkList: {
          symptoms: [],
          travelOutsideCountry: [],
          travelLocal: []
        },
        familyMemberTestedRTPCR: '',
        neighborTestedRTPCR: '',
        required (propertyType) { 
          return v => v && v.length > 0 || `Your ${propertyType} is required.`
        }
      }
    },
    methods: {
      // ==== CLEAR THE HEALTH CHECK LIST DECLARATION
      onClearHealthCheckList () {
        this.familyMemberTestedRTPCR = ''
        this.neighborTestedRTPCR = ''
        this.noSymptoms = null
        this.checkList.symptoms = []
         this.noTravelOusideCountry = ''
        this.checkList.travelOutsideCountry = []
        this.checkList.travelLocal = []
        this.othersTravelledOutsideCoutry = ''
        this.othersTravelledLocal = ''
        this.noTravelLocal = ''
        this.purpose = ''
        this.error = ''
        this.$refs.form.reset()
      },
      // AUTOMATIC UNCHECK SYMPTOMS WHEN CLICKING "NONE OF THE ABOVE"
      onChangeNoSymptoms () {
        this.checkList.symptoms = []
      },
      // AUTOMATIC UNCHECK THE "NONE OF THE ABOVE" WHEN CLICKING SYMPTOMS
      onChangeSymptomatic () {
        this.noSymptoms = null
      },
      // AUTOMATIC UNCHECK TRAVEL OUTSIDE COUNTRY WHEN CLICKING "NONE OF THE ABOVE"
      onChangeNoTravelOusideCountry () {
        this.checkList.travelOutsideCountry = []
      },
       // AUTOMATIC UNCHECK THE "NONE OF THE ABOVE" WHEN CLICKING TRAVEL OUTSIDE COUNTRY
      onChangeTravelledOutsideCountry () {
        this.noTravelOusideCountry = null
      },
      // AUTOMATIC UNCHECK TRAVEL LOCAL AREA WHEN CLICKING "NONE OF THE ABOVE"
      onChangeNoTravelLocal () {
        this.checkList.travelLocal = []
      },
      onChangeTravelledLocal () {
        this.noTravelLocal = null
      },
      // ==== FOR PREVIEWING HEATH CHECKLIST
      onPreviewHealthCheckList () {
        let self = this
        if (!self.$refs.form.validate()) {
          this.error = 'Please Indicate your purpose (e.g Visit, Work)'
        } else {
          if (self.checkList.symptoms === [] || self.noSymptoms === '') {
            this.error = 'Please Check Your Symptoms if any.'
            toastAlertStatus('warning', 'Please Check Your Symptoms if any.')
          } else if (self.familyMemberTestedRTPCR === '') {
            this.error = 'Please Select if you have a family members tested for covid-19 RT-PCR test'
            toastAlertStatus('warning', 'Please Select if you have a family members tested for covid-19 RT-PCR test?')
          } else if (self.neighborTestedRTPCR === '') {
            this.error = 'Please Select if you have a neighbors tested for covid-19 RT-PCR test?'
            toastAlertStatus('warning', 'Please Select if you have a neighbors tested for covid-19 RT-PCR test?')
          } else if (self.checkList.travelOutsideCountry === [] || self.noTravelOusideCountry === '') {
            this.error = 'Please Select travel history outside the philippines if any.'
            toastAlertStatus('warning', 'Please Select travel history outside the philippines if any.')
          } else if (self.checkList.travelLocal === [] || self.noTravelLocal === '') {
            this.error = 'Please Select local travel history if any.'
            toastAlertStatus('warning', 'Please Select local travel history if any.')
          } else {
            this.error = ''
            this.dialog = true
          }
        }
      }
    },
    apollo: {
      users: {
        query: auth ? GET_USER_BASIC_INFO : undefined,
        variables () {
          return {
            firebase_id: auth ? auth.currentUser.uid : undefined
          }
        },
        subscribeToMore: {
          document: auth ? GET_USER_BASIC_INFO_SUBSCRIPTION : undefined,
          variables () {
            return {
              firebase_id: auth ? auth.currentUser.uid : undefined
            }
          },
          updateQuery(previousResult, { subscriptionData }) {
            if (previousResult) {
              return {
                users: [
                    ...subscriptionData.data.users
                ]
              }
            }
          }
        }
      }
    }
  }
</script>
