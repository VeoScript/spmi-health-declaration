<template>
  <span>
    {{ format_date(created_at) }}
  </span>
</template>

<script>
  import moment from 'moment'
  export default {
    props: {
      created_at: {
        type: String,
        required: true
      }
    },
    methods: {
      format_date(value) {
        return moment(String(value)).format('MM/D/YYYY - h:mm A')
      }
    }
  }
</script>