<template>
  <div>
    <!-- NAVBAR VIEW COMPONENT -->
    <v-app-bar 
      app
      flat
      clipped-left
      color="white"
    >

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      
      <v-toolbar-title>
        <router-link to="/"><v-img :src='require(`@/assets/spmi_official.png`)' max-width="120"/></router-link>
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
        <v-list>
          <v-list-item 
            v-for="(link, i) in options" :key="i"
            link
            :to="link.to"
          >
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- SIDEBAR VIEW COMPONENT -->
    <side-bar
      :visible="drawer"
      @close="drawer = false"
    ></side-bar>
  
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
        drawer: true,
        options: [
          { text: 'About', to: '/v/about'},
          { text: 'Help', to: '/v/help'},
          { text: 'Terms and Condition', to: '/v/terms-condition'}
        ]
      }
    }
  }
</script>

<style>
</style>