import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
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
    border: `1px solid ${theme.palette.grey[400]}`,
    marginRight: theme.spacing.unit * 2
  },
  toggleSelected: {
    boxShadow: theme.shadows[0]
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

function RightCover({
  cover,
  addCoverNode,
  onCoverChange,
  onToggleCover,
  removeCoverNode,
  classes
}) {
  return (
    <>
      <Typography variant="overline" align="center">
        Cover Editor
      </Typography>
      <Divider className="divider" />
      <div className="node">
        <div className="title">
          <Typography variant="overline">Cover Node</Typography>
          <IconButton onClick={addCoverNode} classes={{ root: classes.iconButton }}>
            <AddIcon />
          </IconButton>
        </div>
        <div className="row-wrapper">
          {cover.map((c, i) => (
            <div key={`c-node-${i}`} className="row">
              <ToggleButtonGroup
                value={c.variant}
                onChange={(e, v) => onToggleCover(e, v, i)}
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
                value={c.text}
                onChange={e => onCoverChange(e, i)}
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
                onClick={() => removeCoverNode(i, 'cover')}
                classes={{ root: classes.iconButton }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default withStyles(styles)(RightCover)
