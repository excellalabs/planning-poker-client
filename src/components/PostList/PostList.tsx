import * as React from 'react'
import { withStyles } from '@material-ui/core'
import Post from 'components/Post'

interface Props {
  postIds: string[]
  classes: Classes
}

interface Classes {
  root: string
}

const styled = withStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
})

class PostList extends React.Component<Props> {
  render () {
    const { postIds, classes } = this.props

    return (
      <div className={classes.root}>
        {
          postIds.map(id => (
            <Post key={id} postId={id} />
          ))
        }
      </div>
    )
  }
}

export default styled(PostList)
