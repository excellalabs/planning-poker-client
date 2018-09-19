import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { withStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import { pushOrReplace } from 'helpers/navigation'
import { routes } from 'routes'
import graphqlClient from '../../graphqlClient'

import { EditPost, EditPostVariables } from './__generated__/EditPost'
import editPostMutation from './EditPost.graphql'

interface Props {
  postId: string
  content: string
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
class EditCard extends React.Component<Props, State> {
  state: State = {
    content: this.props.content,
    submitting: false,
  }

  render () {
    const { classes } = this.props
    const { content, submitting } = this.state

    return (
      <form onSubmit={this.editPost}>
        <Card className={classes.card}>
          <CardHeader title='Edit Post' />
          <CardContent>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='content'>Content</InputLabel>
              <Input
                multiline
                rows={10}
                id='content'
                name='content'
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
              Update
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

  private editPost = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const { postId } = this.props
    const { content } = this.state
    this.setState({ submitting: true })

    try {
      await graphqlClient.mutate<EditPost, EditPostVariables>({
        mutation: editPostMutation,
        variables: { postId, content },
      })
      pushOrReplace(routes.landing.path)
    } catch (_err) {
      // noop
    }
  }
}

export default styled(EditCard)
