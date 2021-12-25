import { FC } from 'react';
import './App.css';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import { Route, Routes } from 'react-router-dom';
import { OptionsProvider } from './context/options.context'
import { ThemeProvider } from '@mui/material/styles';
import customTheme from './styles/theme';



const App: FC = () => {
  return (
    <OptionsProvider>
      <ThemeProvider theme={customTheme}>
        <div className="App">
          <Routes>
            <Route path='/' element={<StartScreen />} />
            <Route path='/game' element={<GameScreen />} />
          </Routes>
        </div>
      </ThemeProvider>
    </OptionsProvider>
  );
}

export default App;
