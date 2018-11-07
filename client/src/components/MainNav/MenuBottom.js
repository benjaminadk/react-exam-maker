import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import SimulatorIcon from '@material-ui/icons/OpenInNewSharp'
import InfoIcon from '@material-ui/icons/InfoSharp'
import HelpIcon from '@material-ui/icons/HelpSharp'

const styles = theme => ({
  listItem: {
    '&:hover': {
      color: 'rgb(37, 135, 233)',
      backgroundColor: 'rgb(227, 240, 252)',
      outline: '2px solid rgb(37, 135, 233)'
    }
  }
})

function MenuBottom({ gotoLink, openAbout, classes }) {
  const list = [
    {
      text: 'Exam Simulator',
      icon: <SimulatorIcon />,
      click: () => gotoLink('https://github.com/benjaminadk/electron-exam/releases')
    },
    {
      text: 'Documentation',
      icon: <HelpIcon />,
      click: () => gotoLink('https://github.com/benjaminadk/react-exam-maker/wiki')
    },
    { text: 'About', icon: <InfoIcon />, click: openAbout }
  ]
  return (
    <div style={{ position: 'absolute', bottom: 0, width: 239, overflow: 'hidden' }}>
      <Divider />
      <List disablePadding>
        {list.map((l, i) => (
          <ListItem key={l.text} button onClick={l.click} classes={{ button: classes.listItem }}>
            <ListItemIcon>{l.icon}</ListItemIcon>
            <ListItemText primary={l.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  )
}

export default withStyles(styles)(MenuBottom)
