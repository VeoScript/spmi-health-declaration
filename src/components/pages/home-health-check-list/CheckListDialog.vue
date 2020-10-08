<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        v-bind="attrs"
        v-on="on"
      >
        Preview
      </v-btn>
    </template>
    <v-card style="background: #fff;">
      <v-toolbar class="dgbox">
        <v-btn
          icon
          @click="dialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Preview Health Checklist</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <!-- Preview checklist selected and the user basic info... -->
      <v-container fluid>
        <v-row class="justify-center">
          <v-col sm="7" md="7" cols="12">
            <v-card id="defaultcard">
              <v-card-title>BASIC INFORMATION</v-card-title>
              <v-card-subtitle>09/23/2020</v-card-subtitle>
              <v-container fluid>
                <v-row>
                  <v-col sm="12" md="12" cols="12">
                    <v-text-field
                      label="Purpose(s)"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col sm="4" md="4" cols="12">
                    <v-text-field
                      value="Villaruel"
                      label="Last Name"
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col sm="4" md="4" cols="12">
                    <v-text-field
                      value="Jerome Joseph"
                      label="First Name"
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col sm="4" md="4" cols="12">
                    <v-text-field
                      value="Robiato"
                      label="Middle Name"
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col sm="3" md="3" cols="12">
                    <v-text-field
                      value="22"
                      label="Age"
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col sm="3" md="3" cols="12">
                    <v-text-field
                      value="Male"
                      label="Gender"
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col sm="3" md="3" cols="12">
                    <v-text-field
                      value="Single"
                      label="Civil Status"
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col sm="3" md="3" cols="12">
                    <v-text-field
                      value="Filipino"
                      label="Nationality"
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col sm="6" md="6" cols="12">
                    <v-text-field
                      value="09753286466"
                      label="Contact No."
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col sm="6" md="6" cols="12">
                    <v-text-field
                      value="IT Coordinator"
                      label="Occupation"
                      outlined
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
          <v-col sm="5" md="5" cols="12">
            <v-card id="defaultcard">
              <v-card-title>CHECKLIST RESULT</v-card-title>
              <v-container fluid>
                <v-row>
                  <v-col sm="12" md="12" cols="12">
                    <span>Symptoms</span><br>
                    <span>- <strong>None of the Above</strong></span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col sm="12" md="12" cols="12">
                    <span>Travel History</span><br>
                    <span>- <strong>None of the Above</strong></span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col sm="12" md="12" cols="12">
                    <span>Do you have a family members tested for covid-19 RT-PCR test?</span><br>
                    <span>- <strong>No</strong></span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col sm="12" md="12" cols="12">
                    <span>Do you have a neighbors tested for covid-19 RT-PCR test?</span><br>
                    <span>- <strong>No</strong></span>
                  </v-col>
                </v-row>
                <hr>
                <v-row class="justify-center">
                  <v-col sm="12" md="12" cols="12">
                    <div class="defaulttxt-p2 text-center">
                      I hereby authorize SPMI, to collect and process the data idicated
                      herein for the purpose of effecting control of the COVID-19 infection.
                      I understand that my personal information is protected by 
                      RA 10173, Data Privacy Act of 2012,
                      and that I am required by RA 11469, Bayanihan to Heal as One Act,
                      to provide truthful information. <br> <br>

                      if you agree type your password to confirm.
                    </div>
                    <v-row class="justify-center">
                      <v-col sm="8" md="8" cols="12">
                        <v-text-field
                          label="Password"
                          type="password"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
      }
    },
  }
</script>