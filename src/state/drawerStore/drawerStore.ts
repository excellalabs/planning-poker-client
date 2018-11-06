
import { observable } from 'mobx'

export interface DrawerProp {
  drawer?: DrawerStore
}

class DrawerStore {
  @observable drawerOpen: boolean = false

  toggleDrawer(open = !this.drawerOpen) {
    this.drawerOpen = open
  }
}

export const drawer = new DrawerStore()
