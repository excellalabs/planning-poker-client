
import * as React from 'react'
import { RouteComponentProps, Route, Switch } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { pushOrReplace } from 'helpers/navigation'

import RouteWith from 'Router/layouts/RouteWith'
import AuthIcon from 'components/AuthIcon'
import MenuIcon from 'components/MenuIcon'

import { routeArray, routes } from 'routes'

const DefaultAppBarContent = () => (
  <Typography
    variant='title'
    color='inherit'
    noWrap
    onClick={() => pushOrReplace(routes.home.path)}
  >
    Planning Poker
  </Typography>
)

interface Props {
  classes: Classes
}

interface Classes {
  appBar: string
  fullWidth: string
}

const styled = withStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  fullWidth: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
}))

const AppBarRouter = ({ classes }: Props) => {
  const menuIcon = <MenuIcon />
  const authIcon = <AuthIcon />
  const additionalProps = {
    menuIcon,
    authIcon,
  }

  return (
    <AppBar position='absolute' className={classes.appBar}>
      <Toolbar>
        {menuIcon}
        <div className={classes.fullWidth}>
          <Switch>
            {
              routeArray.filter(route => route.appBar).map(({ path, appBar, key, exact = false }) => (
                <Route
                  key={key}
                  path={path}
                  component={appBar!}
                  exact={exact}
                />
              ))
            }
            <RouteWith path='/' component={DefaultAppBarContent} additionalProps={additionalProps} />
          </Switch>
        </div>
        {authIcon}
      </Toolbar>
    </AppBar>
  )
}

export default styled(AppBarRouter)
