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
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import CloseIcon from '@material-ui/icons/Close'
import ErrorIcon from '@material-ui/icons/Error'
import { FetchResultError } from 'errors'
import { pushOrReplace } from 'helpers/navigation'
import { AuthProp } from 'state/authStore'
import { routes } from 'routes'

interface Props extends AuthProp {
  classes: Classes
}

interface Classes {
  card: string
  actions: string
  button: string
  errorSnackbar: string
  snackbarContent: string
  snackbarIcon: string
}

const styled = withStyles(theme => ({
  card: {
    minWidth: 300,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  button: {
    margin: theme.spacing.unit / 2,
  },
  errorSnackbar: {
    background: theme.palette.error.dark,
  },
  snackbarContent: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 20,
  },
  snackbarIcon: {
    fontSize: 20,
    marginRight: theme.spacing.unit,
  },
}))

interface State {
  username: string
  password: string
  submitting: boolean
  errors: { open: boolean, message: string }[]
}

@inject('auth')
@observer
class Login extends React.Component<Props, State> {
  state: State = {
    username: '',
    password: '',
    submitting: false,
    errors: [],
  }

  render () {
    const { classes } = this.props
    const {
      username,
      password,
      submitting,
      errors,
    } = this.state

    return (
      <form onSubmit={this.login}>
        <Card className={classes.card}>
          <CardHeader title='Login' />
          <CardContent>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='username'>Username</InputLabel>
              <Input
                id='username'
                name='username'
                autoFocus
                value={username}
                onChange={this.onUsernameChange}
              />
            </FormControl>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <Input
                id='password'
                name='password'
                type='password'
                value={password}
                onChange={this.onPasswordChange}
              />
            </FormControl>
          </CardContent>
          <CardActions classes={{ root: classes.actions }} disableActionSpacing>
            <Button
              className={classes.button}
              type='submit'
              fullWidth
              disabled={submitting}
              variant='raised'
              color='primary'
            >
              Login
            </Button>
            <Button
              className={classes.button}
              fullWidth
              variant='raised'
              onClick={() => pushOrReplace(routes.createAccount.path)}
            >
              Create an account
            </Button>
          </CardActions>
        </Card>
        {
          errors.map(({ open, message }, index) => (
            <Snackbar
              key={index}
              open={open}
              onClose={(_ev, reason) => this.hideError(index, reason)}
            >
              <SnackbarContent
                className={classes.errorSnackbar}
                message={(
                  <span className={classes.snackbarContent}>
                    <ErrorIcon className={classes.snackbarIcon} />
                    {message}
                  </span>
                )}
                action={[
                  <IconButton
                    key='close'
                    aria-label='Close'
                    color='inherit'
                    onClick={() => this.hideError(index)}
                  >
                    <CloseIcon />
                  </IconButton>,
                ]}
              />
            </Snackbar>
          ))
        }
      </form>
    )
  }

  private hideError = (index: number, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    this.setState(({ errors }) => ({
      errors: [
        ...errors.slice(0, index),
        { ...errors[index], open: false },
        ...errors.slice(index + 1),
      ],
    }))
  }

  private onUsernameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const username = ev.currentTarget.value
    this.setState({ username })
  }

  private onPasswordChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const password = ev.currentTarget.value
    this.setState({ password })
  }

  private login = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const { auth } = this.props
    const { username, password } = this.state
    this.setState({ submitting: true, errors: [] })

    try {
      await auth!.login({ username, password })
    } catch (err) {
      let errors = this.state.errors
      if (err instanceof FetchResultError) {
        errors = err.errors.map(message => ({ open: true, message }))
      }

      this.setState({ submitting: false, errors })
    }
  }
}

export default styled(Login)
