import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import EditIcon from '@material-ui/icons/EditSharp'
import DownloadIcon from '@material-ui/icons/GetAppSharp'
import DeleteIcon from '@material-ui/icons/DeleteSharp'
import LinkIcon from '@material-ui/icons/LinkSharp'
import PublicIcon from '@material-ui/icons/PublicSharp'

const styles = theme => ({
  avatar: {
    width: 25,
    height: 25,
    backgroundColor: theme.palette.grey[600],
    fontSize: theme.typography.pxToRem(14)
  },
  iconButton: {
    color: theme.palette.grey[600],
    fontSize: theme.typography.pxToRem(22),
    padding: 6,
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: 'transparent'
    }
  }
})

function Actions({ exam, editExam, downloadExam, copyLink, makePublic, openConfirmDE, classes }) {
  return (
    <CardActions className="actions">
      <Avatar className={classes.avatar}>{exam.test.length}</Avatar>
      <IconButton onClick={() => editExam(exam)} classes={{ root: classes.iconButton }}>
        <EditIcon fontSize="inherit" />
      </IconButton>
      <IconButton onClick={() => downloadExam(exam)} classes={{ root: classes.iconButton }}>
        <DownloadIcon fontSize="inherit" />
      </IconButton>
      <IconButton onClick={() => copyLink(exam.id)} classes={{ root: classes.iconButton }}>
        <LinkIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        onClick={() => makePublic(exam.id, exam.public)}
        classes={{ root: classes.iconButton }}
        style={{ color: exam.public && 'rgb(36, 132, 235)' }}
      >
        <PublicIcon fontSize="inherit" color="inherit" />
      </IconButton>
      <IconButton onClick={() => openConfirmDE(exam.id)} classes={{ root: classes.iconButton }}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </CardActions>
  )
}

export default withStyles(styles)(Actions)
