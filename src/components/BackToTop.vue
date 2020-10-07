<template>
  <!-- <back-to-top bottom="50px" right="50px">
    <v-button type="button" class="btn btn-info btn-to-top"><v-icon>mdi-arrow-up-bold-circle</v-icon></v-button>
  </back-to-top> -->
  <back-to-top class="backtotop" @scrolled="myFunction"><v-icon class="btt-icon">mdi-arrow-up</v-icon></back-to-top>
</template>

<style lang="scss">
  .backtotop {
    background: #333;
    border-radius: 100%;
    padding: 5px;
    opacity: 0.6;

    .btt-icon{
      color: #fff;
      font-size: 30px;
    }
  }
</style>