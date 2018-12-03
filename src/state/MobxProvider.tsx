import * as React from 'react';
import { Provider } from 'mobx-react';

import { AuthProp, auth } from './authStore';
import { DrawerProp, drawer } from './drawerStore';
import { VoteProp, vote } from './voteStore';

interface Props {
  children?: React.ReactNode;
}

type ProviderProps = Required<AuthProp> & Required<DrawerProp> & VoteProp;

const stores: ProviderProps = {
  auth,
  drawer,
  vote
};

const MobxProvider = ({ children }: Props) => (
  <Provider {...stores}>{children}</Provider>
);

export default MobxProvider;
