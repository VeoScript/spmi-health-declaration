<template>
  <div>
    <v-row align="center" justify="center" class="mb-3">
      <slot name="info-title"></slot> 
    </v-row>
    <v-row align="center" justify="center">
      <slot name="user-fullname"></slot>
    </v-row>
    <v-row align="center" justify="center">
      <slot name="user-details"></slot>
    </v-row>
  </div>
</template>