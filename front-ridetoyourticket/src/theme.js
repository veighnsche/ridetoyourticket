import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import teal from 'material-ui/es/colors/teal'
import amber from '@material-ui/core/es/colors/amber'

export const center = {
  display: 'flex',
  justifyContent: 'center',
}

export const fullWidth = {
  width: '100%'
}

export default createMuiTheme({
  palette: {
    primary: teal,
    secondary: amber,
    // type: 'dark',
  },
  spacing: {
    app: {
      maxWidth: 1600,
    },
    input: {
      width: 400,
    },
    card: {
      maxWidth: 425,
    },
  },
  typography: {
    useNextVariants: true
  },
})
