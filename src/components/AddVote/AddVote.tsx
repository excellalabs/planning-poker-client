import * as React from 'react';
import { observer } from 'mobx-react';
import { AuthProp } from 'state/authStore';

interface Props extends AuthProp {
  classes: Classes;
  voteValue: string;
  addVote: Function;
}

interface Classes {
  fab: string;
}

@observer
class AddVote extends React.Component<Props> {
  constructor(props) {
    super(props)

    this.state = {
      voteValue: '',
      hasVoted: false
    }
  }

  updateVoteValue(event) {
    this.setState({
      voteValue: event.target.value
    });
  }

  addVote() {
    this.setState({
      hasVoted: true
    });
    this.props.addVote(this.state.voteValue)
  }

  render() {
    return (
        <div>
            <input type="text" value={this.state.voteValue} onChange={event => this.updateVoteValue(event)}/>
            {/* <button onClick={() => this.addVote()} disabled={this.state.hasVoted}>Add Vote</button> */}
            <button onClick={() => this.addVote()}>Add Vote</button>
        </div>
    )
  }
}

export default AddVote;
