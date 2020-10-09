import gql from 'graphql'

export const GET_ACCOUNT_TYPE_QUERY = gql`
  query userAccountTypeQuery($firebase_id: String) {
    users(where: {firebase_id: {_eq: $firebase_id}}) {
      id
      account_type
    }
  }
`