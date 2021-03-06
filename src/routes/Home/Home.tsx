import * as React from 'react'
import VoteCard from '../../components/VoteCard/VoteCard'

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
        <VoteCard value='1' showValue={true}></VoteCard>
        <VoteCard value='3' showValue={false}></VoteCard>
      </div>
    )
  }
}

export default Home
