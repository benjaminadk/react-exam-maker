import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/HomeSharp'
import CreateIcon from '@material-ui/icons/CreateSharp'
import ExamIcon from '@material-ui/icons/SchoolSharp'

const styles = theme => ({})

function MenuLeft({ gotoHome, gotoExamMaker, gotoSavedExams, classes }) {
  const list = [
    { text: 'Home', icon: <HomeIcon />, click: gotoHome },
    { text: 'Create Exam', icon: <CreateIcon />, click: gotoExamMaker },
    { text: 'Saved Exams', icon: <ExamIcon />, click: gotoSavedExams }
  ]
  return (
    <List disablePadding>
      {list.map((l, i) => (
        <ListItem key={l.text} button onClick={l.click}>
          <ListItemIcon>{l.icon}</ListItemIcon>
          <ListItemText primary={l.text} />
        </ListItem>
      ))}
    </List>
  )
}

export default withStyles(styles)(MenuLeft)
