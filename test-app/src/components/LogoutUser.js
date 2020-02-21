import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { Row, Col, Grid, Form, FormGroup, Button, FormControl, Container} from "react-bootstrap";




class LogoutUser extends Component {
  constructor() {
    super();

  } 

  render(){
      localStorage.setItem('loggedIn', false)
      this.props.history.push('/login');  
      return(
          "You have successfully logged out"
      )
  }
}


export default LogoutUser