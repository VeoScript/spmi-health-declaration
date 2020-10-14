<template>
  <v-card flat outlined style="min-height: 100vh;">
    <v-card-title>
      Administrator Controls
    </v-card-title>
    <v-card-subtitle>Records by each company</v-card-subtitle>
    <company-tabs
      :companies="companyList"
    >
      <template #spmi-company="{ company }">
        <company-data-table :company="company"/> <!-- SPMI DATA TABLE -->
      </template>
      <template #vaci-company="{ company }">
        <company-data-table :company="company"/> <!-- SPMI DATA TABLE -->
      </template>
      <template #gcc-company="{ company }">
        <company-data-table :company="company"/> <!-- GCC DATA TABLE -->
      </template>
      <template #security-company="{ company }">
        <company-data-table :company="company"/> <!-- SECURITY DATA TABLE -->
      </template>
    </company-tabs> <!-- COMPANY TABS -->
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        companyList: ['spmi', 'vaci', 'gcc', 'security']
      }
    },
    components: {
      CompanyTabs: () => import('./CompanyTabs'),
      CompanyDataTable: () => import('./CompanyDataTable')
    }
  }
</script>