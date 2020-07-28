import React, { Component } from "react";
import axios from "axios";
import Item from "./listItem";
import {
  Form,
  Row,
  Col,
  Button,
  Jumbotron,
  Image,
  Container,
} from "react-bootstrap";

export default class task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      tasks: [],
      name: "",
    };
  }

  componentDidMount() {
    this.getData();
  }
  getData = async () => {
    try {
      const res = await axios.get(
        "https://mernstackapptodolist.herokuapp.com/api/user/tasks",
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      if (res) {
        console.log(res.data.tasks);

        this.setState({
          name: res.data.name,
          tasks: res.data.tasks,
        });
      }
    } catch (err) {
      console.log("Invalid Credentials");
    }
  };
  handleTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "https://mernstackapptodolist.herokuapp.com/api/user/tasks",
        {
          title: this.state.title,
          description: this.state.description,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      if (res) {
        console.log("Added Successfully!");
        this.getData();
      }
    } catch (err) {
      console.log("Invalid Credentials");
    }
  };
  render() {
    return (
      <div
        style={{
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        <br />
        <div class="row">
          <Image
            src={require(".././assets/welcome.jpg")}
            style={{ height: 100, width: 180, marginLeft: 35, marginRight: 35 }}
            rounded
          />
          <h3 style={{ marginLeft: 15 }}>{this.state.name}</h3>
        </div>
        <br />
        <br />
        <div
          style={{
            textAlign: "center",
            alignContent: "center",
          }}
        >
          <Form>
            <Form.Group as={Row} controlId="formHorizontalText">
              <Form.Label column sm={2} style={{ fontWeight: "bold" }}>
                Title
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Enter Title"
                  value={this.state.title}
                  onChange={(e) => this.handleTitle(e)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalText">
              <Form.Label column sm={2} style={{ fontWeight: "bold" }}>
                Description
              </Form.Label>

              <Col sm={10}>
                <Form.Control
                  as="textarea"
                  rows="2"
                  placeholder="Enter Description"
                  value={this.state.description}
                  onChange={(e) => this.handleDescription(e)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col sm={{ span: 10, offset: 2 }}>
                <Button
                  variant="outline-primary"
                  type="button"
                  onClick={(e) => this.handleSubmit(e)}
                >
                  Submit
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
        <div class="row">
          {this.state.tasks.map((item, key) => (
            <Item key={key} value={item} />
          ))}
        </div>
      </div>
    );
  }
}
