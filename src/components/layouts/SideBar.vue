<template>
  <v-navigation-drawer app v-model="show">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          <v-img src='@/assets/spmi_official.png' max-width="120"/>
        </v-list-item-title>
        <v-list-item-subtitle>
          COVID-19 HEALTH DECLARATION
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>

      <!-- PUBLIC NAVIGATION -->
      <v-list-item
        link
        v-for="(link, index) in links" :key="index"
        :to="link.to"
      >
        <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>


      <!-- ==== ADMINISTRATOR SHOW ONLY IF ACCOUNT TYPE IS ADMIN ===== -->
      <v-list-item 
        link to="/v/administrator"
        v-for="user in users" :key="user.id"
        v-show="user.account_type === 'admin'"
      >
        <v-list-item-icon>
          <v-icon>mdi-account-lock</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Administrator</v-list-item-title>
        </v-list-item-content>
      </v-list-item>


      <!-- ==== SIGN OUT NAV ==== -->
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-account-arrow-right</v-icon>
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
  export default {
    name: 'side-bar',
    props: ['visible', 'mode'],
    data () {
      return {
        users: [],
        links: [
          { text: 'Health CheckList', icon: 'mdi-comment-check', to: '/v/health-checklist' },
          { text: 'Daily Records', icon: 'mdi-file', to: '/v/daily-records' },
          { text: 'Account', icon: 'mdi-account-box', to: '/v/account' }
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
        query: GET_ACCOUNT_TYPE_QUERY,
        variables () {
          return {
            firebase_id: auth ? auth.currentUser.uid : undefined
          }
        },
        result ({ data }) {
          this.users = data.users
        }
      }
    }
  }
</script>