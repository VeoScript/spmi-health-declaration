<template>
  <div class="dashboard">
    <!-- <div class="defaulttxt-h text-center mt-5">Covid-19 Health Declaration</div> -->
    <v-container fluid>
      <v-form>
        <v-row no-gutters>
          <v-col sm="12" md="12" cols="12">
            <!-- INFO CARD -->
            <info-card/>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col sm="6" md="6" cols="12">
            <!-- SYMPTOMS CARD -->
            <symptoms-card/>
          </v-col>

          <v-col sm="6" md="6" cols="12">
            <!-- TRAVEL HISTORY CARD -->
            <travel-history-card/>
          </v-col>

          <v-col sm="12" md="12" cols="12" class="mt-3 text-right">
            <check-list-dialog/>
            <v-btn color="secondary" class="mx-2">
              cancel
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "HealthChecklist",
  components: {
    SymptomsCard: () => import('@/components/Cards/SymptomsCard'),
    TravelHistoryCard: () => import('@/components/Cards/TravelHistoryCard'),
    InfoCard: () => import('@/components/Cards/InfoCard'),
    CheckListDialog: () => import('@/components/Cards/CheckListDialog')
  }
};
</script>
