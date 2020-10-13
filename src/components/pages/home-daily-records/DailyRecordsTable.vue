<template>
  <v-card flat outlined>
    <v-card-title>
      Health Declaration
      <v-spacer></v-spacer>
      <slot name="search-record"></slot>
    </v-card-title>
    <v-card-subtitle>Daily Records</v-card-subtitle>
    <v-data-table
      :headers="headers"
      :items="dailyRecords"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
  export default {
    props: {
      dailyRecords: {
        type: Array,
        required: true
      },
      search: {
        type: String,
        required: true
      },
      headers: {
        type: Array,
        required: true
      }
    }
  }
</script>