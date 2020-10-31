<template>
  <div class="dashboard">
    <v-alert  text
              prominent
              type="warning"
              icon="mdi-alert"
              dismissible
              outlined
              v-show="error">
      {{ error }}
    </v-alert>
    <v-container fluid>
      <v-form ref="form">
        <v-row no-gutters>
          <v-col cols="12">

            <!-- USER CARD -->
            <v-skeleton-loader v-if="$apollo.loading" type="list-item-avatar-two-line"></v-skeleton-loader> <!--apollo loading when data is fetching --> 
            <user-card
              v-else
              v-for="user in users" 
              :key="user.id" :user="user"
            >
              <template #purpose>
                <v-text-field label="Please Indicate your purpose (e.g. Visit, Work) "
                              v-model="purpose"
                              :rules="[required('Purpose')]"
                              style="position: relative; top: 15px;"
                              class="rounded-sm">
                </v-text-field>
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
                    <v-checkbox label="Fever"
                                hide-details
                                value="Fever"
                                v-model="checkList.symptoms"
                                @change="onChangeSymptomatic">
                    </v-checkbox>
                    <v-checkbox label="Headache"
                                value="Headache"
                                hide-details
                                v-model="checkList.symptoms"
                                @change="onChangeSymptomatic">
                    </v-checkbox>
                    <v-checkbox label="Sore Throat"
                                value="Sore Throat"
                                hide-details
                                v-model="checkList.symptoms"
                                @change="onChangeSymptomatic">
                    </v-checkbox>
                    <v-checkbox label="Body Weakness/Pain"
                                value="Body Weakness/Pain"
                                v-model="checkList.symptoms"
                                @change="onChangeSymptomatic"
                                hide-details>
                    </v-checkbox>
                  </v-col>
                  <v-col sm="6" md="6" cols="12">
                    <v-checkbox label="Cough"
                                value="Cough"
                                hide-details
                                v-model="checkList.symptoms"
                                @change="onChangeSymptomatic">
                    </v-checkbox>
                    <v-checkbox label="Difficulty in Breathing"
                                value="Difficulty in Breathing"
                                hide-details
                                v-model="checkList.symptoms"
                                @change="onChangeSymptomatic">
                    </v-checkbox>
                    <v-checkbox label="None of the Above"
                                value="None of the Above"
                                hide-details
                                v-model="noSymptoms"
                                @click="onChangeNoSymptoms">
                    </v-checkbox>
                  </v-col>
                </v-row>
                <v-divider class="my-4"></v-divider>
                <v-row no-gutters>
                  <v-col sm="12" md="12" cols="12" >
                    <span>
                      Do you have a family member tested for
                      covid-19 RT-PCR test?  
                    </span>
                    <div class="d-flex">
                      <v-checkbox label="Yes"
                                  value="Yes"
                                  hide-details
                                  v-model="familyMemberTestedRTPCR">
                      </v-checkbox>
                      <v-checkbox label="No"
                                  value="No"
                                  class="ml-3"
                                  hide-details
                                  v-model="familyMemberTestedRTPCR">
                      </v-checkbox>
                    </div>
                  </v-col>
                </v-row>
                <br>
                <v-row no-gutters>
                  <v-col sm="12" md="12" cols="12" >
                    <span>
                      Do you have a neighbor tested for
                      covid-19 RT-PCR test?
                    </span>
                    <div class="d-flex">
                      <v-checkbox label="Yes"
                                  value="Yes"
                                  hide-details
                                  v-model="neighborTestedRTPCR">
                      </v-checkbox>
                      <v-checkbox label="No"
                                  value="No"
                                  hide-details
                                  class="ml-3"
                                  v-model="neighborTestedRTPCR">
                      </v-checkbox>
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
                  <v-col sm="6" md="6" cols="12">
                    <v-checkbox label="China"
                                value="China"
                                hide-details
                                v-model="checkList.travelOutsideCountry"
                                @change="onChangeTravelledOutsideCountry">
                    </v-checkbox>
                    <v-checkbox label="Japan"
                                value="Japan"
                                hide-details
                                v-model="checkList.travelOutsideCountry"
                                @change="onChangeTravelledOutsideCountry">
                    </v-checkbox>
                    <v-checkbox label="South Korea"
                                value="South Korea"
                                hide-details
                                v-model="checkList.travelOutsideCountry"
                                @change="onChangeTravelledOutsideCountry">
                    </v-checkbox>
                    <v-checkbox label="Iran"
                                value="Iran"
                                hide-details
                                v-model="checkList.travelOutsideCountry"
                                @change="onChangeTravelledOutsideCountry">
                    </v-checkbox>
                  </v-col>
                  <v-col sm="6" md="6" cols="12">
                     <v-checkbox label="USA"
                                value="USA"
                                hide-details
                                v-model="checkList.travelOutsideCountry"
                                @change="onChangeTravelledOutsideCountry">
                     </v-checkbox>
                     <v-checkbox  label="Paris"
                                  value="Paris"
                                  hide-details
                                  v-model="checkList.travelOutsideCountry"
                                  @change="onChangeTravelledOutsideCountry">
                      </v-checkbox>
                    <v-checkbox label="None of the Above"
                                value="None of the Above"
                                hide-details
                                v-model="noTravelOusideCountry"
                                @click="onChangeNoTravelOusideCountry">
                    </v-checkbox>
                  </v-col>
                  <v-col sm="12" md="12" cols="12">
                    <v-text-field label="Others"
                                  clearable
                                  v-model="othersTravelledOutsideCoutry"
                                  :disabled="noTravelOusideCountry ? true : false">
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-divider class="mt-5"></v-divider>
                <v-row no-gutters class="pa-3">
                  <v-col sm="12" md="12" cols="12">
                    <div class="body-2 font-weight-medium gray--text">Local Area</div>
                  </v-col>
                  <v-col sm="6" md="6" cols="12">
                    <v-checkbox label="Metro Manila"
                                value="Metro Manila"
                                hide-details
                                v-model="checkList.travelLocal"
                                @change="onChangeTravelledLocal">
                    </v-checkbox>
                    <v-checkbox label="Cebu City"
                                value="Cebu City"
                                hide-details
                                v-model="checkList.travelLocal"
                                @change="onChangeTravelledLocal">
                    </v-checkbox>
                    <v-checkbox label="Quezon City"
                                value="Quezon City"
                                hide-details
                                v-model="checkList.travelLocal"
                                @change="onChangeTravelledLocal">
                    </v-checkbox>
                    <v-checkbox label="Dumaguete"
                                value="Dumaguete"
                                hide-details
                                v-model="checkList.travelLocal"
                                @change="onChangeTravelledLocal">
                    </v-checkbox>
                  </v-col>
                  <v-col sm="6" md="6" cols="12">
                    <v-checkbox label="Ormoc City"
                                value="Ormoc City"
                                v-model="checkList.travelLocal"
                                hide-details
                                @change="onChangeTravelledLocal">
                    </v-checkbox>
                    <v-checkbox label="Tacloban City"
                                value="Tacloban City"
                                v-model="checkList.travelLocal"
                                hide-details
                                @change="onChangeTravelledLocal">
                    </v-checkbox>
                    <v-checkbox label="None of the Above"
                                value="None of the Above"
                                hide-details
                                v-model="noTravelLocal"
                                @click="onChangeNoTravelLocal">
                    </v-checkbox>
                  </v-col>
                  <v-col sm="12" md="12" cols="12">
                    <v-text-field label="Others"
                                  clearable
                                  v-model="othersTravelledLocal"
                                  :disabled="noTravelLocal ? true : false">
                    </v-text-field>
                  </v-col>
                </v-row>
              </template>
            </travel-history-card>
          </v-col>
          
           <!-- ======== HEALTH CHECK PREVIEW ====== -->
          <check-list-preview-dialog  :error="error"
                                      :visible="dialog"
                                      @close-dialog="dialog = false"
                                      @onConfirmPassword="onConfirmPassword" >
            <template #purpose>
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
            </template>
            <template #symptoms>
              <v-row class="ml-5">
                  <v-col cols="12">
                    <span>Symptoms</span><br>
                    <span>- 
                      <strong 
                        class="font-italic red--text"
                        v-for="symptom in checkList.symptoms" :key="symptom"
                      >
                        {{ `${symptom}, ` }}
                      </strong>
                      <strong class="font-italic red--text">{{ noSymptoms }}</strong>
                    </span>
                  </v-col>
                </v-row>
            </template>
            <template #travel-history>
              <v-row class="ml-5">
                <v-col cols="12">
                    <!-- TRAVEL HISTORY -->
                  <span>Travel History</span><br>
                  <div class="ml-2">
                    <small>Outside Country</small><br>
                    <span>- 
                      <strong
                        class="font-italic red--text" 
                        v-for="outside in checkList.travelOutsideCountry" :key="outside"
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
                        v-for="local in checkList.travelLocal" :key="local"
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
            </template>
            <template #family-tested>
              <span>Do you have a family members tested for covid-19 RT-PCR test?</span><br>
              <span>- <strong class="font-italic red--text">{{ familyMemberTestedRTPCR }}</strong></span>
            </template>
            <template #neighbor-tested>
                <span>Do you have a neighbors tested for covid-19 RT-PCR test?</span><br>
                <span>- <strong class="font-italic red--text">{{ neighborTestedRTPCR }}</strong></span>
            </template>
            <template #confirm-password>
              <v-form ref="form2" @submit.prevent="onConfirmPassword">
                <v-text-field label="Password"
                              :type="showPass ? 'text' : 'password'"
                              :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
                              @click:append="showPass = !showPass"
                              v-model="password"
                              :rules="[required('Confirmation password')]"
                              :loading="loading"
                              clearable>
                </v-text-field>
              </v-form>
            </template>
            <template #btn-save-health>
              <v-btn text
                     @click="onConfirmPassword"
                     :loading="loading">
              <v-icon left>mdi-content-save</v-icon> Save
              </v-btn>
            </template>
          </check-list-preview-dialog>

          <!-- ACTION BUTTON  -->
          <v-col sm="12" md="12" cols="12" class="text-right">
            <v-btn color="primary"
                   medium
                   @click="onPreviewHealthCheckList">
             <v-icon left>mdi-view-carousel</v-icon> Preview
            </v-btn>
            <v-btn color="gray" 
                   class="mx-2" 
                   medium
                   outlined
                   @click="onClearHealthCheckList">
              <v-icon left>mdi-backup-restore</v-icon> Clear
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template> 

