import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import {Alert, Row, Col, Grid,FormLabel, Form, FormGroup, Button, FormControl, Container} from "react-bootstrap";


class ProductAdd extends Component {
  constructor() {
    super();
    this.state = {
        flag: false,
        productName : '',
        productPrice : 0,
        reqQuant : 0,
        sellerId : ''
      };
    if(JSON.parse(localStorage.loggedIn)){
        axios
            .get('http://localhost:8082/api/userApi/detail/'+localStorage.userId)
            .then(
                res => {
                    console.log(res.data.type)
                    if(res.data.type == "Seller"){
                        this.setState({flag : true})
                    }
                }
            )
    }

    //this.onSubmit = this.onSubmit.bind(this);
    //this.onChange = this.onChange.bind(this);
  }

  returnPage(cond) {
    if(cond){
        return (
            <Container>
        <Row >

        </Row>
        <Row>
          <Col xs={3}></Col>
          <Col xs={6}>
            <Form onSubmit={this.onSubmit}>
              <hr></hr>
              <h3>New Product Registration</h3>
              <FormGroup controlId="name">
                <FormControl placeholder="Product Name" type="text" name="productName" onChange={this.handleChange} value={this.state.productName} />
              </FormGroup>

              <FormGroup controlId="price">
                <FormLabel>Price</FormLabel>
                <FormControl placeholder="Price" type="number" name="productPrice" onChange={this.handleChange} value={this.state.productPrice}/>
              </FormGroup>

              <FormGroup controlId="reqQuant">
                <FormLabel>Required Quantity</FormLabel>
                <FormControl placeholder="Required Quantity" name="reqQuant" type="number" onChange={this.handleChange} value={this.state.reqQuant}/>
              </FormGroup>

              <Button variant="primary" type="submit" size="large" >
                Submit
              </Button>

            </Form>
          </Col>
        </Row>
      </Container>
        )  
    }
    else return(
      <Row>
      <Col xs={3}></Col>
      <Col xs={6}><br/><Alert variant="primary">Kindly register as a Seller to enable this feature.</Alert>
      </Col>
    </Row>
    )
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
      name : this.state.productName,
      price : this.state.productPrice,
      sellerId : localStorage.userId,
      reqQuant : this.state.reqQuant,
      currentQuant : 0,
      status : "Waiting"
    };
    console.log(data)
    axios
      .post('http://localhost:8082/api/productApi/add', data)
      .then(res => {
        console.log(res)
        this.setState({
          productName: '',
          productPrice : 0,
          reqQuant : 0
        })
        alert("Product Added Successfully")
      })
      .catch(err => {
        console.log("Error in ProductAdd!");
      })
  };

  render() {
    if(this.state.flag){
        return this.returnPage(true)
    }
    else {
        return this.returnPage(false)
    }
  }
}

export default ProductAdd;