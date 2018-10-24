import gql from 'graphql-tag'

export const MY_EXAMS = gql`
  query {
    myExams {
      id
      author
      title
      code
      pass
      time
      cover {
        variant
        text
      }
      test {
        variant
        question {
          variant
          text
        }
        choices {
          label
          text
        }
        answer
        explanation {
          variant
          text
        }
      }
    }
  }
`
