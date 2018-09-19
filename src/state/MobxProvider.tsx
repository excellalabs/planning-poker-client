
import * as React from 'react'
import { Provider } from 'mobx-react'

import { AuthProp, auth } from './authStore'
import { DrawerProp, drawer } from './drawerStore'

interface Props {
  children?: React.ReactNode,
}

type ProviderProps =
  & Required<AuthProp>
  & Required<DrawerProp>

const stores: ProviderProps = {
  auth,
  drawer,
}

const MobxProvider = ({ children }: Props) => (
  <Provider {...stores}>
    {children}
  </Provider>
)

export default MobxProvider
