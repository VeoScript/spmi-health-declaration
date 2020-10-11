<template>
  <div class="dashboard">
    <v-container fluid>
      <v-form>
        <v-row no-gutters>
          <v-col sm="12" md="12" cols="12">

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
            </user-card> <!-- USER INFORMATION -->

          </v-col>
        </v-row>
        <v-row no-gutters>
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
                <hr class="my-4"/>
                <v-row no-gutters>
                  <v-col sm="12" md="12" cols="12" >
                    <span>
                      Do you have a family members tested for
                      covid-19 RT-PCR test?  
                    </span>
                    <div>
                      <v-checkbox
                        label="Yes"
                        value="Yes"
                        hide-details
                        v-model="familyMemberTestedRTPCR"
                      ></v-checkbox>
                      <v-checkbox
                        label="No"
                        value="No"
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
                    <div>
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
                <v-row no-gutters>
                  <v-col sm="12" md="12" cols="12">
                    <div class="defaulttxt-p">Outside of the Country</div>
                  </v-col>
                  <v-col sm="6" md="6" cols="12">
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
                    <v-checkbox
                      label="Iran"
                      value="Iran"
                      hide-details
                      v-model="checkList.travelOutsideCountry"
                      @change="onChangeTravelledOutsideCountry"
                    ></v-checkbox>
                  </v-col>
                  <v-col sm="6" md="6" cols="12">
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
                    <v-checkbox
                      label="None of the Above"
                      value="None of the Above"
                      hide-details
                      v-model="noTravelOusideCountry"
                      @click="onChangeNoTravelOusideCountry"
                    ></v-checkbox>
                  </v-col>
                  <v-col sm="12" md="12" cols="12" class="mt-3">
                    <v-text-field
                      label="Others"
                      clearable
                      v-model="othersTravelledOutsideCoutry"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col sm="12" md="12" cols="12">
                    <div class="defaulttxt-p">Local Area</div>
                  </v-col>
                  <v-col sm="6" md="6" cols="12">
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
                    <v-checkbox
                      label="Dumaguete"
                      value="Dumaguete"
                      hide-details
                      v-model="checkList.travelLocal"
                      @change="onChangeTravelledLocal"
                    ></v-checkbox>
                  </v-col>
                  <v-col sm="6" md="6" cols="12">
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
                    <v-checkbox
                      label="None of the Above"
                      value="None of the Above"
                      hide-details
                      v-model="noTravelLocal"
                      @click="onChangeNoTravelLocal"
                    ></v-checkbox>
                  </v-col>
                  <v-col sm="12" md="12" cols="12" class="mt-3">
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
          
          <check-list-preview-dialog 
            :visible="dialog"
            @close-dialog="dialog = false"
          ></check-list-preview-dialog> <!-- HEALTH CHECK PREVIEW -->

          <v-col sm="12" md="12" cols="12" class="mt-3 text-right">
            <v-btn
              color="primary"
              depressed
              large
              @click="dialog = true"
            >
              Preview
            </v-btn>
            <v-btn 
              color="secondary" 
              class="mx-2" 
              large 
              outlined
              @click="onClearHealthCheckList"
            >
              cancel
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template> 

<script>
  import gql from 'graphql-tag'
  import { auth } from '@/services'
  import { GET_USER_BASIC_INFO } from '@/graphql/queries'
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
        neighborTestedRTPCR: ''
      }
    },
    methods: {
      // ==== CLEAR THE HEALTH CHECK LIST DECLARATION
      onClearHealthCheckList () {
        this.familyMemberTestedRTPCR = ''
        this.neighborTestedRTPCR = ''
        this.noSymptoms = null
        this.checkList.symptoms = []
         this.noTravelOusideCountry = null
        this.checkList.travelOutsideCountry = []
      },
      // ==== AUTOMATIC UNCHECK SYMPTOMS WHEN CLICKING "NONE OF THE ABOVE"
      onChangeNoSymptoms () {
        this.checkList.symptoms = []
      },
      // ==== AUTOMATIC UNCHECK THE "NONE OF THE ABOVE" WHEN CLICKING SYMPTOMS
      onChangeSymptomatic () {
        this.noSymptoms = null
      },
      // ==== AUTOMATIC UNCHECK TRAVEL OUTSIDE COUNTRY WHEN CLICKING "NONE OF THE ABOVE"
      onChangeNoTravelOusideCountry () {
        this.checkList.travelOutsideCountry = []
      },
       // ==== AUTOMATIC UNCHECK THE "NONE OF THE ABOVE" WHEN CLICKING TRAVEL OUTSIDE COUNTRY
      onChangeTravelledOutsideCountry () {
        this.noTravelOusideCountry = null
      },
      // ==== AUTOMATIC UNCHECK TRAVEL LOCAL AREA WHEN CLICKING "NONE OF THE ABOVE"
      onChangeNoTravelLocal () {
        this.checkList.travelLocal = []
      },
      onChangeTravelledLocal () {
        this.noTravelLocal = ''
      }
    },
    apollo: {
      users: {
        query: GET_USER_BASIC_INFO,
        variables () {
          return {
            firebase_id: auth ? auth.currentUser.uid : undefined
          }
        }
      }
    }
  }
</script>
