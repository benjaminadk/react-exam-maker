import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/AddSharp'
import DeleteIcon from '@material-ui/icons/DeleteSharp'

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
  },
  iconButton: {
    padding: 10,
    marginBottom: 10,
    '&:hover': {
      backgroundColor: 'transparent'
    }
  }
})

class CenterColumn extends Component {
  render() {
    const { questionTile, test, index, setIndex, addQuestion, openConfirmRQ, classes } = this.props
    return (
      <div className="center">
        <Typography variant="overline" className="heading">
          Questions
        </Typography>
        <div className="buttons">
          <Button variant="contained" onClick={addQuestion} classes={{ root: classes.button }}>
            New Question
          </Button>
          <IconButton onClick={openConfirmRQ} classes={{ root: classes.iconButton }}>
            <DeleteIcon />
          </IconButton>
        </div>
        <div className="questions">
          {test.length > 0 &&
            test.map((t, i) => (
              <div
                key={`question-${i}`}
                ref={i === index && questionTile}
                onClick={() => setIndex(i)}
                style={{ outline: i === index && '2px solid rgb(31, 144, 224)' }}
                className="question"
              >
                <Typography variant="overline">{i + 1}</Typography>
              </div>
            ))}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(CenterColumn)
