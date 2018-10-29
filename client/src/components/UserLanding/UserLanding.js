import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import { USER_BY_ID } from '../../apollo/queries/userById'
import Button from '@material-ui/core/Button'
import DownloadIcon from '@material-ui/icons/GetAppSharp'
import Loading from '../App/Loading'

const styles = theme => ({
  button: {
    borderRadius: 0,
    boxShadow: theme.shadows[0]
  }
})

class UserLanding extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.data.loading && !this.props.data.loading) {
      this.props.handleGoogleLogin(this.props.data.userById)
      localStorage.setItem('TOKEN', this.props.data.userById.jwt)
    }
  }

  render() {
    const {
      data: { loading },
      classes
    } = this.props
    if (loading) return <Loading />
    return (
      <div className="UserLanding">
        <Button
          variant="contained"
          classes={{ root: classes.button }}
          href="https://github.com/benjaminadk/electron-exam/releases"
          target="blank"
        >
          <div className="logo" /> Download Exam Simulator{' '}
          <DownloadIcon className="download-icon" />
        </Button>
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  graphql(USER_BY_ID, { options: props => ({ variables: { userId: props.match.params.userId } }) })
)(UserLanding)
