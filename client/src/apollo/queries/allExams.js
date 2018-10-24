import gql from 'graphql-tag'

export const ALL_EXAMS = gql`
  query {
    allExams {
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
