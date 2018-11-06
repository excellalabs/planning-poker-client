import * as React from 'react';
import Cards from '../../components/Cards';
import CardFlipper from '../../components/CardFlipper'
import { observer, inject } from 'mobx-react';
import { vote } from 'state/voteStore';

@inject('vote')
@observer
class Main extends React.Component {
  session = {
    votes: [{ value: '3' }, { value: '5' }],
    sessionId: 'id'
  };
  public render() {
    const { vote } = this.props

    return (
      <div>
        <h2>Main Page</h2>
        <Cards votes={this.session['votes']} flipped={this.props.vote.flipped} />
        <CardFlipper flipCards={this.props.vote.flipCards} />
      </div>
    );
  }
}

export default Main;
