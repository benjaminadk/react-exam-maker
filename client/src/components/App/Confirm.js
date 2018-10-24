import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const styles = theme => ({
  button: {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    boxShadow: theme.shadows[0],
    marginBottom: 15,
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    },
    '&:active': {
      boxShadow: theme.shadows[0]
    },
    '&:focus': {
      boxShadow: theme.shadows[0]
    }
  }
})

function Confirm({ alert, open, title, detail, onClose, onOkay, classes }) {
  return (
    <Dialog open={open} onClose={onClose}>
      {/* <DialogTitle disableTypography>
        <Typography variant="caption" color="inherit">
          {title}
        </Typography>
      </DialogTitle> */}
      <DialogContent>
        <div className="confirm-content">
          <div>
            <Typography variant="h6" className="message">
              {title}
            </Typography>
            <Typography variant="caption">{detail}</Typography>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onOkay} classes={{ root: classes.button }}>
          Ok
        </Button>
        {!alert && (
          <Button onClick={onClose} classes={{ root: classes.button }}>
            Cancel
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(styles)(Confirm)
