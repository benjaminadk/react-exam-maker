import { createMuiTheme } from '@material-ui/core/styles'

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
    },
    MuiIconButton: {
      root: {
        borderRadius: 0,
        '&:hover': {
          backgroundColor: 'transparent'
        }
      }
    }
  },
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  },
  palette: {
    primary: {
      main: 'rgb(36, 132, 235)'
    },
    secondary: {
      main: 'rgb(247, 229, 29)'
    }
  }
})
