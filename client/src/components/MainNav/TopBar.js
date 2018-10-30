import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'

const styles = theme => ({
  button: {
    marginRight: theme.spacing.unit * 3,
    '&:hover': {
      backgroundColor: 'transparent'
    }
  }
})

function TopBar({ loggedIn, user, handleLogout, classes }) {
  return (
    <React.Fragment>
      <Typography variant="h5" color="inherit" noWrap>
        Exam Maker <span className="beta">BETA</span>
      </Typography>
      <div style={{ flexGrow: 1 }} />
      {loggedIn && <Avatar src={user.avatar} alt="" className="avatar" />}
      {loggedIn ? (
        <Button color="inherit" onClick={handleLogout} classes={{ root: classes.button }}>
          Logout
        </Button>
      ) : (
        <Button href="/api/google" color="inherit" classes={{ root: classes.button }}>
          Login
        </Button>
      )}
    </React.Fragment>
  )
}

export default withStyles(styles)(TopBar)
