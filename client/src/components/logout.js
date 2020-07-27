import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: true,
    };
  }

  componentDidMount() {
    localStorage.setItem("token", null);
    console.log("token", localStorage.getItem("token"));
    this.setState({
      authenticated: false,
    });
  }
  render() {
    return !this.state.authenticated && <Redirect to={{ pathname: "/home" }} />;
  }
}
