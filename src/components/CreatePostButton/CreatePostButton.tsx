
import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { withStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import { pushOrReplace } from 'helpers/navigation'
import { routes } from 'routes'
import { AuthProp } from 'state/authStore'

interface Props extends AuthProp {
  classes: Classes
}

interface Classes {
  fab: string
}

const styled = withStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
}))

@inject('auth')
@observer
class EditPostButton extends React.Component<Props> {
  render () {
    const { auth, classes } = this.props

    if (!(auth!.loggedIn)) {
      return null
    }

    return (
      <Button
        className={classes.fab}
        variant='fab'
        color='secondary'
        onClick={() => pushOrReplace(routes.createPost.path)}
      >
        <AddIcon />
      </Button>
    )
  }
}

export default styled(EditPostButton)
