import gql from 'graphql-tag'

export const PUBLIC_EXAMS_PAG = gql`
  query($first: Int, $after: String, $search: String) {
    publicExamsPag(first: $first, after: $after, search: $search) {
      totalCount
      edges {
        cursor
        node {
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
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`
