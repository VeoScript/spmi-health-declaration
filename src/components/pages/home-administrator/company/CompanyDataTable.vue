<template>
  <div>
    <v-card-title class="font-weight-light">
      All users of <span class="font-weight-medium mx-2 orange--text">{{ `${upperCaseCompany}` }}</span> Company
    </v-card-title>
    <v-text-field v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                  class="mx-5">
    </v-text-field>
    <v-skeleton-loader type="table-tbody"
                       class="mx-auto"
                       tile
                       v-if="$apollo.loading">
    </v-skeleton-loader> 
    <v-data-table v-else
                  :headers="headers"
                  :items="items"
                  :search="search"
                  @click:row="gotoUser">
      <!-- FULLNAME -->
      <template v-slot:[`item.fullname`]="{ item }">
        <span>
          <v-icon left>mdi-account-outline</v-icon>
          {{ getFullName(item) }}
        </span>
      </template>
      <!-- AGE -->
      <template v-slot:[`item.age`] ="{ item }">
        <span>
          <v-icon left>mdi-timer-sand</v-icon>
          {{ getStudentAge(item) }} yrs old
        </span>
      </template>
      <!-- GENDER -->
      <template v-slot:[`item.gender`]="{ item }">
        <v-icon left v-show="item.gender === 'Female'">mdi-gender-female</v-icon> 
        <v-icon left v-show="item.gender === 'Male'">mdi-gender-male</v-icon> 
        {{ item.gender === 'Male' ? 'Male' : 'Female' }}
      </template>
      <!-- EMAIL -->
      <template v-slot:[`item.email`]="{ item }">
        <td class="non-clickable" @click.stop>
          <span>
            <v-icon left>mdi-email-outline</v-icon>
            {{ item.email }}
          </span>
        </td>
      </template>
      <!-- CONTACT -->
      <template v-slot:[`item.contact_number`]="{ item }">
        <td class="non-clickable" @click.stop>
          <span>
            <v-icon left>mdi-phone-outline</v-icon>
            {{ item.contact_number }}
          </span>
        </td>
      </template>
      <!-- OCCUPATION -->
      <template v-slot:[`item.occupation`]="{ item }">
        <span>
          <v-icon left>mdi-clipboard-account-outline</v-icon>
          {{ item.occupation }}
        </span>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import { toastAlertStatus } from '@/utils'
  import { GET_USER_BY_COMPANY_QUERY } from '@/graphql/queries'
  import { GET_USER_BY_COMPANY_SUBSCRIPTION } from '@/graphql/subscriptions' 
  export default {
    data () {
      return {
        search: '',
        items: [],
        headers: [
          { text: 'NAME', value: 'fullname', },
          { text: 'AGE', value: 'age' },
          { text: 'GENDER', value: 'gender' },
          { text: 'EMAIL', value: 'email', sortable: false },
          { text: 'CONTACT', value: 'contact_number', sortable: false },
          { text: 'OCCUPATION', value: 'occupation', sortable: false }
        ]
      }
    },
    props: {
      company: {
        type: String,
        required: true
      }
    },
    computed: {
      upperCaseCompany () {
        return this.company.toUpperCase()
      }
    },
    methods: {
      getFullName (item) {
        return `${item.firstname} ${item.middlename.split(' ').map(x => x[0].toUpperCase()).join('')}. ${item.lastname}`
      },
      gotoUser (item) {
        this.$router.push(`/v/admin/company/user/${item.id}`)
      },
      getStudentAge (item) {
        let today = new Date()
        let birthDate = new Date(item.birthday)
        var age = today.getFullYear() - birthDate.getFullYear()
        let m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age
      }
    },
    apollo: {
      users: {
        query: GET_USER_BY_COMPANY_QUERY,
        error (error) {
          toastAlertStatus('error', error)
        },
        variables () {
          return {
            company: `${this.upperCaseCompany}`
          }
        },
        subscribeToMore: {
          document: GET_USER_BY_COMPANY_SUBSCRIPTION,
          variables () {
            return {
              company: `${this.upperCaseCompany}`
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
          this.items = data.users
        }
      }
    }
  }
</script>

<style scoped>
  ::v-deep tbody tr {
      cursor: pointer;
  }
  ::v-deep tbody tr td.non-clickable{
      cursor: auto;
  }
</style>