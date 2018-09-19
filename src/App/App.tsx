import * as React from 'react'
import { hot } from 'react-hot-loader'
import { ApolloProvider } from 'react-apollo'
import Router from 'Router/Router'
import MobxProvider from 'state/MobxProvider'
import graphqlClient from '../graphqlClient'

class App extends React.Component {
  public render () {
    return (
      <ApolloProvider client={graphqlClient}>
        <MobxProvider>
          <div className='app' style={{ height: '100vh', display: 'flex', flexGrow: 1 }}>
            <Router />
          </div>
        </MobxProvider>
      </ApolloProvider>
    )
  }
}

export default hot(module)(App)
