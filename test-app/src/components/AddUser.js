import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { Row, Col, Grid, Form, FormGroup, Button, FormControl, Container} from "react-bootstrap";


class AddUser extends Component {
  constructor() {
    super();
    this.state = {
      name : '',
      username : '',
      password : '',
      type : 'Buyer',
    };
    //this.onSubmit = this.onSubmit.bind(this);
    //this.onChange = this.onChange.bind(this);
  }


  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if(this.state.type === ""){
      alert("Kindly enter user type. ")
      return
    }
    const data = {
      name : this.state.name,
      username : this.state.username,
      password : this.state.password,
      type : this.state.type
    };

    axios
      .post('http://localhost:8082/api/userApi/add', data)
      .then(res => {
        this.setState({
          username: '',
          name : '',
          password : ''
        })
        this.props.history.push('/login');
      })
      .catch(err => {
        console.log("Error in AddUser!");
      })
  };

  render() {
    return (
      <Container>
        <Row >

        </Row>
        <Row>
          <Col xs={3}></Col>
          <Col xs={6}>
            <Form onSubmit={this.onSubmit}>
              <hr></hr>
              <h3>New User Registration</h3>
              <FormGroup controlId="username">
                <FormControl placeholder="Enter Username" type="text" name="username" onChange={this.handleChange} value={this.state.username} />
              </FormGroup>

              <FormGroup controlId="Name">
                <FormControl placeholder="Enter Name" type="text" name="name" onChange={this.handleChange} value={this.state.name}/>
              </FormGroup>

              <FormGroup controlId="password">
                <FormControl placeholder="Enter Password" name="password" type="password" onChange={this.handleChange} value={this.state.password}/>
              </FormGroup>

              <Form.Group controlId="type-select">
                <Form.Label>Select User Type:</Form.Label>
                <Form.Control as="select" name="type" value={this.state.type} onChange={this.handleChange}>
                  <option value="Buyer">Buyer</option>
                  <option value="Seller">Seller</option>
                </Form.Control>
              </Form.Group>

              <Button variant="primary" type="submit" size="large" >
                Submit
              </Button>

            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AddUser;