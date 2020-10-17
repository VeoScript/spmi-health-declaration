<template>
  <v-container fluid>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" md="8">
        <user-result>
          <template #user-data-table>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-skeleton-loader
              class="mt-4"
              v-if="$apollo.loading"
              type="table"
            ></v-skeleton-loader>
            <v-data-table
              v-else
              v-for="(user, index) in users" :key="index"
              :headers="headers"
              :items="user.health_result"
              :search="search"
            >
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
        <v-skeleton-loader
          class="mt-4"
          v-if="$apollo.loading"
          type="list-item-avatar-two-line, list-item, list-item, list-item, list-item, list-item, list-item-three-line"
        ></v-skeleton-loader>
        <user-profile 
          v-else
          v-for="(user, index) in users" 
          :key="index"
          :user="user"
        ></user-profile>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </v-container>
</template>

<script>
  import { auth } from '@/services'
  import gql from 'graphql-tag'
  import moment from 'moment'
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
        query: gql`
          query getUserById($id: uuid!){
            users(where: {id: {_eq: $id}}) {
              id
              age
              lastname
              middlename
              nationality
              occupation
              gender
              firstname
              email
              department
              created_at
              contact_number
              civil_status
              company
              health_result(order_by: {created_at: desc}) {
                id
                familyTested
                created_at
                neighborTested
                purpose
                symptoms
                travel_local_country
                travel_outside_country
                created_at
              }
            }
          }
        `,
        variables () {
          return {
            id: auth ? this.user_id : undefined
          }
        },
        subscribeToMore: {
          document: gql`
            subscription getUserById($id: uuid!){
              users(where: {id: {_eq: $id}}) {
                id
                age
                lastname
                middlename
                nationality
                occupation
                gender
                firstname
                email
                department
                created_at
                contact_number
                civil_status
                company
                health_result(order_by: {created_at: desc}) {
                  id
                  familyTested
                  created_at
                  neighborTested
                  purpose
                  symptoms
                  travel_local_country
                  travel_outside_country
                }
              }
            }
          `,
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