
import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { withStyles } from '@material-ui/core'
import { Router as DomRouter, Route, Switch, Redirect } from 'react-router-dom'
import { AuthProp } from 'state/authStore'
import AppDrawer from 'components/AppDrawer'
import AppBar from 'components/AppBar'
import CreatePostButton from 'components/CreatePostButton'
import { history } from 'helpers/navigation'

import { routeArray } from 'routes'

interface Props extends AuthProp {
  classes: Classes
}

interface Classes {
  root: string
  content: string
  padding: string
  toolbar: string
}

const styled = withStyles(theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    minWidth: 0,
    overflow: 'scroll',
  },
  padding: {
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
}))

@inject('auth')
@observer
class Router extends React.Component<Props> {
  render () {
    const { classes, auth } = this.props
    return (
      <DomRouter history={history}>
        <div className={classes.root}>
          <AppBar />
          <AppDrawer />
          <CreatePostButton />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              {
                routeArray
                  .filter(({ authenticated }) => (
                    authenticated === undefined
                      || (authenticated === 'show' && auth!.loggedIn)
                      || (authenticated === 'hide' && !(auth!.loggedIn))
                  ))
                  .map(({ path, component: Component, key, exact = false, padding = true }) => {
                    let render = padding
                      ? () => (<div key={`${key}_padding`} className={classes.padding}><Component /></div>)
                      : () => (<Component />)

                    return (
                      <Route
                        key={key}
                        path={path}
                        render={render}
                        exact={exact}
                      />
                    )
                  })
              }
              <Route path='/'>
                <Redirect to='/' />
              </Route>
            </Switch>
          </main>
        </div>
      </DomRouter>
    )
  }
}

export default styled(Router)
