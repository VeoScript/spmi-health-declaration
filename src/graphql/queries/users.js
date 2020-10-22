import gql from 'graphql-tag'

export const GET_ACCOUNT_TYPE_QUERY = gql`
  query userAccountTypeQuery($firebase_id: String) {
    users(where: {firebase_id: {_eq: $firebase_id}}) {
      id
      account_type
    }
  }
`

export const GET_USER_BASIC_INFO = gql`
  query userBasicInfoQuery($firebase_id: String) {
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

export const GET_USER_BY_COMPANY_QUERY = gql`
  query userCompanyQuery($company: String!) {
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

export const USER_HEALTH_RESULT_QUERY_BY_ID = gql`
  query getUserById($id: uuid!){
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
        created_at
      }
    }
  }
`