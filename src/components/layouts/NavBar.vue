<template>
  <div class="navbar my-5">
    <!-- NAVBAR VIEW COMPONENT -->
    <v-app-bar
      class="navbartoolbar"
      absolute
      color="white"
      elevate-on-scroll
    >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    
    <v-toolbar-title>
      <router-link to="/"><v-img src='@/assets/spmi_official.png' max-width="120"/></router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list id="defaultcard">
        <router-link to="/about">
          <v-list-item link>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link to="/">
          <v-list-item link>
            <v-list-item-title>Help</v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link to="/">
          <v-list-item link>
            <v-list-item-title>Terms & Conditions</v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list>
    </v-menu>
  </v-app-bar>

  <!-- SIDEBAR VIEW COMPONENT -->
  <side-bar
    :visible="drawer"
    @close="drawer = false"
  />
  
  </div>
</template>

<script>
  export default {
    name: 'NavBar',
    components: {
      SideBar: () => import('./SideBar'),
    },
    data () {
      return {
        drawer: true
      }
    }
  }
</script>

<style>

</style>