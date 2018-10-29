import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Checkbox from '@material-ui/core/Checkbox'
import AddIcon from '@material-ui/icons/AddSharp'
import DeleteIcon from '@material-ui/icons/DeleteSharp'
import CheckboxIcon from '@material-ui/icons/CheckBoxSharp'
import CheckboxOutlineIcon from '@material-ui/icons/CheckBoxOutlineBlankSharp'

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
  iconButton: {
    fontSize: theme.typography.pxToRem(10),
    padding: 4,
    borderRadius: 0,
    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.palette.primary.main
    }
  }
})

function RightChoices({
  test,
  index,
  addChoiceNode,
  onAnswerChange,
  onChoiceChange,
  removeChoiceNode,
  classes
}) {
  return (
    <div className="node">
      <div className="title">
        <Typography variant="overline">Choice Node</Typography>
        <IconButton onClick={addChoiceNode} classes={{ root: classes.iconButton }}>
          <AddIcon />
        </IconButton>
      </div>
      <div className="row-wrapper">
        {Number.isInteger(index)
          ? test[index].choices.map((c, i) => (
              <div key={`c-node-${i}`} className="row">
                <Checkbox
                  color="primary"
                  value="poop"
                  icon={<CheckboxOutlineIcon />}
                  checkedIcon={<CheckboxIcon />}
                  checked={test[index].answer[i]}
                  onChange={(e, checked) => onAnswerChange(e, checked, i)}
                />
                <TextField
                  variant="outlined"
                  value={test[index].variant === 2 ? test[index].answer[i] : c.text}
                  onChange={e => onChoiceChange(e, i)}
                  label="Text"
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
                <IconButton
                  onClick={() => removeChoiceNode(i, 'choices')}
                  classes={{ root: classes.iconButton }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))
          : null}
      </div>
    </div>
  )
}

export default withStyles(styles)(RightChoices)
