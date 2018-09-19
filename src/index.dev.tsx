
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import DevTools from 'mobx-react-devtools'
import App from './App/App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <div id='dev-wrapper' style={{ height: '100vh', display: 'flex' }}>
    <App />
    {process.env.NODE_ENV === 'development' && <DevTools />}
  </div>,
  document.getElementById('root') as HTMLElement,
)
registerServiceWorker()