<script>
  import moment from 'moment'
  import Swal from 'sweetalert2'
  import { auth } from '@/services'
  import { toastAlertStatus } from '@/utils'
  import { GET_USER_BASIC_INFO } from '@/graphql/queries'
  import { GET_USER_BASIC_INFO_SUBSCRIPTION } from '@/graphql/subscriptions'
  import { ADD_HEALTH_DECLARATION_MUTATION } from '@/graphql/mutations'
  export default {
    name: "HealthChecklist",
    components: {
      SymptomsCard: () => import('./SymptomsCard'),
      TravelHistoryCard: () => import('./TravelHistoryCard'),
      UserCard: () => import('./UserCard'),
      CheckListPreviewDialog: () => import('./CheckListDialog')
    },
    data () {
      return {
        today: moment().format('MMMM DD,YYYY - h:mm A'),
        dialog: false,
        showPass: false,
        password: '',
        loading: false,
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
        },
        users: []
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
        this.othersTravelledOutsideCoutry = ''
        this.checkList.travelOutsideCountry = []
      },
       // AUTOMATIC UNCHECK THE "NONE OF THE ABOVE" WHEN CLICKING TRAVEL OUTSIDE COUNTRY
      onChangeTravelledOutsideCountry () {
        this.noTravelOusideCountry = null
      },
      // AUTOMATIC UNCHECK TRAVEL LOCAL AREA WHEN CLICKING "NONE OF THE ABOVE"
      onChangeNoTravelLocal () {
        this.othersTravelledLocal = ''
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
      },
      onConfirmPassword () {
        if (this.$refs.form.validate()) {
          this.loading = true
          for (let [user_key, user_value] of Object.entries(this.users)) {
            if (this.password === user_value.password) {

              let symptomString = ''
              let travelOutsideCountryString = ''
              let travelLocalString = ''

              // Symptoms array works just fine
              this.checkList.symptoms.forEach((symptom) => {
                return `${symptomString += symptom + ' '}`
              }, `${symptomString += this.noSymptoms ? this.noSymptoms : ''}`)


              // Travel Outside Country Works just fine
              this.checkList.travelOutsideCountry.forEach((outside) => {
                return `${ travelOutsideCountryString += outside + ' ' }`
              }, `${ travelOutsideCountryString += 
                this.noTravelOusideCountry ? this.noTravelOusideCountry : '' + ' ' +
                this.othersTravelledOutsideCoutry ? this.othersTravelledOutsideCoutry + ' ' : '' }`)
              // Travel Local Area works just fine
              this.checkList.travelLocal.forEach((inside) => {
                return `${travelLocalString += inside + ' ' }`
              }, `${
                  travelLocalString +=
                  this.noTravelLocal ? this.noTravelLocal : '' + ' ' +
                  this.othersTravelledLocal ? this.othersTravelledLocal + ' ' : ''
                }`)
              this.$apollo.mutate({
                mutation: ADD_HEALTH_DECLARATION_MUTATION,
                  variables: {
                    user_id: user_value.id,
                    purpose: this.purpose,
                    symptoms: symptomString,
                    travel_outside_country: travelOutsideCountryString,
                    travel_local_country: travelLocalString,
                    familyTested: this.familyMemberTestedRTPCR,
                    neighborTested: this.neighborTestedRTPCR
                  }
                })
                .then(() => {
                  this.alertMessage()
                  symptomString = ''
                  travelOutsideCountryString = ''
                  travelLocalString = ''
                  this.loading = false
                  this.dialog = !this.dialog
                  this.error = ''
                  this.$refs.form.reset()
                  this.$refs.form2.reset()
                  this.onClearHealthCheckList()
                })
                .catch(error => {
                  this.loading = false
                  this.error = ''
                  toastAlertStatus('error', error)
                })
            } else {
              this.error = 'Your password and confirmation password do not match'
              this.loading = false
              toastAlertStatus('error', 'Password do not match')
            }
          }
        }
      },
      alertMessage () {
        this.checkList.symptoms.forEach((symptom) => {
          if (symptom === 'Fever') {
            Swal.fire({
              title: `<strong style="color: #FF5252;">YOU ARE NOT ALLOWED TO ENTER SPMI PLANT BUILDING</strong>`,
              icon: 'error',
              width: 900,
              html:
                'We need to follow the health protocols of the company.</b> ' +
                `Today is <b>${this.today}</b>`,
              focusConfirm: false,
              confirmButtonText: 'Be Safe!'
            })
          } else {
            Swal.fire({
              title: `<strong style="color: #4CAF50;">YOU ARE ALLOWED TO ENTER SPMI PLANT BUILDING</strong>`,
              icon: 'success',
              width: 900,
              html:
                'Wear face mask always and keep Social Distance.</b> ' +
                `Today is <b>${this.today}</b>`,
              focusConfirm: false,
              confirmButtonText: 'Good Day!'
            })
          }
        })
      }
    },
    apollo: {
      users: {
        query: auth ? GET_USER_BASIC_INFO : undefined,
        error (error) {
          toastAlertStatus('error', error)
        },
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
        },
        result ({ data }) {
          this.users = data.users
        }
      }
    }
  }
</script>
