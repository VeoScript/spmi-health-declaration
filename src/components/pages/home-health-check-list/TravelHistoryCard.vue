<template>
  <v-card id="defaultcard" class="mx-1" flat outlined>
    <v-card-title>Travel History</v-card-title>
    <v-card-subtitle>
      Please check if you have travelled any of the following areas for the past 3 months.
    </v-card-subtitle>
    <v-container class="pl-5 pr-5 pb-5">
      <slot name="travel-history"></slot>
    </v-container>
  </v-card>
</template>