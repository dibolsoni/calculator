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
    text: {
      primary: green['A400'],
      secondary: green[400]
    },
    background: {
      paper: '#01260A',
      default: '#01260A'
    },
    matrix: {
      background: '#01260A',
      color: '#2ABF40'
    }
  },
  typography: {
    fontFamily: 'Orbitron, Roboto, sans-serif',
    h1: {
      fontSize: '1.5rem',
      '@media (min-width:600px)': {
        fontSize: '3.052rem',
      },
    },
    h2: {
      fontSize: '1.5rem',
      '@media (min-width:600px)': {
        fontSize: '2.441rem',
      },
    },
    h3: {
      fontSize: '1.5rem',
      '@media (min-width:600px)': {
        fontSize: '1.953rem',
      },
    },
    h4: {
      fontSize: '1.5rem',
      '@media (min-width:600px)': {
        fontSize: '1.563rem',
      },
    },
    h5: {
      fontSize: '1.5rem',
      '@media (min-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    h6: {
      fontSize: '1rem',
      '@media (min-width:600px)': {
        fontSize: '1rem',
      },
    }
  },
})

export default theme;