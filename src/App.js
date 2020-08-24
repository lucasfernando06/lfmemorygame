import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Game from './components/Game';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f05033',
    },
    dark: {
      main: '#343a40',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Game />
    </ThemeProvider>
  );
}

export default App;
