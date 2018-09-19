/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Me
// ====================================================

export interface Me_me {
  _id: string;
  username: string;
}

export interface Me {
  /**
   * Gets the user associated with the authorization `JWT` token.
   */
  me: Me_me;
}
