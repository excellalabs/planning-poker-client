import { observable, action } from 'mobx';

export interface VoteProp {
  vote?: VoteStore;
}

class VoteStore {
  @observable flipped: boolean = false

  @action.bound flipCards() {
    this.flipped = !this.flipped
  }
}

export const vote = new VoteStore();
