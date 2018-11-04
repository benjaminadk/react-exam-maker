import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import PreviewIcon from '@material-ui/icons/RemoveRedEyeSharp'
import LinkIcon from '@material-ui/icons/LinkSharp'
import DownloadIcon from '@material-ui/icons/GetAppSharp'

const styles = theme => ({
  iconButton: {
    color: theme.palette.grey[600],
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: 'transparent'
    }
  }
})

function ListItem({ style, title, code, length, previewExam, classes }) {
  return (
    <Paper style={style} square className="v-list-item">
      <Typography variant="subtitle2" className="col-lg">
        {title}
      </Typography>
      <Typography variant="subtitle2" align="center" className="col-sm">
        {code}
      </Typography>
      <Typography variant="subtitle2" align="center" className="col-sm">
        {length}
      </Typography>
      <div className="col-lg end-align">
        <IconButton onClick={previewExam} classes={{ root: classes.iconButton }}>
          <PreviewIcon />
        </IconButton>
        <IconButton classes={{ root: classes.iconButton }}>
          <LinkIcon />
        </IconButton>
        <IconButton classes={{ root: classes.iconButton }}>
          <DownloadIcon />
        </IconButton>
      </div>
    </Paper>
  )
}

export default withStyles(styles)(ListItem)
