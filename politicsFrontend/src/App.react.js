import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LoginPage from "./pages/LoginPage.react";
import HomePage from "./pages/HomePage.react";
import ProfilePage from "./pages/ProfilePage.react";
import RegistrationPage from "./pages/RegistrationPage";
import RepresentativeCardPage from "./pages/RepresentativeCardPage.react";
import VoterStatusPage from "./pages/VoterStatusPage.react";

import "tabler-react/dist/Tabler.css";

type Props = {||};

function App(props: Props): React.Node {
  return (
    <React.StrictMode>
      <Router>
        <Switch>
          <Route path="/" component={LoginPage} exact={true} />
          <Route path="/home" component={HomePage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/register" component={RegistrationPage} />
          <Route path="/representative/:name" component={RepresentativeCardPage} />
          <Route path="/vote" component={VoterStatusPage} />
        </Switch>
      </Router>
    </React.StrictMode>
  );
}

export default App;

// <Route path="/profile" component={ProfilePage} />
// <Route path="/representative/:name" component={RepresentativesCard} />
// <Route path="/register" component={RegistrationPage} />
// <Route path="/vote" component={RegistrationStatusPage} />
// <Route component={NotFoundPage} />