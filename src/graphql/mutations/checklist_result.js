import gql from 'graphql-tag'

export const ADD_HEALTH_DECLARATION_MUTATION = gql`
  mutation addHealtCheckMutation($user_id: uuid!, $purpose: String!, $symptoms: String!, $travel_outside_country: String!, $travel_local_country: String!, $familyTested: String!, $neighborTested: String!) {
    insert_checklist_result(objects: {user_id: $user_id, purpose: $purpose, symptoms: $symptoms, travel_outside_country: $travel_outside_country, travel_local_country: $travel_local_country, familyTested: $familyTested, neighborTested: $neighborTested}) {
      affected_rows
      returning {
        id
        user_id
      }
    }
  }
`