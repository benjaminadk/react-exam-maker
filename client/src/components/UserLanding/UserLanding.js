import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import { USER_BY_ID } from '../../apollo/queries/userById'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
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
        <div>
          <Typography variant="h4">Documentation</Typography>
          <Divider />
          <Typography variant="h6" className="heading">
            Introduction
          </Typography>
          <Typography variant="body2" align="justify" className="paragraph">
            Exam Maker is a web application that allows a user create and manage exams that can be
            taken with Exam Simulator. Exam Simulator is easily downloaded by clicking the button
            below and selecting the latest version for your preferred OS.
          </Typography>
          <div className="download">
            <Button
              variant="contained"
              classes={{ root: classes.button }}
              href="https://github.com/benjaminadk/electron-exam/releases"
              target="blank"
            >
              <div className="download-logo" /> Download Exam Simulator{' '}
              <DownloadIcon className="download-icon" />
            </Button>
          </div>
          <Typography variant="h6" className="heading">
            Exam Format
          </Typography>
          <Typography variant="body2" align="justify" className="paragraph">
            Exams files have the JSON extension and must be formatted in a specific way. Exam
            Simulator validates exams when they load, and only accepts those that pass the
            validation check. The following is a diagram representation of the accepted JSON format.
          </Typography>
          {/* <div className="format-image">
            <img src="https://s3.amazonaws.com/electron-exam/general/schema.png" alt="" />
          </div> */}
        </div>
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  graphql(USER_BY_ID, { options: props => ({ variables: { userId: props.match.params.userId } }) })
)(UserLanding)
