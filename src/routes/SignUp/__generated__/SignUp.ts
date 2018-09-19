/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignUp
// ====================================================

export interface SignUp_createUser {
  _id: string;
  username: string;
}

export interface SignUp {
  createUser: SignUp_createUser;
}

export interface SignUpVariables {
  username: string;
  password: string;
  verifyPassword: string;
}
