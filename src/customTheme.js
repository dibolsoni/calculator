import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[900],
    },
    secondary: {
      main: green['A400'],
    },
    matrix: {
      background: '#01260A',
      color: '#2ABF40'
    }
  },
});

export default theme;