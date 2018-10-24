import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { USER_BY_ID } from '../../apollo/queries/userById'
import Loading from '../App/Loading'

class UserLanding extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.data.loading && !this.props.data.loading) {
      this.props.handleGoogleLogin(this.props.data.userById)
      localStorage.setItem('TOKEN', this.props.data.userById.jwt)
    }
  }

  render() {
    const {
      data: { loading, userById }
    } = this.props
    if (loading) return <Loading />
    return <div>{JSON.stringify(userById)}</div>
  }
}

export default compose(
  graphql(USER_BY_ID, { options: props => ({ variables: { userId: props.match.params.userId } }) })
)(UserLanding)
