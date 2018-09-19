
import { createBrowserHistory } from 'history'
import valueEqual from 'value-equal'

export const history = createBrowserHistory()

export function pushOrReplace (newLocation: string, newState?: any) {
  if (shouldReplace(newLocation, newState)) {
    history.replace(newLocation, newState)
  } else {
    history.push(newLocation, newState)
  }
}

function shouldReplace (newLocation: string, newState?: any): boolean {
  const location = history.location
  const currentPath = location.pathname + location.search + location.hash
  const hasState = location.state

  return currentPath === newLocation && (!hasState || valueEqual(location.state, newState))
}
