/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ReadPost
// ====================================================

export interface ReadPost_post_poster {
  _id: string;
}

export interface ReadPost_post {
  content: string;
  poster: ReadPost_post_poster;
}

export interface ReadPost {
  post: ReadPost_post;
}

export interface ReadPostVariables {
  postId: string;
}
