import gql from 'graphql-tag'

export const PUBLIC_EXAMS = gql`
  query {
    publicExams {
      id
      public
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
