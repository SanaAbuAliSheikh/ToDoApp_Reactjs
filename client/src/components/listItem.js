import React, { Component } from "react";
import axios from "axios";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Card, Button } from "react-bootstrap";

export default class listItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delete: null,
    };
  }
  async handleDelete(id) {
    try {
      const res = await axios.delete(
        //
        `http://localhost:5000/api/user/tasks/${id}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      if (res) {
        this.setState({
          delete: true,
        });
        window.location.reload(true);
      }
    } catch (err) {
      this.setState({
        delete: false,
      });
    }
  }
  render() {
    return (
      <div>
        <div>
          {
            this.state.delete ? (
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                Delete Successfully — <strong>check it out!</strong>
              </Alert>
            ) : null
            // (
            //   <Alert severity="error">
            //     <AlertTitle>Error</AlertTitle>
            //     Task not Deleted — <strong>check it out!</strong>
            //   </Alert>
            // )
          }
        </div>
        <div className="col-lg-4 col-md-6">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{this.props.value.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {this.props.value.date}
              </Card.Subtitle>
              <Card.Text>{this.props.value.description}</Card.Text>
            </Card.Body>
            <Button
              variant="danger"
              onClick={() => this.handleDelete(this.props.value._id)}
            >
              Delete
            </Button>{" "}
          </Card>
        </div>
      </div>
    );
  }
}
