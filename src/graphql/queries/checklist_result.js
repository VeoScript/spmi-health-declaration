import gql from 'graphql-tag'

export const CHECKLIST_RESULT_QUERY = gql`
  query healthResultQuery($firebase_id: String!) {
    checklist_result(where: {user: {firebase_id: {_eq: $firebase_id}}}, order_by: {created_at: desc}) {
      id
      symptoms
      travel_outside_country
      travel_local_country
      purpose
      familyTested
      neighborTested
      created_at
    }
  }
`