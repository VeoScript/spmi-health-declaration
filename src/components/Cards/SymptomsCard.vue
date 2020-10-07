<template>
  <v-card id="defaultcard" class="mx-1 mb-3">
  	<v-card-title>Symptoms</v-card-title>
    <v-card-subtitle>
    	Please check if you have any of the following at present or during the past 30 days.
    </v-card-subtitle>
    <v-container class="pl-5 pr-5 pb-5">
    	<v-row no-gutters>
      	<v-col sm="6" md="6" cols="12">
        	<v-checkbox
          	label="Fever"
            value="Fever"
            hide-details
          ></v-checkbox>
          <v-checkbox
          	label="Headache"
            value="Headache"
            hide-details
          ></v-checkbox>
          <v-checkbox
          	label="Sore Throat"
            value="Sore Throat"
            hide-details
          ></v-checkbox>
          <v-checkbox
          	label="Body Weakness/Pain"
            value="Body Weakness/Pain"
            hide-details
          ></v-checkbox>
          <v-checkbox
          	label="Cough"
            value="Cough"
            hide-details
          ></v-checkbox>
          <v-checkbox
          	label="Difficulty in Breathing"
            value="Difficulty in Breathing"
            hide-details
          ></v-checkbox>
          <v-checkbox
          	label="None of the Above"
            value="None of the Above"
            hide-details
          ></v-checkbox>
			  </v-col>
      </v-row>
      <br>
      <hr>
      <br>
      <v-row no-gutters>
        <v-col sm="12" md="12" cols="12" >
          <span>
            Do you have a family members tested for
            covid-19 RT-PCR test?  
          </span>
          <v-checkbox
          	label="Yes"
            value="Yes"
            hide-details
          ></v-checkbox>
          <v-checkbox
          	label="No"
            value="No"
            hide-details
          ></v-checkbox>
        </v-col>
      </v-row>
      <br>
      <v-row no-gutters>
        <v-col sm="12" md="12" cols="12" >
          <span>
            Do you have a neighbors tested for
            covid-19 RT-PCR test?
          </span>
          <v-checkbox
          	label="Yes"
            value="Yes"
            hide-details
          ></v-checkbox>
          <v-checkbox
          	label="No"
            value="No"
            hide-details
          ></v-checkbox>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>