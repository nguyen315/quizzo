import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import LandingPage from './views/LandingPage';
import store from './store/store';
import ProtectedRoute from './components/routing/ProtectedRoute';
import About from './views/About';
import Dashboard from './views/Dashboard';
import ListQuestions from './views/ListQuestions';
import Socket from './views/Socket';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <ProtectedRoute exact path="/about" component={About} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/list-questions" component={ListQuestions} />
          <ProtectedRoute exact path="/socket" component={Socket} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
