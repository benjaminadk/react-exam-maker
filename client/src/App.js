import React, { Component, Suspense, lazy } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { Auth, PropsRoute, PrivateRoute } from './utils/routing'
import { graphql, compose } from 'react-apollo'
import { AUTOLOGIN } from './apollo/mutations/autoLogin'
import MainNav from './components/MainNav/MainNav'
import Loading from './components/App/Loading'

const Home = lazy(() => import('./components/Home/Home'))
const ExamMaker = lazy(() => import('./components/ExamMaker/ExamMaker'))
const MyExams = lazy(() => import('./components/MyExams/MyExams'))
const UserLanding = lazy(() => import('./components/UserLanding/UserLanding'))
const PublicExams = lazy(() => import('./components/PublicExams/PublicExams'))

class App extends Component {
  state = {
    loggedIn: false,
    user: null,
    exam: null
  }

  componentDidMount() {
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
        <div>
          <MainNav loggedIn={loggedIn} user={user} handleLogout={this.handleLogout}>
            <Suspense fallback={<Loading />}>
              <Switch>
                <PropsRoute exact path="/" component={Home} />
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
                <PrivateRoute
                  path="/my-exams"
                  component={MyExams}
                  user={user}
                  loadExam={this.loadExam}
                />
                <PrivateRoute path="/public" component={PublicExams} />
              </Switch>
            </Suspense>
          </MainNav>
        </div>
      </BrowserRouter>
    )
  }
}

export default compose(graphql(AUTOLOGIN, { name: 'autoLogin' }))(App)
