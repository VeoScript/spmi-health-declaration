<template>
  <v-card id="defaultcard" class="mx-1" flat outlined>
    <v-card-title>Travel History</v-card-title>
    <v-card-subtitle>
      Please check if you have travelled any of the following areas for the past 3 months.
    </v-card-subtitle>
    <v-container class="pl-5 pr-5 pb-5">
      <v-row no-gutters>
        <v-col sm="12" md="12" cols="12">
          <div class="defaulttxt-p">Outside of the Country</div>
        </v-col>
        <v-col sm="6" md="6" cols="12">
          <v-checkbox
            label="China"
            value="China"
            hide-details
          ></v-checkbox>
          <v-checkbox
            label="Japan"
            value="Japan"
            hide-details
          ></v-checkbox>
          <v-checkbox
            label="South Korea"
            value="South Korea"
            hide-details
          ></v-checkbox>
          <v-checkbox
            label="Iran"
            value="Iran"
            hide-details
          ></v-checkbox>
        </v-col>
        <v-col sm="6" md="6" cols="12">
          <v-checkbox
            label="USA"
            value="USA"
            hide-details
          ></v-checkbox>
          <v-checkbox
            label="Paris"
            value="Paris"
            hide-details
          ></v-checkbox>
          <v-checkbox
            label="None of the Above"
            value="None of the Above"
            hide-details
          ></v-checkbox>
        </v-col>
        <v-col sm="12" md="12" cols="12" class="mt-3">
          <v-text-field
            label="Others"
            clearable
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col sm="12" md="12" cols="12">
          <div class="defaulttxt-p">Local Area</div>
        </v-col>
        <v-col sm="6" md="6" cols="12">
          <v-checkbox
            label="Metro Manila"
            value="Metro Manila"
            hide-details
          ></v-checkbox>
          <v-checkbox
            label="Cebu City"
            value="Cebu City"
            hide-details
          ></v-checkbox>
          <v-checkbox
            label="Quezon City"
            value="Quezon City"
            hide-details
          ></v-checkbox>
          <v-checkbox
            label="Dumaguete"
            value="Dumaguete"
            hide-details
          ></v-checkbox>
        </v-col>
        <v-col sm="6" md="6" cols="12">
          <v-checkbox
            label="Ormoc City"
            value="Ormoc City"
            hide-details
          ></v-checkbox>
          <v-checkbox
            label="Tacloban City"
            value="Paris"
            hide-details
          ></v-checkbox>
          <v-checkbox
            label="None of the Above"
            value="None of the Above"
            hide-details
          ></v-checkbox>
        </v-col>
        <v-col sm="12" md="12" cols="12" class="mt-3">
          <v-text-field
            label="Others"
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>