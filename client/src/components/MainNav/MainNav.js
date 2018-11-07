import React from 'react'
import { compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import MenuTop from './MenuTop'
import MenuBottom from './MenuBottom'
import TopBar from './TopBar'

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100vh',
    overflowX: 'hidden'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: theme.shadows[0],
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    height: '100%',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit
  }
})

class MainNav extends React.Component {
  state = {
    open: false
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  gotoHome = () => this.props.history.push('/')

  gotoExamMaker = () => this.props.history.push('/create')

  gotoMyExams = () => this.props.history.push('/my-exams')

  gotoPublic = () => this.props.history.push('/public')

  gotoUserLanding = userId => this.props.history.push(`/user/${userId}`)

  gotoLink = link => {
    let node = document.createElement('a')
    node.setAttribute('href', link)
    node.setAttribute('target', '_blank')
    document.body.appendChild(node)
    node.click()
    node.remove()
  }

  render() {
    const { loggedIn, user, handleLogout, openAbout, classes } = this.props

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open
              })}
            >
              <MenuIcon />
            </IconButton>
            <TopBar loggedIn={loggedIn} user={user} handleLogout={handleLogout} />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose)
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <MenuTop
            loggedIn={loggedIn}
            user={user}
            gotoHome={this.gotoHome}
            gotoExamMaker={this.gotoExamMaker}
            gotoMyExams={this.gotoMyExams}
            gotoPublic={this.gotoPublic}
            gotoUserLanding={this.gotoUserLanding}
          />
          <Divider />
          <MenuBottom gotoLink={this.gotoLink} openAbout={openAbout} />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  withRouter
)(MainNav)
