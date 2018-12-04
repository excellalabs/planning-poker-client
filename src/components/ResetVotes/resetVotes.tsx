import * as React from 'react';
import { observer } from 'mobx-react';
import { AuthProp } from 'state/authStore';

interface Props extends AuthProp {
  resetVotes: Function;
}

@observer
class ResetVotes extends React.Component<Props> {
  render() {
    return (
        <div>
            <button onClick={() => this.props.resetVotes()}>Reset Votes</button>
        </div>
    )
  }
}

export default ResetVotes;
