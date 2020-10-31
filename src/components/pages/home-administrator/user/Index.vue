<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="8">
        <user-result>
          <template #user-data-table>
            <v-text-field v-model="search"
                          append-icon="mdi-magnify"
                          label="Search"
                          single-line
                          hide-details>
            </v-text-field>
            <v-skeleton-loader class="mt-4"
                               v-if="$apollo.loading"
                               type="table">
            </v-skeleton-loader>
            <v-data-table v-else
                          v-for="(user, index) in users" :key="index"
                          :headers="headers"
                          :items="user.health_result"
                          :search="search">
              <!-- Purpose -->
              <template v-slot:[`item.purpose`]="{ item }">
                <span class="text-uppercase">{{ item.purpose }}</span>
              </template>
              <!-- Date Format -->
              <template v-slot:[`item.created_at`]="{ item }">
                {{ format_date(item.created_at) }}
              </template>
            </v-data-table> 
          </template>
        </user-result>
      </v-col>
      <v-divider vertical inset></v-divider>
      <v-col cols="12" md="3">
        <v-skeleton-loader class="mt-4"
                           v-if="$apollo.loading"
                           type="list-item-avatar-two-line, list-item, list-item, list-item, list-item, list-item, list-item-three-line">
        </v-skeleton-loader>
        <user-profile v-else
                      v-for="(user, index) in users" 
                      :key="index"
                      :user="user">
        </user-profile>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import moment from 'moment'
  import { auth } from '@/services'
  import { toastAlertStatus } from '@/utils'
  import { USER_HEALTH_RESULT_QUERY_BY_ID } from '@/graphql/queries'
  import { USER_HEALTH_RESULT_SUBSCRIPTION_BY_ID } from '@/graphql/subscriptions'
  export default {
    components: {
      UserProfile: () => import('./UserProfile'),
      UserResult: () => import('./UserResult')
    },
    data () {
      return {
        user_id: this.$route.params.id,
        search: '',
        items: [],
        headers: [
          {
            text: 'DATE & TIME',
            align: 'start',
            value: 'created_at',
          },
          { text: 'SYMPTOMS', value: 'symptoms' },
          { text: 'TRAVEL OUTSIDE COUNTRY', value: 'travel_outside_country' },
          { text: 'TRAVEL LOCAL AREA', value: 'travel_local_country' },
          { text: 'FAMILY TESTED', value: 'familyTested' },
          { text: 'NEIGHBOR TESTED', value: 'neighborTested' },
          { text: 'PURPOSE(S)', value: 'purpose' },
        ],
        healthResults: [],
        users: []
      }
    },
    methods: {
      format_date(value) {
        return moment(String(value)).format('MM/D/YYYY - h:mm A')
      }
    },
    apollo: {
      users: {
        query: USER_HEALTH_RESULT_QUERY_BY_ID,
        error (error) {
          toastAlertStatus('error', error)
        },
        variables () {
          return {
            id: auth ? this.user_id : undefined
          }
        },
        subscribeToMore: {
          document: USER_HEALTH_RESULT_SUBSCRIPTION_BY_ID,
          variables () {
            return {
              id: auth ? this.user_id : undefined
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