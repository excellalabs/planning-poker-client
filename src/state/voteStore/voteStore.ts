import { observable } from 'mobx';

export interface VoteProp {
  vote?: VoteStore;
}

class VoteStore {
  // @observable drawerOpen: boolean = false
  // toggleDrawer (open = !this.drawerOpen) {
  //   this.drawerOpen = open
  // }
}

export const vote = new VoteStore();
