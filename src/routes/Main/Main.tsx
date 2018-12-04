import * as React from 'react';
import Cards from '../../components/Cards';
import CardFlipper from '../../components/CardFlipper'
import { observer, inject } from 'mobx-react';
import AddVote from 'components/AddVote';
import ResetVotes from 'components/ResetVotes/resetVotes';

@inject('session')
@observer
class Main extends React.Component {
  public render() {
    return (
      <div>
        <h2>Main Page</h2>
        <Cards session={this.props.session}/>
        <AddVote addVote={this.props.session.addVote}/>
        <CardFlipper flipCards={this.props.session.flipCards} />
        <ResetVotes resetVotes={this.props.session.resetVotes}/>
      </div>
    );
  }
}

export default Main;
