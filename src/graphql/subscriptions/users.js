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

export const GET_ACCOUNT_TYPE_SUBSCRIPTION = gql`
  subscription userAccountTypeSubscription($firebase_id: String) {
    users(where: {firebase_id: {_eq: $firebase_id}}) {
      id
      account_type
    }
  }
`


export const GET_USER_BY_COMPANY_SUBSCRIPTION = gql`
  subscription userCompanySubscription($company: String!) {
    users(where: {company: {_eq: $company}}) {
      id
      firebase_id
      firstname
      middlename
      lastname
      gender
      age
      email
      contact_number
      occupation
    }
  }
`