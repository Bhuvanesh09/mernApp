import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import {Alert, Row, Col, Grid, Form, FormGroup, Button, FormControl, Container} from "react-bootstrap";




class LoginUser extends Component {
  constructor() {
    super();
    this.state = {
      username : '',
      password : '',
    };
  }
  

  handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if(this.state.username === "" || this.state.password === ""){
      alert("Kindly enter username and password ")
      return
    }
    const data = {
      username : this.state.username,
      password : this.state.password,
    };

    axios
      .post('http://localhost:8082/api/userApi/login', data)
      .then(res => {
        console.log(res)
        if(res.data.Success == true){
            alert("Login Successful")
            localStorage.setItem('loggedIn', true)
            localStorage.setItem('userId', res.data.user_id)
            localStorage.setItem('name', res.data.name)
            window.location.href = "/market"
        }
        else{ alert(res.data.error) }
        
        })

  };


  render() {

    if(JSON.parse(localStorage.loggedIn) == false)
    return(
      <Container>
        <Row>
          <Col xs={3}></Col>
          <Col xs={6}>
            <Form onSubmit={this.onSubmit}>
            <hr></hr>
              <h3>Login Page</h3>
              <FormGroup controlId="username">
                <FormControl placeholder="Enter Username" type="text" name="username" onChange={this.handleChange} value={this.state.username} />
              </FormGroup>

              <FormGroup controlId="password">
                <FormControl placeholder="Enter Password" name="password" type="password" onChange={this.handleChange} value={this.state.password}/>
              </FormGroup>

              <Button variant="primary" type="submit" size="large" >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
    else return(
      <Row>
        <Col xs={3}></Col>
        <Col xs={6}><Alert variant="primary">Kindly logout before logging in again.</Alert>
        </Col>
      </Row>
      
    )
  }





}

export default LoginUser;