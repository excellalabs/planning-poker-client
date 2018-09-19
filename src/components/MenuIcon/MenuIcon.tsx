
import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { withStyles } from '@material-ui/core'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { DrawerProp } from 'state/drawerStore'

interface Props extends DrawerProp {
  classes: Classes
}

interface Classes {
  menuButton: string
}

const styled = withStyles({
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
})

@inject('drawer')
@observer
class AppMenuIcon extends React.Component<Props> {
  render () {
    const { classes, drawer } = this.props
    return (
      <Hidden mdUp implementation='css'>
        <IconButton
          className={classes.menuButton}
          color='inherit'
          aria-label='Open drawer'
          onClick={() => drawer!.toggleDrawer()}
        >
          <MenuIcon />
        </IconButton>
      </Hidden>
    )
  }
}

export default styled(AppMenuIcon)
