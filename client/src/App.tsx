import React from 'react';
import './App.css';
import {Provider} from 'react-redux'
import LandingPage from './views/LandingPage';
import store from './store/store'


const App: React.FC = () => {
  return (
    <Provider store={ store }>
      <LandingPage />
    </Provider>
  );
}

export default App;
