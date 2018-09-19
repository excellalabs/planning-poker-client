/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateAccount
// ====================================================

export interface CreateAccount_createUser {
  _id: string;
}

export interface CreateAccount {
  createUser: CreateAccount_createUser;
}

export interface CreateAccountVariables {
  username: string;
  password: string;
  verifyPassword: string;
}
