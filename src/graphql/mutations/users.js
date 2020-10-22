import gql from 'graphql-tag'

export const ADD_USERS_MUTATION = gql`
  mutation addUserMutation($firebase_id: String!, $lastname: String, $firstname: String, $middlename: String, $gender: String, $civil_status: String, $contact_number: String, $occupation: String, $department: String, $company: String, $email: String, $password: String, $nationality: String, $address: String, $birthday: String) {
    insert_users(objects: {firebase_id: $firebase_id, lastname: $lastname, firstname: $firstname, middlename: $middlename, gender: $gender, civil_status: $civil_status, contact_number: $contact_number, occupation: $occupation, department: $department, company: $company, email: $email, password: $password, nationality: $nationality, address: $address, birthday: $birthday}) {
      affected_rows
      returning {
          id
          firebase_id
          firstname
          lastname
      }
    }
  }
`