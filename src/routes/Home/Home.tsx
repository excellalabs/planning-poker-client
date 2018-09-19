import * as React from 'react'

import {
  home,
  homeHeader,
  homeLogo,
  homeTitle,
  homeIntro,
} from './Home.css'
import logo from './logo.svg'

class Home extends React.Component {
  public render () {
    return (
      <div className={home}>
        <header className={homeHeader}>
          <img src={logo} className={homeLogo} alt='logo' />
          <h1 className={homeTitle}>Welcome to React</h1>
        </header>
        <p className={homeIntro}>
          To get started, edit <code>src/home.tsx</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default Home
