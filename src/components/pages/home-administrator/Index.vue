<template>
  <v-card flat style="min-height: 100vh;">
    <v-toolbar dark flat color="blue darken-1">
      <v-toolbar-title>
        <v-icon left>mdi-server-security</v-icon> Administrator View
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="dialog = true"
             depressed
             text
             rounded
             outlined>
        <v-icon left>mdi-earth</v-icon> Statistic Result
      </v-btn>
      <statistic-dialog :visible="dialog"
                        @close="dialog = false">
      </statistic-dialog>
    </v-toolbar>
    <router-view></router-view> <!-- DYNAMIC CONTENT LOADED -->
  </v-card>
</template>

<script>
  export default {
    components: {
      StatisticDialog: () => import('./general-results/StatisticDialog')
    },
    data () {
      return {
        dialog: false
      }
    }
  }
</script>