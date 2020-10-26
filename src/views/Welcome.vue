<template>
  <v-app>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-card flat>
          <v-card-text class="text-right">
            <v-img src='@/assets/spmi_official.png' max-width="450"/>
            <p>BRGY. HILAPNITAN, BAYBAY CITY, LEYTE</p>
            <h2>Covid-19 Health Declaration</h2>
          </v-card-text>
          <v-card-actions>
            <v-btn x-large 
                  block 
                  color="blue darken-2" 
                  dark to="/login"
                  tile
                  depressed>
              Login Here!
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </v-app>
</template>