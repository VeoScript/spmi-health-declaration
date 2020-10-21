<template>
  <company-tabs :companies="companyList">
    <template #spmi-company="{ company }">
      <company-data-table :company="company"/> <!-- SPMI DATA TABLE -->
    </template>
    <template #vaci-company="{ company }">
      <company-data-table :company="company"/> <!-- SPMI DATA TABLE -->
    </template>
    <template #ggc-company="{ company }">
      <company-data-table :company="company"/> <!-- GCC DATA TABLE -->
    </template>
    <template #security-company="{ company }">
      <company-data-table :company="company"/> <!-- SECURITY DATA TABLE -->
    </template>
  </company-tabs> <!-- COMPANY TABS -->
</template>

<script>
  export default {
    data () {
      return {
        companyList: ['spmi', 'vaci', 'ggc', 'security']
      }
    },
    components: {
      CompanyTabs: () => import('./CompanyTabs'),
      CompanyDataTable: () => import('./CompanyDataTable')
    }
  }
</script>