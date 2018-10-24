import { ApolloClient } from 'apollo-client'
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink, concat, split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const httpLink = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      )
    if (networkError) console.log(`[Network error]: ${networkError}`)
  }),
  new HttpLink({
    uri:
      process.env.NODE_ENV === 'production'
        ? `https://${process.env.REACT_APP_PROD}/graphql`
        : `http://localhost:${process.env.REACT_APP_SERVER_PORT}/graphql`,
    credentials: 'same-origin'
  })
])

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('TOKEN') || null
    }
  })
  return forward(operation)
})

const wsLink = new WebSocketLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? `wss://${process.env.REACT_APP_PROD}/graphql`
      : `ws://localhost:${process.env.REACT_APP_SERVER_PORT}/graphql`,
  options: {
    reconnect: true
  }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const linkWithMiddleware = concat(authMiddleware, link)

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      case 'User':
        return object._id
      default:
        return defaultDataIdFromObject(object)
    }
  }
})

const client = new ApolloClient({
  link: linkWithMiddleware,
  cache
})

export default client
