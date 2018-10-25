import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  container: {
    height: '75%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const Loading = ({ classes }) => (
  <div className={classes.container}>
    <CircularProgress size={100} thickness={3.0} color="primary" />
    <br />
    <Typography variant="h6">Loading...</Typography>
  </div>
)

export default withStyles(styles)(Loading)
