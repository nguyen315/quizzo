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
import HostRoom from './views/HostRoom';
import { Container } from 'react-bootstrap';
import PlayerRoom from './views/PlayerRoom';
import CountDown from './components/layouts/CountDown';
import ListRooms from './views/ListRooms';
import HostLobby from './components/game/HostLobby';
import CreateRoom from './views/CreateRoom';
import ScoreBoard from './views/ScoreBoard';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Container fluid>
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
            <ProtectedRoute exact path="/list-rooms" component={ListRooms} />
            <ProtectedRoute exact path="/play-room" component={HostRoom} />
            <ProtectedRoute exact path="/create-room" component={CreateRoom} />
            <Route exact path="/play-room-guest" component={PlayerRoom} />
            <Route exact path="/lobby" component={HostLobby} />
            <Route exact path="/score-board" component={ScoreBoard} />
          </Switch>
        </Router>
      </Container>
    </Provider>
  );
};

export default App;
