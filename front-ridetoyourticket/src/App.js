import React, { Component } from 'react'
import { Route, Switch } from 'react-router'

import HeaderContainer from './components/header/HeaderContainer'
import LoginContainer from './components/login/LoginContainer'
import SignupContainer from './components/login/signup/SignupContainer'
import EventListContainer from './components/eventList/EventListContainer'
import EventContainer from './components/event/EventContainer'
import TicketContainer from './components/ticket/TicketContainer'

import withStyles from '@material-ui/core/styles/withStyles'
import { center } from './theme'

const styles = theme => ({
  center,
  app: {
    maxWidth: theme.spacing.app.maxWidth,
  },
})

class App extends Component {
  render() {
    const { classes: { center, app } } = this.props
    return (
      <div>
        <HeaderContainer/>
        <div className={center}>
          <div className={app}>
            <Switch>
              <Route exact path={'/'} component={EventListContainer}/>
              <Route exact path={'/login'} component={LoginContainer}/>
              <Route exact path={'/signup'} component={SignupContainer}/>
              <Route path={'/event/:id'} component={EventContainer}/>
              <Route exact path={'/ticket/:id'} component={TicketContainer}/>
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(App)
