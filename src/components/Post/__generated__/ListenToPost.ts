/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: ListenToPost
// ====================================================

export interface ListenToPost_post_poster {
  _id: string;
  username: string;
}

export interface ListenToPost_post {
  _id: string;
  content: string;
  poster: ListenToPost_post_poster;
}

export interface ListenToPost {
  post: ListenToPost_post;
}

export interface ListenToPostVariables {
  postId: string;
}
