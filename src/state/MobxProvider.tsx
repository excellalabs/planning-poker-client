import * as React from 'react';
import { Provider } from 'mobx-react';

import { AuthProp, auth } from './authStore';
import { DrawerProp, drawer } from './drawerStore';
import { SessionProp, session } from './sessionStore';

interface Props {
  children?: React.ReactNode;
}

type ProviderProps = Required<AuthProp> & Required<DrawerProp> & SessionProp;

const stores: ProviderProps = {
  auth,
  drawer,
  session
};

const MobxProvider = ({ children }: Props) => (
  <Provider {...stores}>{children}</Provider>
);

export default MobxProvider;
