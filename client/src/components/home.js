import React, { Component } from "react";
import { Jumbotron, Button } from "react-bootstrap";
export default class logout extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <Jumbotron>
          <h1>Hello, Member!</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for
            calling extra attention to featured content or information.
          </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Jumbotron>
      </div>
    );
  }
}
