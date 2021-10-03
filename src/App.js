import './App.css';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import { Route, Switch } from 'react-router-dom';
import { OptionsProvider } from './context/options.context'

const App = () => {
  return (
    <div className="App">
      <OptionsProvider>
        <Switch>
          <Route exact path='/' component={StartScreen} />
          <Route exact path='/game' component={GameScreen} />
        </Switch>
      </OptionsProvider>
    </div>
  );
}

export default App;
