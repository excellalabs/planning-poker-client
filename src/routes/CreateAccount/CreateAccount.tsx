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
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import CloseIcon from '@material-ui/icons/Close'
import { pushOrReplace } from 'helpers/navigation'
import { routes } from 'routes'
import { FetchResultError } from 'errors'
import { AuthProp } from 'state/authStore'

interface Props extends AuthProp {
  classes: Classes
}

interface Classes {
  card: string
  errorSnackbar: string
}

const styled = withStyles(theme => ({
  card: {
    minWidth: 300,
  },
  errorSnackbar: {
    background: theme.palette.error.dark,
  },
}))

interface State {
  username: string
  password: string
  verifyPassword: string
  verifyPasswordDirty: boolean
  submitting: boolean
  errors: { open: boolean, message: string }[]
}

@inject('auth')
@observer
class CreateAccount extends React.Component<Props, State> {
  state: State = {
    username: '',
    password: '',
    verifyPassword: '',
    verifyPasswordDirty: false,
    submitting: false,
    errors: [],
  }

  render () {
    const { classes } = this.props
    const {
      username,
      password,
      verifyPassword,
      verifyPasswordDirty,
      submitting,
      errors,
    } = this.state

    const showVerifyError = verifyPasswordDirty && password !== verifyPassword

    return (
      <form onSubmit={this.createAccount}>
        <Card className={classes.card}>
          <CardHeader title='Create Account' />
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
            <FormControl margin='normal' required fullWidth>
              {
                showVerifyError
                  ? <Tooltip title='Passwords must match'>
                      <InputLabel htmlFor='verifyPassword' error>
                        Verify Password
                      </InputLabel>
                    </Tooltip>
                  : <InputLabel htmlFor='verifyPassword'>
                      Verify Password
                    </InputLabel>
              }
              <Input
                id='verifyPassword'
                name='verifyPassword'
                type='password'
                error={showVerifyError}
                value={verifyPassword}
                onChange={this.onVerifyPasswordChange}
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
              Create Account
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
                message={message}
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

  private onVerifyPasswordChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const verifyPassword = ev.currentTarget.value
    this.setState({
      verifyPassword,
      verifyPasswordDirty: true,
    })
  }

  private createAccount = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const { auth } = this.props
    const { username, password, verifyPassword } = this.state
    this.setState({ submitting: true, errors: [] })

    try {
      await auth!.createAccount({ username, password, verifyPassword })
      pushOrReplace(routes.login.path)
    } catch (err) {
      let errors = this.state.errors
      if (err instanceof FetchResultError) {
        errors = err.errors.map(message => ({ open: true, message }))
      }

      this.setState({ submitting: false, errors })
    }
  }
}

export default styled(CreateAccount)
