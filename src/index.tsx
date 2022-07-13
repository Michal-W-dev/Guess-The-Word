import { HashRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';


createRoot(document.getElementById('root')!)
  .render(
    <Router basename='/'>
      <App />
    </Router>
  );
