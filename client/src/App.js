import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Auth, PropsRoute } from './utils/routing'
import { graphql, compose } from 'react-apollo'
import { AUTOLOGIN } from './apollo/mutations/autoLogin'
import MainNav from './components/MainNav/MainNav'
import UserLanding from './components/UserLanding/UserLanding'
import ExamMaker from './components/ExamMaker/ExamMaker'
import ExamList from './components/ExamList/ExamList'
import Home from './components/Home/Home'

class App extends Component {
  state = {
    loggedIn: false,
    user: null
  }

  componentWillMount() {
    this.handleAutoLogin()
  }

  handleGoogleLogin = user => {
    Auth.authenticate()
    this.setState({ loggedIn: true, user })
  }

  handleAutoLogin = async () => {
    const token = localStorage.getItem('TOKEN')
    if (!token) return
    let response = await this.props.autoLogin()
    const { success, message, user } = response.data.autoLogin
    if (success) Auth.authenticate()
    this.setState({ user, loggedIn: success })
  }

  render() {
    const { user, loggedIn } = this.state
    return (
      <BrowserRouter>
        <MainNav loggedIn={loggedIn}>
          <Switch>
            <Route exact path="/" component={Home} />
            <PropsRoute
              path="/user/:userId"
              component={UserLanding}
              handleGoogleLogin={this.handleGoogleLogin}
            />
            <PropsRoute path="/create" component={ExamMaker} user={user} />
            <PropsRoute path="/exams" component={ExamList} user={user} />
          </Switch>
        </MainNav>
      </BrowserRouter>
    )
  }
}

export default compose(graphql(AUTOLOGIN, { name: 'autoLogin' }))(App)
