import gql from 'graphql-tag'

export const GET_USER_BASIC_INFO_SUBSCRIPTION = gql`
  subscription userBasicInfoSubscription($firebase_id: String) {
    users(where: {firebase_id: {_eq: $firebase_id}}) {
      id
      lastname
      firstname
      middlename
      company
      department
      occupation
      birthday
      gender
      nationality
      address
      civil_status
      contact_number
      email
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
      birthday
      email
      contact_number
      occupation
      address
    }
  }
`

export const USER_HEALTH_RESULT_SUBSCRIPTION_BY_ID = gql`
  subscription getUserById($id: uuid!){
    users(where: {id: {_eq: $id}}) {
      id
      birthday
      lastname
      middlename
      nationality
      address
      occupation
      gender
      firstname
      email
      department
      created_at
      contact_number
      civil_status
      company
      health_result(order_by: {created_at: desc}) {
        id
        familyTested
        created_at
        neighborTested
        purpose
        symptoms
        travel_local_country
        travel_outside_country
      }
    }
  }
`