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
  <v-navigation-drawer app v-model="drawer">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          <v-img src='@/assets/spmi_official.png' max-width="120"/>
        </v-list-item-title>
        <v-list-item-subtitle>
          COVID-19 HEALTH DECLARATION
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list
      dense
      nav
    >
    
      <router-link to="/">
        <v-list-item
          link
        >
          <v-list-item-icon>
            <v-icon>mdi-comment-check</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Health Checklist</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
      
      <router-link to="/">
        <v-list-item
          link
        >
          <v-list-item-icon>
            <v-icon>mdi-file</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Daily Records</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>

      <router-link to="/">
        <v-list-item
          link
        >
          <v-list-item-icon>
            <v-icon>mdi-account-box</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>

      <router-link to="/">
        <v-list-item
          link
        >
          <v-list-item-icon>
            <v-icon>mdi-account-lock</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Administrator</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>

      <router-link to="/">
        <v-list-item
          link
        >
          <v-list-item-icon>
            <v-icon>mdi-account-arrow-right</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Sign Out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
    </v-list>
  </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  components: {
    //SideBar: () => import('@/components/SideBar'),
  },
  data: () => ({
    drawer: null
  })
}
</script>

<style>

</style>