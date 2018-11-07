import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import { USER_BY_ID } from '../../apollo/queries/userById'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
// import Paper from '@material-ui/core/Paper'
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
        <Typography variant="overline">Welcome to Exam Maker</Typography>
        <Divider />
        <div className="content">
          <Button variant="contained" color="primary" classes={{ root: classes.button }}>
            <DownloadIcon />
            Download Exam Simulator for Windows
          </Button>
        </div>
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  graphql(USER_BY_ID, { options: props => ({ variables: { userId: props.match.params.userId } }) })
)(UserLanding)
