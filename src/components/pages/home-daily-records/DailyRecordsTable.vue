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
    >
      <!-- Purpose -->
      <template #item.purpose="{ item }">
        <span class="text-uppercase">{{ item.purpose }}</span>
      </template>
      <!-- Date Format -->
      <template #item.created_at="{ item }">
        <date-format :created_at="item.created_at.split('T')[0]"/>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
  export default {
    components: {
      DateFormat: () => import('@/components/mixins/DateFormat')
    },
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