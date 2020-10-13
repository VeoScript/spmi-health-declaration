<template>
  <div class="dailyrecords">
    <v-container class="mt-5" fluid>
      <!-- daily records table view -->
      <daily-records-table>
        <template #data-records>
          <v-skeleton-loader
              type="table-tbody"
              class="mx-auto"
              tile
              v-if="$apollo.loading"
          ></v-skeleton-loader> 
          <v-data-table
            v-else
            :headers="headers"
            :items="checkList"
            :search="search"
          >
            <!-- Purpose -->
            <template #item.purpose="{ item }">
              <span class="text-uppercase">{{ item.purpose }}</span>
            </template>
            <!-- Date Format -->
            <template #item.created_at="{ item }">
              <date-format :created_at="item.created_at.split('T')[0]"/>
            </template>
          </v-data-table>
        </template>
        <template #search-record>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </template>
      </daily-records-table>
    </v-container>
  </div>
</template>

<script>
  import { auth } from '@/services'
  import { CHECKLIST_RESULT_QUERY } from '@/graphql/queries'
  import { CHECKLIST_RESULT_SUBSCRIPTION } from '@/graphql/subscriptions'
  export default {
    name: 'dailyrecords',
    components: {
      DailyRecordsTable: () => import('@/components/pages/home-daily-records/DailyRecordsTable'),
      DateFormat: () => import('@/components/mixins/DateFormat')
    },
    data () {
      return {
          search: '',
          checkList: [],
          headers: [
            {
              text: 'DATE',
              align: 'start',
              sortable: false,
              value: 'created_at',
            },
            { text: 'SYMPTOMS', value: 'symptoms' },
            { text: 'TRAVEL OUTSIDE COUNTRY', value: 'travel_outside_country' },
            { text: 'TRAVEL LOCAL AREA', value: 'travel_local_country' },
            { text: 'PURPOSE(S)', value: 'purpose' },
          ]
      }
    },
    apollo: {
      checklist_result: {
        query: CHECKLIST_RESULT_QUERY,
        variables () {
          return {
            firebase_id: auth ? auth.currentUser.uid : undefined
          }
        },
        subscribeToMore: {
          document: auth ? CHECKLIST_RESULT_SUBSCRIPTION : undefined,
          variables () {
            return {
              firebase_id: auth ? auth.currentUser.uid : undefined
            }
          },
          updateQuery(previousResult, { subscriptionData }) {
            if (previousResult) {
              return {
                checklist_result: [
                    ...subscriptionData.data.checklist_result
                ]
              }
            }
          }
        },
        result ({ data }) {
          this.checkList = data.checklist_result
        }
      }
    }
  }
</script>