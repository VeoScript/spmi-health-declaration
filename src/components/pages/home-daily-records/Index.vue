<template>
  <div class="dailyrecords">
    <v-container class="mt-5" fluid>
      <!-- daily records table view -->
      <daily-records-table />
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'dailyrecords',
  components: {
    DailyRecordsTable: () => import('@/components/pages/home-daily-records/DailyRecordsTable')
  }
}
</script>