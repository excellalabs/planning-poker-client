
import * as React from 'react'
import { SubscriptionResult } from 'react-apollo'
import { withStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import EditPostButton from 'components/EditPostButton'
import { AuthProp } from 'state/authStore'
import { ListenToPost } from './__generated__/ListenToPost'

interface Props extends AuthProp, SubscriptionResult<ListenToPost> {
  classes: Classes
}

interface Classes {
  card: string
  paragraph: string
  headerContent: string
  loadingContent: string
}

const styled = withStyles(theme => ({
  card: {
    marginBottom: theme.spacing.unit * 2,
  },
  paragraph: {
    minHeight: '1em',
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  loadingContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    minHeight: 200,
  },
}))

class PostContent extends React.Component<Props> {
  render () {
    const { classes } = this.props

    return (
      <Card className={classes.card}>
        {this.renderContent()}
        {this.renderLoading()}
      </Card>
    )
  }

  private renderContent () {
    const { data, loading, classes } = this.props
    if (!data || loading) {
      return
    }

    const { post: { _id, poster, content } } = data

    return (
      <React.Fragment>
        <CardHeader title={(
          <div className={classes.headerContent}>
            {poster.username}
            <EditPostButton postId={_id} posterId={poster._id} />
          </div>
        )} />
        <CardContent key='content'>
          {
            content.split(/\n/g).map((paragraph, idx) => (
              <Typography key={idx} classes={{
                root: classes.paragraph,
              }}>{paragraph}</Typography>
            ))
          }
        </CardContent>
      </React.Fragment>
    )
  }

  renderLoading () {
    const { data, loading, classes } = this.props

    if (data && !loading) {
      return
    }

    return (
      <CardContent key='content'>
        <div className={classes.loadingContent}>
          <CircularProgress />
        </div>
      </CardContent>
    )
  }
}

export default styled(PostContent)
