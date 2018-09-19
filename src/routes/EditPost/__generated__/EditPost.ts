/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditPost
// ====================================================

export interface EditPost_updatePost {
  _id: string;
  content: string;
}

export interface EditPost {
  updatePost: EditPost_updatePost;
}

export interface EditPostVariables {
  postId: string;
  content: string;
}
