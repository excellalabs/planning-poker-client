import * as React from 'react';
import { withStyles } from '@material-ui/core';
import { AuthProp } from 'state/authStore';

interface Props {
  flipCards: Function
}

interface Classes {
  fab: string;
}

const styled = withStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
}));

const CardFlipper = props => <button onClick={props.flipCards}>Flip</button>

export default styled(CardFlipper);
