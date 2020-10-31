<template>
  <v-dialog max-width="1200px" v-model="show">
    <v-card color="basil" min-height="80vh">
      <v-card-title class="text-center justify-center py-6">
        <h2 class="font-weight-medium display">
          <v-icon left large>mdi-clipboard-text</v-icon> Statistic Result
        </h2>
      </v-card-title>
    </v-card>
  </v-dialog> 
</template>

<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      show: {
        get () {
          return this.visible
        },
        set (value) {
          if (!value) {
            this.$emit('close')
          }
        }
      }
    }
  }
</script>