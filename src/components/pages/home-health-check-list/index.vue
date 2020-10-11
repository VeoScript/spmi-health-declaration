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
            </user-card>

          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col sm="6" md="6" cols="12">

            <!-- SYMPTOMS CARD -->
            <symptoms-card

            />
          </v-col>

          <v-col sm="6" md="6" cols="12">
            <!-- TRAVEL HISTORY CARD -->
            <travel-history-card

            />
          </v-col>
          

          
          <check-list-preview-dialog 
            :visible="dialog"
            @close-dialog="dialog = false"
          />

          <v-col sm="12" md="12" cols="12" class="mt-3 text-right">
            <v-btn
              color="primary"
              depressed
              large
              @click="dialog = true"
            >
              Preview
            </v-btn>
            <v-btn color="secondary" class="mx-2" large outlined>
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
        dialog: false
      }
    },
    apollo: {
      users: {
        query: gql`
          query userAccountTypeQuery($firebase_id: String) {
            users(where: {firebase_id: {_eq: $firebase_id}}) {
              id
              lastname
              firstname
              middlename
              company
              occupation
            }
          }
        `,
        variables () {
          return {
            firebase_id: auth ? auth.currentUser.uid : undefined
          }
        }
      }
    }
  }
</script>
