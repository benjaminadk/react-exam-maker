import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import SaveIcon from '@material-ui/icons/SaveSharp'
import DownloadIcon from '@material-ui/icons/GetAppSharp'
import { JsonIcon } from '../Icons'

const styles = theme => ({
  outlinedInput: {
    fontSize: '.75rem'
  },
  notchedOutline: {
    borderRadius: 0
  },
  input: {
    paddingTop: 10,
    paddingBottom: 10
  },
  button: {
    width: '90%',
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
  },
  icon: {
    marginLeft: theme.spacing.unit
  }
})

function LeftColumn({
  mode,
  index,
  title,
  code,
  pass,
  time,
  onChange,
  setMode,
  saveExam,
  downloadExam,
  classes
}) {
  return (
    <div className="left">
      <Typography variant="overline" className="heading">
        Exam Metadata
      </Typography>
      <TextField
        variant="outlined"
        name="title"
        label="Title"
        value={title}
        onChange={onChange}
        autoFocus
        tabIndex={1}
        className="textfield"
        InputLabelProps={{ shrink: true }}
        InputProps={{
          classes: {
            root: classes.outlinedInput,
            notchedOutline: classes.notchedOutline,
            input: classes.input
          }
        }}
      />
      <TextField
        variant="outlined"
        name="code"
        label="Exam Code"
        value={code}
        onChange={onChange}
        tabIndex={2}
        className="textfield"
        InputLabelProps={{ shrink: true }}
        InputProps={{
          classes: {
            root: classes.outlinedInput,
            notchedOutline: classes.notchedOutline,
            input: classes.input
          }
        }}
      />
      <TextField
        variant="outlined"
        name="pass"
        label="Passing Score"
        value={pass}
        onChange={onChange}
        tabIndex={3}
        className="textfield"
        InputLabelProps={{ shrink: true }}
        InputProps={{
          classes: {
            root: classes.outlinedInput,
            notchedOutline: classes.notchedOutline,
            input: classes.input
          }
        }}
      />
      <TextField
        variant="outlined"
        name="time"
        label="Time Limit"
        value={time}
        onChange={onChange}
        tabIndex={4}
        className="textfield"
        InputLabelProps={{ shrink: true }}
        InputProps={{
          classes: {
            root: classes.outlinedInput,
            notchedOutline: classes.notchedOutline,
            input: classes.input
          }
        }}
      />
      <Divider className="divider" />
      <br />
      <Button variant="contained" onClick={saveExam} classes={{ root: classes.button }}>
        Save Exam
        <SaveIcon className={classes.icon} />
      </Button>
      <Button
        variant="contained"
        onClick={() => setMode(mode === 0 ? 1 : 0)}
        classes={{ root: classes.button }}
      >
        Edit {mode === 0 ? 'Cover' : 'Question'}
      </Button>
      <Button variant="contained" onClick={() => setMode(2)} classes={{ root: classes.button }}>
        View JSON
        <JsonIcon className={classes.icon} />
      </Button>
      <Button
        variant="contained"
        onClick={downloadExam}
        disabled={!Number.isInteger(index) || !title || !code || !pass || !time}
        classes={{ root: classes.button }}
      >
        Download
        <DownloadIcon className={classes.icon} />
      </Button>
    </div>
  )
}

export default withStyles(styles)(LeftColumn)
