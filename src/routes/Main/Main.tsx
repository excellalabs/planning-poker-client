import * as React from 'react';
import Cards from '../../components/Cards';
import CardFlipper from '../../components/CardFlipper'
import { observer, inject } from 'mobx-react';
import AddVote from 'components/AddVote';

@inject('session')
@observer
class Main extends React.Component {
  session = {
    votes: [{ value: '3' }, { value: '5' }],
    sessionId: 'id'
  };
  public render() {
    return (
      <div>
        <h2>Main Page</h2>
        <Cards session={this.props.session}/>
        <AddVote addVote={this.props.session.addVote}/>
        <CardFlipper flipCards={this.props.session.flipCards} />
      </div>
    );
  }
}

export default Main;
