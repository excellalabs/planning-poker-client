import * as React from 'react';
import { observer } from 'mobx-react';
import { AuthProp } from 'state/authStore';

interface Props extends AuthProp {
  votesSubmitted: string
}

@observer
class VotesSubmitted extends React.Component<Props> {
  render() {
    return (
        <div>
            <span>Votes Submitted: {this.props.votes.length}</span>
        </div>
    )
  }
}

export default VotesSubmitted;
