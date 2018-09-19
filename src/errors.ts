
import { GraphQLError } from 'graphql'
import { ApolloError } from 'apollo-client'

export class FetchResultError extends Error {
  readonly requestName: string
  readonly errors: string[] = []
  readonly graphQLErrors: GraphQLError[] | undefined

  constructor (
    requestName: string,
    { graphQLErrors, networkError }: ApolloError,
  ) {
    super(`Graphql request "${requestName}" failed.`)
    this.requestName = requestName

    if (graphQLErrors) {
      this.graphQLErrors = graphQLErrors
      this.errors.push(...graphQLErrors.map(err => err.message))
    }

    if (networkError) {
      this.errors.push(networkError.message)
    }

    if (this.errors.length === 0) {
      this.errors.push('Request failed.')
    }
  }
}
