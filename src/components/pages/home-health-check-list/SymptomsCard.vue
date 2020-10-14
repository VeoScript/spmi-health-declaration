<template>
  <v-card id="defaultcard" class="mx-1 mb-3" flat outlined>
  	<v-card-title>Symptoms</v-card-title>
    <v-card-subtitle>
    	Please check if you have any of the following at present or during the past 30 days.
    </v-card-subtitle>
    <v-container class="pl-5 pr-5 pb-5">
    	<slot name="symptoms"></slot> 
    </v-container>
  </v-card>
</template>