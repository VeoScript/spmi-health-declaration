<template>
  <div>
    <v-skeleton-loader
      v-if="$apollo.loading"
      type="list-item-avatar-two-line"
    ></v-skeleton-loader> <!--apollo loading when data is fetching --> 
    <user-account
      v-else
      v-for="user in users" 
      :key="user.id"
      :user="user"
    ></user-account>
  </div>
</template>

<script>
  import { auth } from '@/services'
  import { GET_USER_BASIC_INFO } from '@/graphql/queries'
  import { GET_USER_BASIC_INFO_SUBSCRIPTION } from '@/graphql/subscriptions'
  export default {
    components: {
      UserAccount: () => import('./UserAccount')
    },
    data () {
      return {
        users: [],
      }
    },
    apollo: {
      users: {
        query: auth ? GET_USER_BASIC_INFO : undefined,
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