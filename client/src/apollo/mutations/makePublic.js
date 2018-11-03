import gql from 'graphql-tag'

export const MAKE_PUBLIC = gql`
  mutation($examId: ID, $bool: Boolean) {
    makePublic(examId: $examId, bool: $bool) {
      success
      message
    }
  }
`
