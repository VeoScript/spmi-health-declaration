<template>
  <div>
    <v-tabs v-model="tab"
            grow
            background-color="transparent">
      <v-tab v-for="company in companies" :key="company"
            class="tab-custom">
        {{ company }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="company in companies" :key="company">
        <v-card flat>
          <slot :name="`${company}-company`" :company="company"></slot>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
  export default {
    props: {
      companies: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        tab: null
      }
    }
  }
</script>

<style scoped>
  .tab-custom {
    border-bottom: 1px solid lightgray;
  }
</style>