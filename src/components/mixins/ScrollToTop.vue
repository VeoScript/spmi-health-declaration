<template>
  <v-scale-transition>
    <v-btn
      fab
      v-show="fab"
      v-scroll="onScroll"
      dark
      fixed
      bottom
      right
      color="primary darken-1"
      @click="toTop"
    >
      <v-icon>mdi-arrow-up</v-icon>
    </v-btn>
  </v-scale-transition>
</template>

<script>
  export default {
    name: 'scroll-to-top',

    data () {
      return {
          fab: null
      }
    },
    
    created() {
      const top = window.pageYOffset || 0;
      if (top <= 60) {
        this.color = "transparent";
        this.flat = true;
      }
    },
    watch: {
      fab(value) {
        if (value) {
          this.color = "secondary";
          this.flat = false;
        } else {
          this.color = "transparent";
          this.flat = true;
        }
      }
    },
    methods: {
      onScroll(e) {
      if (typeof window === "undefined") return;
        const top = window.pageYOffset || e.target.scrollTop || 0;
        this.fab = top > 60;
      },
      toTop() {
        this.$vuetify.goTo(0);
      }
    }
  }
</script>