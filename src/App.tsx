import { FC } from 'react';
import './App.css';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import { Route, Routes } from 'react-router-dom';
import { OptionsProvider } from './context/options.context'

const App: FC = () => {
  return (
    <div className="App">
      <OptionsProvider>
        <Routes>
          <Route path='/' element={<StartScreen />} />
          <Route path='/game' element={<GameScreen />} />
        </Routes>
      </OptionsProvider>
    </div>
  );
}

export default App;
