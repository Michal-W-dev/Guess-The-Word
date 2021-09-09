import './App.css';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';

import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={StartScreen} />
        <Route exact path='/game' component={GameScreen} />
      </Switch>
    </div>
  );
}

export default App;
