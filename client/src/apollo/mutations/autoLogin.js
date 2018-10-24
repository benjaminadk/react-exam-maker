import gql from 'graphql-tag'

export const AUTOLOGIN = gql`
  mutation {
    autoLogin {
      success
      message
      user {
        id
        email
        username
        avatar
        jwt
        createdAt
      }
    }
  }
`
