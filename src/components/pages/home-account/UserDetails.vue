<template>
  <div>
    <v-row align="center" justify="center" class="mb-3">
      <slot name="user-title"></slot>
    </v-row>
    <slot 
      name="user-text-fields" 
      v-for="user in users"
      :user="user"
    ></slot>
  </div>
</template>

<script>
  export default {
    props: {
      users: {
        type: Array,
        required: true
      }
    }
  }
</script>