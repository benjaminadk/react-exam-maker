import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  caption: {
    width: 250,
    fontSize: '.65rem'
  }
})

function CoverItem({ node: { variant, text }, classes }) {
  if (variant === 0) {
    return <img key={text} src={text} alt="cover" className="cover-img" />
  } else if (variant === 1) {
    return (
      <Typography
        key={text}
        variant="caption"
        align="center"
        classes={{ caption: classes.caption }}
        noWrap
      >
        {text}
      </Typography>
    )
  } else if (variant === 2) {
    return (
      <Typography key={text} variant="subtitle2">
        {text}
      </Typography>
    )
  }
}

export default withStyles(styles)(CoverItem)
