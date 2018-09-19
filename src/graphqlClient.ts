
import { ApolloClient } from 'apollo-client'
import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { auth } from 'state/authStore'

const wsLink = new WebSocketLink({
  uri: process.env.GRAPHQL_SUBSCRIPTION_URL || 'ws://localhost/graphql',
  options: {
    reconnect: true,
  },
})

const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_URL,
})

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query as any)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink as any,
  httpLink as any,
)

const authLink = setContext((_, { headers }) => {
  // get the authentication token from the authStore
  const token = auth.jwt
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const graphqlClient = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
})

export default graphqlClient
