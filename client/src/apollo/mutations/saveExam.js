import gql from 'graphql-tag'

export const SAVE_EXAM = gql`
  mutation($input: ExamInput) {
    saveExam(input: $input) {
      success
      message
      exam {
        id
      }
    }
  }
`
