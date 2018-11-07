import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/HomeSharp'
import CreateIcon from '@material-ui/icons/CreateSharp'
import ExamIcon from '@material-ui/icons/SchoolSharp'
import PublicIcon from '@material-ui/icons/PublicSharp'
import UserIcon from '@material-ui/icons/PersonSharp'

const styles = theme => ({
  listItem: {
    '&:hover': {
      color: 'rgb(37, 135, 233)',
      backgroundColor: 'rgb(227, 240, 252)',
      outline: '2px solid rgb(37, 135, 233)'
    }
  }
})

function MenuTop({
  loggedIn,
  user,
  gotoHome,
  gotoExamMaker,
  gotoMyExams,
  gotoPublic,
  gotoUserLanding,
  classes
}) {
  const list = [
    { text: 'Home', icon: <HomeIcon />, click: gotoHome },
    { text: 'Create Exam', icon: <CreateIcon />, click: gotoExamMaker },
    { text: 'My Exams', icon: <ExamIcon />, click: gotoMyExams },
    { text: 'Public Exams', icon: <PublicIcon />, click: gotoPublic }
  ]
  return (
    <List disablePadding>
      {list.map((l, i) => (
        <ListItem key={l.text} button onClick={l.click} classes={{ button: classes.listItem }}>
          <ListItemIcon>{l.icon}</ListItemIcon>
          <ListItemText primary={l.text} />
        </ListItem>
      ))}
      {loggedIn && (
        <ListItem
          button
          onClick={() => gotoUserLanding(user.id)}
          classes={{ button: classes.listItem }}
        >
          <ListItemIcon>
            <UserIcon />
          </ListItemIcon>
          <ListItemText primary="Account" />
        </ListItem>
      )}
    </List>
  )
}

export default withStyles(styles)(MenuTop)
