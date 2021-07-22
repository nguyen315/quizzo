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

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <ProtectedRoute exact path="/about" component={About} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute
            exact
            path="/list-questions"
            component={ListQuestions}
          />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
