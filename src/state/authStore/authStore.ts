
import { observable, computed, reaction, action } from 'mobx'
import { FetchResult } from 'apollo-link'
import { FetchResultError } from 'errors'
import graphqlClient from '../../graphqlClient'
import autoSave from '../autoSave'
import meQuery from './Me.graphql'
import loginMutation from './Login.graphql'
import createAccountMutation from './CreateAccount.graphql'
import { Me, Me_me } from './__generated__/Me'
import { Login, LoginVariables } from './__generated__/Login'
import { CreateAccountVariables } from './__generated__/CreateAccount'

export interface AuthProp {
  auth?: AuthStore
}

class AuthStore {
  constructor () {
    reaction(
      () => this.jwt,
      () => this.fetchUser(),
    )
  }

  @observable jwt: string | null = null
  @observable user: Me_me | null = null
  @computed get loggedIn () {
    return !!this.jwt
  }

  @action
  async logout () {
    this.jwt = null
    this.user = null
  }

  async login (variables: LoginVariables) {
    let response: FetchResult
    try {
      response = await graphqlClient.mutate({
        mutation: loginMutation,
        variables,
      })
    } catch (err) {
      throw new FetchResultError('Login', err)
    }

    const { login: { token } } = response.data as Login
    this.jwt = token

    return this.fetchUser()
  }

  async createAccount (variables: CreateAccountVariables) {
    try {
      await graphqlClient.mutate({
        mutation: createAccountMutation,
        variables,
      })
    } catch (err) {
      throw new FetchResultError('CreateAccount', err)
    }
  }

  toJSON () {
    return {
      jwt: this.jwt,
    }
  }

  private async fetchUser () {
    if (!this.jwt) {
      this.user = null
      return null
    }

    while (!graphqlClient) {
      await sleep(100)
    }

    let data: Me
    try {
      const result = await graphqlClient.query<Me>({
        query: meQuery,
      })
      data = result.data
    } catch (err) {
      this.user = null
      throw new FetchResultError('Me', err)
    }

    this.user = data.me
    return this.user
  }
}

const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time))
export const auth = autoSave<AuthProp>('auth')(new AuthStore())
