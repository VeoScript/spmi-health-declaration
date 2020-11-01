<template>
  <v-dialog max-width="1200px" v-model="show">
    <v-card color="basil" min-height="40vh">
      <v-card-title class="text-center justify-center py-6">
        <h2 class="font-weight-medium display">
          <v-icon left large>mdi-clipboard-text</v-icon> Statistic Report
        </h2>
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
                2000
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
                2000
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
                2000
              </template> 
            </statistic-result>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog> 
</template>

<script>
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