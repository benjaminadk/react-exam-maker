import React from 'react'
import Typography from '@material-ui/core/Typography'

function DefaultCover({ title }) {
  return (
    <React.Fragment>
      <Typography variant="subtitle2">{title}</Typography>
      <img
        src="https://s3.amazonaws.com/electron-exam/general/icon.png"
        alt="default"
        className="cover-default"
      />
      <Typography variant="caption">Create cover for cooler display</Typography>
    </React.Fragment>
  )
}

export default DefaultCover
