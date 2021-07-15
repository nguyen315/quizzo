import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import LandingPage from "./views/LandingPage";
import store from "./store/store";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import Landing from "./views/Landing";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/landingPage" component={LandingPage} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
