import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import CoverItem from '../MyExams/CoverItem'
import DefaultCover from '../MyExams/DefaultCover'

const styles = theme => ({})

function Preview({ exam, classes }) {
  return (
    <div className="preview">
      {exam ? (
        <Paper square className="cover">
          {exam.cover.length ? (
            exam.cover.map((c, i) => <CoverItem key={i} node={c} />)
          ) : (
            <DefaultCover title={exam.title} />
          )}
        </Paper>
      ) : (
        <Paper square className="cover">
          <Typography variant="h6">Exam Preview</Typography>
        </Paper>
      )}
    </div>
  )
}

export default withStyles(styles)(Preview)
