import * as React from 'react';
import Cards from '../../components/Cards';
import CardFlipper from '../../components/CardFlipper'
import { observer, inject } from 'mobx-react';
import AddVote from 'components/AddVote';
import ResetVotes from 'components/ResetVotes/resetVotes';
import VotesSubmitted from 'components/VotesSubmitted/votesSubmitted';
import FlexView from 'react-flexview';

import {
  mainContent
} from './Main.css'

@inject('session')
@observer
class Main extends React.Component {
  public render() {
    return (
      <div className={mainContent}>
        <h2>Main Page</h2>
        <hr/>
        <FlexView row wrap hAlignContent='center'>
          <Cards session={this.props.session}/>
        </FlexView>
        <AddVote addVote={this.props.session.addVote}/>
        <CardFlipper flipCards={this.props.session.flipCards} />
        <ResetVotes resetVotes={this.props.session.resetVotes}/>
        <VotesSubmitted votes={this.props.session.votes}/>
      </div>
    );
  }
}

export default Main;
