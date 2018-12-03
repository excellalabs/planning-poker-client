import * as React from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core';
import { AuthProp } from 'state/authStore';
import VoteCard from 'components/VoteCard';

interface Props extends AuthProp {
  classes: Classes;
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

@observer
class Cards extends React.Component<Props> {
  render() {
    return this.props.votes.map(v =>
      // <div>This is a card. Vote: {v.value}. Flipped: {this.props.flipped.toString()}</div>
      <VoteCard value={v.value} showValue={this.props.flipped}>   </VoteCard>
    )

  }
}

export default styled(Cards);
