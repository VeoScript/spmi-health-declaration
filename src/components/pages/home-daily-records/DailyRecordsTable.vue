<template>
  <v-hover v-slot="{ hover }">
    <v-card flat style="min-height: 100vh;" :elevation="hover ? 12 : 1">
      <v-card-title>
        Health Declaration
        <v-spacer></v-spacer>
        <slot name="search-record"></slot>
      </v-card-title>
      <v-card-subtitle>Daily Records</v-card-subtitle>
      <slot name="data-records"></slot>
    </v-card>
  </v-hover>
</template>