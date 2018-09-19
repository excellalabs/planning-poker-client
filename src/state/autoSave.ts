
import { autorun, set, toJS } from 'mobx'

const autoSave = <Prop>(name: string & keyof Prop) => <T>(mobxStore: T) => {
  let firstRun = true

  // will run on change
  autorun(() => {
    // on load check if there's an existing store on localStorage and extend the store
    if (firstRun) {
      const existingStore = localStorage.getItem(name)

      if (existingStore) {
        set(mobxStore, JSON.parse(existingStore))
      }
    }

    if (!('toJSON' in mobxStore)) {
      mobxStore = toJS(mobxStore)
    }
    // from then on serialize and save to localStorage
    localStorage.setItem(name, JSON.stringify(mobxStore))
  })

  firstRun = false

  return mobxStore
}

export default autoSave
