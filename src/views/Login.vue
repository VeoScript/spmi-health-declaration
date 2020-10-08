<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>

        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card flat>
              <v-card-text align="center" justify="center">
                <v-img src='@/assets/spmi_official.png' max-width="190"/>
                <p>Covid-19 Health Declaration</p>
              </v-card-text>
              <v-card-text>
                <v-form
                  ref="form"
                  lazy-validation
                >
                  <v-text-field
                    label="Email"
                    prepend-inner-icon="mdi-email-outline"
                    type="email"
                    autocomplete="off"
                    filled
                    rounded
                    class="font-weight-light rounded-sm"
                  ></v-text-field>

                  <v-text-field
                    label="Password"
                    prepend-inner-icon="mdi-lock-outline"
                    autocomplete="off"
                    filled
                    rounded
                    class="font-weight-light rounded-sm"
                  ></v-text-field>
                </v-form>

              </v-card-text>
              <v-card-actions>
                
                <v-btn 
                  text 
                  color="primary"
                  class="text-capitalize"
                > 
                  Create Account
                </v-btn>

                <v-spacer></v-spacer>
                <v-btn 
                  depressed
                  dark
                  large
                  tile
                  color="blue"
                  class="text-capitalize"
                >
                Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: 'login'
  }
</script>