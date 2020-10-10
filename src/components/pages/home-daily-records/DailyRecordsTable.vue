<template>
  <v-card flat>
    <v-card-title>
      Health Declaration
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-card-subtitle>Daily Records</v-card-subtitle>
    <v-data-table
      :headers="headers"
      :items="dailyrecord"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'DATE',
            align: 'start',
            sortable: false,
            value: 'date',
          },
          { text: 'SYMPTOMS', value: 'symptoms' },
          { text: 'TRAVEL HISTORY', value: 'travelhistory' },
          { text: 'PURPOSE(S)', value: 'purpose' },
        ],
        dailyrecord: [
          {
            date: '09-13-2020',
            symptoms: 'None of the Above',
            travelhistory: 'None of the Above',
            purpose: 'DUTY',
          },
          {
            date: '09-14-2020',
            symptoms: 'Fever, Headache, Sore Throat, Cough',
            travelhistory: 'Metro Manila,  Tacloban City',
            purpose: 'VISIT',
          },
          {
            date: '09-15-2020',
            symptoms: 'Headache',
            travelhistory: 'Ormoc City',
            purpose: 'DUTY',
          },
        ],
      }
    },
  }
</script>