<template>
  <v-dialog max-width="1200px" v-model="show">
    <v-card color="basil" min-height="40vh">
      <v-card-title class="text-center justify-center py-6">
        <h2 class="font-weight-medium display">
          <v-icon left large>mdi-clipboard-text</v-icon> Statistic Report
        </h2>
        <v-row class="mt-5">
          <v-spacer></v-spacer>
          <v-form ref="form" 
                  class="d-flex justify-center align-items-center mx-2"
                  :disabled="loading">
            <v-menu ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="date_entry"
                              label="Date Entry"
                              readonly
                              v-bind="attrs"
                              dense
                              outlined
                              :rules="[required('Date of Entry')]"
                              v-on="on">
                </v-text-field>
              </template>
              <v-date-picker ref="picker"
                            v-model="date_entry"
                            min="2019-01-01"
                            @change="dateEntrySave">
              </v-date-picker>
            </v-menu>
            <v-menu ref="menu2"
                    v-model="menu2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="date_end"
                              label="Date End"
                              readonly
                              outlined
                              dense
                              class="ml-1"
                              v-bind="attrs"
                              v-on="on"
                              :rules="[required('Date End')]">
                </v-text-field>
              </template>
              <v-date-picker ref="picker"
                            v-model="date_end"
                            min="2019-01-01"
                            @change="dateEndSave">
              </v-date-picker>
            </v-menu>
            <v-btn depressed
                   color="primary"
                   @click="onSearchRecord"
                   class="ml-1"
                   :loading="loading">
                  <v-icon left>mdi-magnify</v-icon> Search
            </v-btn>
          </v-form>
        </v-row>
      </v-card-title>
      <v-container>
        <v-row class="d-flex justify-center">
          <v-col cols="12" md="4" sm="6">  
            <statistic-result>
              <template #header-text>
                <v-card-title class="card-success">
                  <v-icon
                    large
                    left
                    color="success"
                  >
                    mdi-check-all
                  </v-icon>
                  <span class="title font-weight-medium">Overall Total</span>
                </v-card-title>
              </template>
              <template #total-result>
                {{ overAll ? overAll : 0 }}
              </template>
            </statistic-result>
          </v-col>
          <v-col cols="12" md="4" sm="6">  
            <statistic-result>
              <template #header-text>
                <v-card-title class="card-accepted">
                  <v-icon
                    large
                    left
                    color="blue darken-1"
                  >
                    mdi-check
                  </v-icon>
                  <span class="title font-weight-medium">Total Accepted</span>
                </v-card-title>
              </template>
              <template #total-result>
                {{ accepted ? accepted : 0 }}
              </template>
            </statistic-result>
          </v-col>
          <v-col cols="12" md="4" sm="6">  
            <statistic-result>
              <template #header-text>
                <v-card-title class="card-denied">
                  <v-icon
                    large
                    left
                    color="error"
                  >
                    mdi-close-circle-outline
                  </v-icon>
                  <span class="title font-weight-medium">Total Denied</span>
                </v-card-title>
              </template>
              <template #total-result>
                {{ denied ? denied : 0 }}
              </template> 
            </statistic-result>
          </v-col>
        </v-row>
        <small class="text--secondary">
          <b>Reminded:</b> Please reload the page before you make a Monthly Report in order to update the cache query in your private device.
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn class="ml-2" 
                    fab
                    color="success"  
                    small
                    v-on="on"
                    @click="onReloadPage">
                <v-icon>mdi-reload</v-icon>
              </v-btn>
            </template>
            <span>Reload Page</span>
          </v-tooltip>
        </small>
      </v-container>
    </v-card>
  </v-dialog> 
</template>

<script>
  import gql from 'graphql-tag'
  import toastAlertStatus from '@/utils'
  export default {
    components: {
      StatisticResult: () => import('./StatisticResult')
    },
    props: {
      visible: {
        type: Boolean,
        required: true
      }
    },
    data () {
      return {
        date_entry: '',
        date_end: '',
        menu: false,
        menu2: false,
        overAll: 0,
        accepted: 0,
        denied: 0,
        loading: false,
        required (propertyType) { 
          return v => v && v.length > 0 || `${propertyType} is required.`
        }
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
      onReloadPage () {
        location.reload()
      },
      dateEntrySave (date) {
        this.$refs.menu.save(date)
      },
      dateEndSave (date) {
        this.$refs.menu2.save(date)
      },
      onSearchRecord () {
        if (this.$refs.form.validate()) {
          this.overAllReport()
          this.totalAcceptedReport()
          this.totalDenied()
        }
      },
      overAllReport () {
        this.loading = true
        this.$apollo.query({
          query: gql`
            query overAllResult($date_entry: timestamptz, $date_end: timestamptz) {
              checklist_result_aggregate(where: {created_at: {_gte: $date_entry}, _and: {created_at: {_lte: $date_end}}}) {
                aggregate {
                  count
                }
              }
            }
          `,
          variables: {
            date_entry: this.date_entry,
            date_end: this.date_end
          }
        })
        .then(({ data }) => {
          this.loading = false
          this.overAll = data.checklist_result_aggregate.aggregate.count
          // console.log(data.checklist_result_aggregate.aggregate.count)
        })
        .catch(error => {
          this.loading = false
          toastAlertStatus('error', error)
        })
      },
      totalAcceptedReport () {
        this.loading = true
        this.$apollo.query({
          query: gql`
            query totalAcceptedReport($date_entry: timestamptz, $date_end: timestamptz) {
              checklist_result_aggregate(where: {created_at: {_gte: $date_entry}, _and: {created_at: {_lte: $date_end}, _and: {isAccepted: {_eq: true}}}}) {
                aggregate {
                  count
                }
              }
            }
          `,
          variables: {
            date_entry: this.date_entry,
            date_end: this.date_end
          }
        })
        .then(({ data }) => {
          this.loading = false
          this.accepted = data.checklist_result_aggregate.aggregate.count
        })
        .catch(error => {
          this.loading = false
          toastAlertStatus('error', error)
        })
      },
      totalDenied () {
        this.loading = true
        this.$apollo.query({
          query: gql`
            query totalAcceptedReport($date_entry: timestamptz, $date_end: timestamptz) {
              checklist_result_aggregate(where: {created_at: {_gte: $date_entry}, _and: {created_at: {_lte: $date_end}, _and: {isAccepted: {_eq: false}}}}) {
                aggregate {
                  count
                }
              }
            }
          `,
          variables: {
            date_entry: this.date_entry,
            date_end: this.date_end
          }
        })
        .then(({ data }) => {
          this.loading = false
          this.denied = data.checklist_result_aggregate.aggregate.count
        })
        .catch(error => {
          this.loading = false
          toastAlertStatus('error', error)
        })
      }
    }
  }
</script>

<style scoped>
  .card-denied {
    border-bottom: 6px solid #f5365c !important;
    -moz-border-bottom: 6px solid #f5365c;
    -webkit-border-bottom: 6px solid #f5365c;
  }
  .card-success {
    border-bottom: 6px solid #2dce89 !important;;
    -moz-border-bottom: 6px solid #2dce89;
    -webkit-border-bottom: 6px solid #2dce89;
  }
  .card-accepted {
    border-bottom: 6px solid #007bff !important;
    -moz-border-bottom: 6px solid #007bff;
    -webkit-border-bottom: 6px solid #007bff;
  }
</style>