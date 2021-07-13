import React from 'react';
import './App.css';
import {Provider} from 'react-redux'
import LandingPage from './views/LandingPage';

const App: React.FC = () => {
  return (
    <LandingPage />
  );
}

export default App;
