import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Auth, PropsRoute, PrivateRoute } from './utils/routing'
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
    user: null,
    exam: null
  }

  componentWillMount() {
    this.handleAutoLogin()
  }

  handleGoogleLogin = user => {
    if (user) {
      Auth.authenticate()
      this.setState({ loggedIn: true, user })
    }
  }

  handleAutoLogin = async () => {
    const token = localStorage.getItem('TOKEN')
    if (!token) return
    let response = await this.props.autoLogin()
    const { success, user } = response.data.autoLogin
    if (success) Auth.authenticate()
    this.setState({
      user,
      loggedIn: success
    })
  }

  handleLogout = () => {
    Auth.logout()
    localStorage.removeItem('TOKEN')
    this.setState({ loggedIn: false })
  }

  loadExam = exam => this.setState({ exam })

  unloadExam = () => this.setState({ exam: null })

  render() {
    const { user, loggedIn, exam } = this.state
    return (
      <BrowserRouter key="main-app">
        <MainNav loggedIn={loggedIn} user={user} handleLogout={this.handleLogout}>
          <Switch>
            <Route exact path="/" component={Home} />
            <PropsRoute
              path="/user/:userId"
              component={UserLanding}
              handleGoogleLogin={this.handleGoogleLogin}
            />
            <PrivateRoute
              path="/create"
              component={ExamMaker}
              user={user}
              exam={exam}
              unloadExam={this.unloadExam}
            />
            <PrivateRoute path="/exams" component={ExamList} user={user} loadExam={this.loadExam} />
          </Switch>
        </MainNav>
      </BrowserRouter>
    )
  }
}

export default compose(graphql(AUTOLOGIN, { name: 'autoLogin' }))(App)
