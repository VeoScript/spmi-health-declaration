import gql from 'graphql-tag'

export const GET_USER_BASIC_INFO_SUBSCRIPTION = gql`
  subscription userBasicInfoSubscription($firebase_id: String) {
    users(where: {firebase_id: {_eq: $firebase_id}}) {
      id
      lastname
      firstname
      middlename
      company
      occupation
      password
    }
  }
`