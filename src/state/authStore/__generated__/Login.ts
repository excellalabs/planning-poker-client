/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login {
  token: string | null;
}

export interface Login {
  /**
   * Used to authenticate a user and retrieve a `JWT` token used to authorize further requests.
   */
  login: Login_login;
}

export interface LoginVariables {
  username: string;
  password: string;
}
