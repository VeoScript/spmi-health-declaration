<template>
  <v-card flat outlined style="min-height: 100vh;">
    <v-card-title>
      Health Declaration
      <v-spacer></v-spacer>
      <slot name="search-record"></slot>
    </v-card-title>
    <v-card-subtitle>Daily Records</v-card-subtitle>
    <slot name="data-records"></slot>
  </v-card>
</template>