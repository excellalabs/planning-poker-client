
import * as React from 'react'
import { Subscription } from 'react-apollo'

import listenToPostSubscription from './ListenToPost.graphql'
import PostContent from './PostContent'

interface Props {
  postId: string
}

const Post = ({ postId }: Props) => {
  return (
    <Subscription
      subscription={listenToPostSubscription}
      variables={{ postId }}
      shouldResubscribe
    >
      {(sub) => <PostContent {...sub} />}
    </Subscription>
  )
}

export default Post
