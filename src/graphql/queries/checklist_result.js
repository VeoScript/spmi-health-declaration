import gql from 'graphql-tag'

export const CHECKLIST_RESULT_QUERY = gql`
	query healthResultQuery($user_id: uuid!) {
		checklist_result(where: {user_id: {_eq: $user_id}}) {
			id
			symptoms
			travel_outside_country
			travel_local_country
			purpose
			created_at
		}
	}
`