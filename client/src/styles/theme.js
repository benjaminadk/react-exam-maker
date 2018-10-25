import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(36, 132, 235)'
    },
    secondary: {
      main: 'rgb(247, 229, 29)'
    }
  }
})

export default createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
      disableTouchRipple: true
    }
  },
  overrides: {
    MuiDialog: {
      paper: {
        borderRadius: 0
      }
    }
  },
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  },
  palette: {
    primary: {
      main: theme.palette.primary.main
    },
    secondary: {
      main: theme.palette.secondary.main
    }
  }
})
