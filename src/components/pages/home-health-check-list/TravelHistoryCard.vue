<template>
  <v-hover v-slot="{ hover }">
    <v-card :elevation="hover ? 12 : 1" flat>
      <v-card-title>Travel History</v-card-title>
      <v-card-subtitle>
        Please check if you have travelled any of the following areas for the past 3 months.
      </v-card-subtitle>
      <v-container>
        <slot name="travel-history"></slot>
      </v-container>
    </v-card>
  </v-hover>
</template>