import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

function TopBar({ loggedIn }) {
  return (
    <React.Fragment>
      <Typography variant="h6" color="inherit" noWrap>
        Exam Maker
      </Typography>
      <div style={{ flexGrow: 1 }} />
      {loggedIn ? (
        <Button color="inherit">Logout</Button>
      ) : (
        <Button href="/api/google" color="inherit">
          Login
        </Button>
      )}
    </React.Fragment>
  )
}

export default TopBar
