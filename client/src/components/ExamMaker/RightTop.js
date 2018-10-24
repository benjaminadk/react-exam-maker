import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

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
  }
})

const QUESTION_TYPES = [
  { value: 0, text: 'Multiple Choice' },
  { value: 1, text: 'Choose Two or More' },
  { value: 2, text: 'Fill in the Blank' }
]

function RightTop({ index, test, onTypeChange, classes }) {
  return (
    <div className="top-row">
      {Number.isInteger(index) ? (
        <TextField
          variant="outlined"
          label="Question Type"
          value={test[index].variant}
          onChange={onTypeChange}
          select
          className="select-type"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            classes: {
              root: classes.outlinedInput,
              notchedOutline: classes.notchedOutline,
              input: classes.input
            }
          }}
        >
          <MenuItem value="none">None</MenuItem>
          {QUESTION_TYPES.map((t, i) => (
            <MenuItem key={t.text} value={t.value}>
              {t.text}
            </MenuItem>
          ))}
        </TextField>
      ) : null}
    </div>
  )
}

export default withStyles(styles)(RightTop)
