import * as React from 'react'
import { graphql, DataProps } from 'react-apollo'
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import PostList from 'components/PostList'

import { LandingPosts } from './__generated__/LandingPosts'
import landingPostsQuery from './LandingPosts.graphql'

interface Props extends DataProps<LandingPosts> {
  classes: Classes
}

interface Classes {
  root: string
  loadingContainer: string
  headerContent: string
}

const styled = withStyles(({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  loadingContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

const withApollo = graphql(landingPostsQuery)

class Landing extends React.Component<Props> {
  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        {this.renderErrors()}
        {this.renderLoading()}
        {this.renderContent()}
        {this.renderEmpty()}
      </div>
    )
  }

  private renderContent () {
    const { data } = this.props

    if (!data.posts) {
      return
    }

    return <PostList postIds={
      data.posts.map(post => post._id)
    } />
  }

  private renderEmpty () {
    const { data, classes } = this.props
    if (data.loading || !data.posts || data.posts.length > 0) {
      return
    }

    return (
      <div className={classes.loadingContainer}>
        <Typography variant='title'>
          No posts to show.
        </Typography>
      </div>
    )
  }

  private renderLoading () {
    const { data, classes } = this.props
    if (!data.loading || (data.posts && data.posts.length === 0)) {
      return
    }

    return (
      <div className={classes.loadingContainer}>
        <Typography variant='title'>
          Loading...
        </Typography>
        <CircularProgress />
      </div>
    )
  }

  private renderErrors () {
    const { data } = this.props
    if (!data.error) {
      return
    }

    return (
      <div>
        Error: <br/>
        {data.error.message}
      </div>
    )
  }
}

export default styled(withApollo(Landing))
