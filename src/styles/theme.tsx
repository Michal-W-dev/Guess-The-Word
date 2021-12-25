import { createTheme } from '@mui/material/styles';

// Theme for colors
const customTheme = createTheme({
  palette: {
    primary: {
      main: 'hsla(var(--num),48%,48%)',
      light: 'hsla(calc(var(--num) - 29),100%,80%)',
      contrastText: 'white'
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "1.5rem",
          backgroundColor: "hsla(calc(var(--num) - 20),100%,60%,.7)"
        },
        arrow: {
          color: "hsla(calc(var(--num) - 20),100%,60%,.7)"
        }
      }
    }
  }
});

export default customTheme;