<template>
  <v-hover v-slot="{ hover }">
    <v-card flat :elevation="hover ? 12 : 1">
      <v-card-title>Symptoms</v-card-title>
      <v-card-subtitle>
        Please check if you have any of the following at present or during the past 30 days.
      </v-card-subtitle>
      <v-container>
        <slot name="symptoms"></slot> 
      </v-container>
    </v-card>
  </v-hover>
</template>