<template>
  <v-container>
    <v-card
      class="mx-auto"
      max-width="400"
    >
      <slot name="header-text"></slot>
      <v-spacer></v-spacer>
      <v-card-text class="text-h2 font-weight-bold text-center align-center justify-center" style="min-height: 20vh;">
        <slot name="total-result"></slot>
      </v-card-text>
      <v-spacer></v-spacer>
    </v-card>
  </v-container>
</template>