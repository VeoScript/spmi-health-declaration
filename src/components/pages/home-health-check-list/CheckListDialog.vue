<template>
  <v-dialog class="preview-modal"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
            v-model="show">
    <v-card class="gray">
      <v-toolbar class="dgbox">
        <v-btn
          icon
          @click="show = !show"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Preview Health Checklist</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <slot name="btn-save-health"></slot>
        </v-toolbar-items>
      </v-toolbar>
      <v-alert border="bottom"
               color="error darken-1"
               dark
               dismissible
               v-show="error"
               type="error">
        {{ error }}
      </v-alert>
      <!-- Preview checklist selected and the user basic info... -->
      <v-container  class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col sm="6" md="6" cols="12">
            <v-card flat outlined>
              <v-card-title>CHECKLIST RESULT</v-card-title>
              <v-card-subtitle class="font-italic">
                <strong>
                  {{ getCurrentDate }}
                </strong>
              </v-card-subtitle>
              <v-container>
                <slot name="purpose"></slot>
                <slot name="symptoms"></slot>
                <slot name="travel-history"></slot>
                <v-row class="ml-5">
                  <v-col cols="12">
                    <slot name="family-tested"></slot>
                  </v-col>
                </v-row>
                <v-row class="ml-5">
                  <v-col cols="12">
                    <slot name="neighbor-tested"></slot>
                  </v-col>
                </v-row>
                <v-divider class="mx-5"></v-divider>
                <v-row class="justify-center">
                  <v-col sm="12" md="12" cols="12">
                    <div class="text-justify mx-5 gray--text font-weight-light subtitle-2 font-italic">
                      I hereby authorize SPMI, to collect and process the data indicated herein for the purpose of effective control of the COVID-19 infection. I understand that my personal information is protected by RA 10173, Data Privacy Act of 2012, and that I am required by RA 11469, Bayanihan to Heal as One Act, to provide truthful information. <br> 
                    </div>
                    <v-row class="justify-center">
                      <v-col sm="8" md="8" cols="12">
                        <span class="body-2 font-weight-medium">If you agree type your password to confirm.</span>
                        <slot name="confirm-password"></slot>
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
    name: 'preview-modal',
    props: {
      visible: {
        type: Boolean,
        required: true
      },
      error: {
        type: String,
        required: false,
        default: ''
      }
    },
    computed: {
      show: {
        get () {
          return this.visible
        },
        set (value) {
          if (!value) {
            this.$emit('close-dialog')
          }
        }
      },
      getCurrentDate () {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
       return today
      }
    }
  }
</script>