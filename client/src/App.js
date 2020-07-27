import React from "react";
import "./App.css";
import Login from "./components/login";
import SignUp from "./components/signup";
import Task from "./components/task";
import Logout from "./components/logout";
import Home from "./components/home";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

function App() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand href="#">
          <img
            alt=""
            src={require(".././src/assets/ig_labs.png")}
            width="55"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          <b>Ignite Labs</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
            <Nav.Link href="/logout">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Router>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/task">
            <Task />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
        </Switch>
      </Router>
      <div className="fixed-bottom" style={{ textAlign: "center" }}>
        <Navbar expand="lg" bg="dark" variant="dark">
          <Navbar.Brand>Footer</Navbar.Brand>
        </Navbar>
      </div>
    </div>
  );
}

export default App;
