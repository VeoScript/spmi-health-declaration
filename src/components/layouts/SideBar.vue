<template>
  <v-navigation-drawer 
   v-model="show"
   clipped
   app
  >
    <v-list-item two-line class="hidden-lg-and-up">
      <v-list-item-content >
        <v-list-item-title class="title">
          <v-img src='@/assets/spmi_official.png' max-width="120"/>
        </v-list-item-title>
        <v-list-item-subtitle>
          COVID-19 HEALTH DECLARATION
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list nav>

      <!-- PUBLIC NAVIGATION -->
      <v-list-item
        link
        v-for="(link, index) in links" :key="index"
        :to="link.to"
      >
        <v-list-item-icon>
          <v-icon :class="$route.path === link.to ? 'orange--text' : ''">{{ $route.path === link.to  ? link.icon : link.icon + '-outline'  }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title :class="$route.path === link.to ? 'darkBlueShade--text font-weight-medium' : ''">{{ link.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- ==== ADMINISTRATOR SHOW ONLY IF ACCOUNT TYPE IS ADMIN ===== -->
      <v-list-item 
        link to="/v/admin/company"
        v-for="user in users" :key="user.id"
        v-show="user.account_type === 'admin'"
      >
        <v-list-item-icon>
          <v-icon :class="$route.path === '/v/admin/company' ? 'orange--text' : ''">{{ $route.path === '/v/admin/company' ? 'mdi-shield' : 'mdi-shield-outline' }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title :class="$route.path === '/v/admin/company' ? 'darkBlueShade--text font-weight-medium' : ''">Administrator</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- ==== SIGN OUT NAV ==== -->
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>

        <v-list-item-content @click="onSignOut">
          <v-list-item-title>Sign Out</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import { auth } from '@/services'
  import { toastAlertStatus } from '@/utils'
  import { GET_ACCOUNT_TYPE_QUERY } from '@/graphql/queries'
  import { GET_ACCOUNT_TYPE_SUBSCRIPTION } from '@/graphql/subscriptions'
  export default {
    name: 'side-bar',
    props: {
      visible: {
        type: Boolean,
        required: true
      }
    },
    data () {
      return {
        users: [],
        links: [
          { text: 'Health CheckList', icon: 'mdi-checkbox-multiple-marked', to: '/v/health-checklist' },
          { text: 'Daily Records', icon: 'mdi-calendar-text', to: '/v/daily-records' },
          { text: 'Account', icon: 'mdi-account-check', to: '/v/account' }
        ]
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
      onSignOut () {
        auth
         .signOut()
         .then(() => this.$router.push({ name: 'login' }))
         .catch(error => toastAlertStatus('error', error) )
      }
    },
    apollo: {
      users: {
        query: auth ? GET_ACCOUNT_TYPE_QUERY : undefined,
        error (error) {
          toastAlertStatus('error', error)
        },
        variables () {
          return {
            firebase_id: auth ? auth.currentUser.uid : undefined
          }
        },
        subscribeToMore: {
          document: auth ? GET_ACCOUNT_TYPE_SUBSCRIPTION : undefined,
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