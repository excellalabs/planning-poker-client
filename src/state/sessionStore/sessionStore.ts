import { observable, action } from 'mobx';

export interface SessionProp {
  session?: SessionStore;
}

class SessionStore {
  @observable flipped: boolean = false
  @observable votes: Array<any> = []
  
  @action.bound flipCards() {
    this.flipped = !this.flipped
  }

  @action.bound addVote(value: string) {
    this.votes.push({ value: value })
  }
}

export const session = new SessionStore();
