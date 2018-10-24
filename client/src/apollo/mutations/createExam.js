import gql from 'graphql-tag'

export const CREATE_EXAM = gql`
  mutation($input: ExamInput) {
    createExam(input: $input) {
      success
      message
    }
  }
`
