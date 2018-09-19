import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { withStyles, TextField } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
// import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import { pushOrReplace } from 'helpers/navigation'
import { routes } from 'routes'
import graphqlClient from '../../graphqlClient'

import { CreatePost, CreatePostVariables } from './__generated__/CreatePost'
import creatPostMutation from './CreatePost.graphql'

interface Props {
  classes: Classes
}

interface Classes {
  card: string
}

const styled = withStyles(({
  card: {
    minWidth: 300,
  },
}))

interface State {
  content: string
  submitting: boolean
}

@inject('auth')
@observer
class CreateAccount extends React.Component<Props, State> {
  state: State = {
    content: '',
    submitting: false,
  }

  render () {
    const { classes } = this.props
    const { content, submitting } = this.state

    return (
      <form onSubmit={this.createPost}>
        <Card className={classes.card}>
          <CardHeader title='Create Post' />
          <CardContent>
            <FormControl margin='normal' required fullWidth>
              <TextField
                multiline
                id='content'
                name='content'
                label='Content'
                rows={10}
                autoFocus
                value={content}
                onChange={this.onContentChange}
              />
            </FormControl>
          </CardContent>
          <CardActions>
            <Button
              type='submit'
              fullWidth
              variant='raised'
              color='primary'
              disabled={submitting}
            >
              Create Post
            </Button>
          </CardActions>
        </Card>
      </form>
    )
  }

  private onContentChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const content = ev.currentTarget.value
    this.setState({ content })
  }

  private createPost = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const { content } = this.state
    this.setState({ submitting: true })

    try {
      await graphqlClient.mutate<CreatePost, CreatePostVariables>({
        mutation: creatPostMutation,
        variables: { content },
      })
      pushOrReplace(routes.landing.path)
    } catch (_err) {
      // noop
    }
  }
}

export default styled(CreateAccount)
