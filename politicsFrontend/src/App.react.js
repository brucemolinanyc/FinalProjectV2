import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from "./pages/HomePage.react";
import LoginPage from "./pages/LoginPage.react";
import RegistrationPage from "./pages/RegistrationPage"
// import StoreCardsPage from "./pages/StoreCardsPage.react";
// import Energy from "./pages/Energy.react";
// import DisasterRelief from "./pages/DisasterRelief.react";
// import OrderForm from "./pages/OrderForm.react";
// import OrderConfirmation from "./pages/OrderConfirmation.react";

import "tabler-react/dist/Tabler.css";

type Props = {||};

function App(props: Props): React.Node {
  return (
    <React.StrictMode>
      <Router>
        <Switch>
          <Route path="/" component={LoginPage} exact={true} />
          <Route path="/home" component={HomePage} />
          <Route path="/register" component={RegistrationPage} />


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