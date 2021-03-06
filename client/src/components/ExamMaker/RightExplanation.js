import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/AddSharp'
import ImageIcon from '@material-ui/icons/ImageSharp'
import TextIcon from '@material-ui/icons/TitleSharp'
import BoldIcon from '@material-ui/icons/FormatBoldSharp'
import DeleteIcon from '@material-ui/icons/DeleteSharp'

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
  },
  toggleGroup: {
    borderRadius: 0,
    marginRight: theme.spacing.unit * 2
  },
  toggleSelected: {
    boxShadow: theme.shadows[1]
  },
  toggleButton: {
    borderRadius: 0,
    '&:hover': {
      color: fade(theme.palette.action.active, 0.38)
    }
  },
  toggleButtonSelected: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  }
})

const NODE_TYPES = [
  { icon: <TextIcon />, value: 1 },
  { icon: <ImageIcon />, value: 0 },
  { icon: <BoldIcon />, value: 2 }
]

function RightExplanation({
  test,
  index,
  addExplanationNode,
  onToggleExplanation,
  onExplanationChange,
  removeExplanationNode,
  classes
}) {
  return (
    <div className="node">
      <div className="title">
        <Typography variant="overline">Explanation Node</Typography>
        <IconButton onClick={addExplanationNode} classes={{ root: classes.iconButton }}>
          <AddIcon />
        </IconButton>
      </div>
      <div className="row-wrapper">
        {Number.isInteger(index)
          ? test[index].explanation.map((e, i) => (
              <div key={`e-node-${i}`} className="row">
                <ToggleButtonGroup
                  value={e.variant}
                  onChange={(ev, v) => onToggleExplanation(ev, v, i)}
                  exclusive
                  selected
                  classes={{
                    root: classes.toggleGroup,
                    selected: classes.toggleSelected
                  }}
                >
                  {NODE_TYPES.map((n, j) => (
                    <ToggleButton
                      key={`toggle-${j}`}
                      value={n.value}
                      classes={{
                        root: classes.toggleButton,
                        selected: classes.toggleButtonSelected
                      }}
                    >
                      {n.icon}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
                <TextField
                  variant="outlined"
                  value={e.text}
                  onChange={ev => onExplanationChange(ev, i)}
                  label="Text / Source URL"
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
                  onClick={() => removeExplanationNode(i, 'explanation')}
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

export default withStyles(styles)(RightExplanation)
