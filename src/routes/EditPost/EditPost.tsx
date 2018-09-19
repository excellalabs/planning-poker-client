import * as React from 'react'
import { Query, QueryResult } from 'react-apollo'
import { withRouter, RouteComponentProps } from 'react-router'
import { inject, observer } from 'mobx-react'
import { withStyles, Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import { AuthProp } from 'state/authStore'
import EditCard from './EditCard'

import { ReadPost } from './__generated__/ReadPost'
import readPostQuery from './ReadPost.graphql'

interface RouteParams {
  postId: string
}

interface Props extends AuthProp, RouteComponentProps<RouteParams> {
  classes: Classes
}

interface Classes {
  loading: string
}

const styled = withStyles(({
  loading: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '40vh',
  },
}))

@inject('auth')
@observer
class CreateAccount extends React.Component<Props> {
  render () {
    const { match, auth } = this.props
    const { postId } = match.params

    if (!auth!.loggedIn) {
      this.goBack()
      return null
    }

    return (
      <Query
        query={readPostQuery}
        variables={{ postId }}
      >
        {this.renderChildren}
      </Query>
    )
  }

  private renderChildren = ({ loading, data }: QueryResult<ReadPost>) => {
    const { auth } = this.props

    if (loading || !(auth!.user)) {
      return this.renderLoading()
    } else if (data) {
      if (auth!.user!._id !== data.post.poster._id) {
        this.goBack()
        return null
      } else {
        return this.renderContent(data)
      }
    } else {
      return this.renderError()
    }
  }

  private renderContent = ({ post }: ReadPost) => {
    const { match } = this.props
    const { postId } = match.params

    return (
      <EditCard postId={postId} content={post.content} />
    )
  }

  private renderLoading = () => {
    const { classes } = this.props

    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    )
  }

  private renderError = () => {
    const { classes } = this.props

    return (
      <div className={classes.loading}>
        <Typography variant='title'>
          Something went wrong.
        </Typography>
        <Button onClick={this.goBack}>
          Go Back
        </Button>
      </div>
    )
  }

  private goBack = () => {
    this.props.history.goBack()
  }
}

export default styled(withRouter(CreateAccount))
