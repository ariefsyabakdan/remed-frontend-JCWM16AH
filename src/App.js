import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Container } from "reactstrap";
import NavbarComp from "./components/navbarComp";
import HomePage from "./pages/homePage";
import { Switch, Route } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container fluid className="p-0">
        <NavbarComp />
        <Switch>
          <Route path="/" component={HomePage} exact />
        </Switch>
      </Container>
    );
  }
}

export default App;
