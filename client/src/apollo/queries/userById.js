import gql from 'graphql-tag'

export const USER_BY_ID = gql`
  query($userId: ID) {
    userById(userId: $userId) {
      id
      email
      username
      avatar
      jwt
      createdAt
    }
  }
`
