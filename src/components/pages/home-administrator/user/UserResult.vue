<template>
  <v-card flat>
    <v-card-actions>
      <v-icon left>mdi-calendar-plus</v-icon> Health Records
      <v-spacer></v-spacer>
      <v-btn depressed 
             class="text-capitalize" 
             outlined 
             text 
             color="success"
             @click="$router.push('/v/admin/company')">
        <v-icon left>mdi-arrow-left</v-icon> Return</v-btn>
    </v-card-actions>
    <!-- <v-row justify="center">
      <v-btn-toggle>
        <v-btn>
          All
        </v-btn>
        <v-menu
          bottom
          transition="slide-x-transition"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
            >
              Select Month
            </v-btn>
          </template>
          <v-list max-height="250">
            <v-list-item
              v-for="(month, mIndex) in months"
              :key="mIndex"
              link
            >
              <v-list-item-title>{{ month }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu
          bottom
          transition="slide-x-transition"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
            >
              Select Year
            </v-btn>
          </template>
          <v-list max-height="250">
            <v-list-item
              v-for="(year, yIndex) in years"
              :key="yIndex"
              link
            >
              <v-list-item-title>{{ year }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn-toggle>
    </v-row> -->
    <slot name="user-data-table"></slot>
  </v-card>
</template>

<script>
  import moment from 'moment'
  export default {
    data () {
      return {
        years: [],
        months: []
      }
    },
    methods: {
      generateYear () {
        const years = []
        const dateStart = moment()
        const dateEnd = moment().add(10, 'y')
        while (dateEnd.diff(dateStart, 'years') >= 0) {
          years.push(dateStart.format('YYYY'))
          dateStart.add(1, 'year')
        }
        return this.years.push(...years)
      },
      generateMonth () {
        const months = []
        const dateStart = moment()
        const dateEnd = moment().add(12, 'month')
        while (dateEnd.diff(dateStart, 'months') >= 0) {
          months.push(dateStart.format('MMMM'))
          dateStart.add(1, 'month')
        }
        return this.months.push(...months)
      }
    },
    mounted () {
      this.generateYear()
      this.generateMonth()
    }
  }
</script>