import gql from 'graphql-tag'

export const DELETE_EXAM = gql`
  mutation($examId: ID) {
    deleteExam(examId: $examId) {
      success
      message
    }
  }
`
