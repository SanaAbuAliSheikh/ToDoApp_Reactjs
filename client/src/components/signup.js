import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";

export default class signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      loading: true,
      authenticated: false,
    };
  }

  handleName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handlePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    try{
      const res = await axios.post(
        "https://mernstackapptodolist.herokuapp.com/api/user",
        {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      if(res){
          console.log(res.data.token);
          localStorage.setItem("token", res.data.token);
          this.setState({
            authenticated: true,
          });
        }
      } catch (err) {
          console.log(err.response.data.msg);
        }
  };
  render() {
    if (this.state.authenticated) {
      return <Redirect to={{ pathname: "/login" }} />;
    } else {
      return (
        <div
          style={{
            marginLeft: 20,
            marginRight: 20,
            textAlign: "center",
            alignContent: "center",
          }}
        >
          <br></br>
          <Form>
            <Form.Group as={Row} controlId="formHorizontalText">
              <Form.Label column sm={2} style={{ fontWeight: "bold" }}>
                Title
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={this.state.name}
                  onChange={(e) => this.handleName(e)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={2} style={{ fontWeight: "bold" }}>
                Email
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="Email"
                  placeholder="Enter Email"
                  value={this.state.email}
                  onChange={(e) => this.handleEmail(e)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalPassword">
              <Form.Label column sm={2} style={{ fontWeight: "bold" }}>
                Password
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="Password"
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={(e) => this.handlePassword(e)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col sm={{ span: 10, offset: 2 }}>
                <Button
                  variant="primary"
                  type="button"
                  onClick={(e) => this.handleSubmit(e)}
                >
                  Sign Up
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      );
    }
  }
}
