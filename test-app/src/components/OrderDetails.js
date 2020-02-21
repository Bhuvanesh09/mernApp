import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { Row, Col, Grid, Card, Container, Button, Form, FormLabel, FormGroup, FormControl} from "react-bootstrap";

class OrderDetails extends Component{
    constructor() {
        super();
        this.state = {
          cards : [],
          orderInfo : []
        };
        axios
        .post('http://localhost:8082/api/orderApi/listbyuser',{userId:localStorage.userId})
        .then(res => {
            console.log(res)
          this.setState({
             orderInfo : res.data
          })

        })
        .catch(err => {
          console.log("Error in Fetching Products");
        })
    }

    handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };
  
    resolveRating(status, id) {
      if(status == "Placed"){
        return (
          <Form>
                <FormGroup controlId={id+"rating"}>
                <FormControl placeholder="Enter Vendor Rating" type="number" name="amt"/>
                </FormGroup>
                <Button variant="info" onClick={this.ratingClick(id)}>Submit</Button>
          </Form>
        )
      }
      else if(status == "Dispatched"){
        return(
          <Form>
          <FormGroup controlId={id + "rating"}>
          <FormControl placeholder="Enter Product Rating" type="number" name="amt"/>
          </FormGroup>
          <FormGroup controlId={id + "review"}>
          <FormControl as="textarea" rows="3" placeholder="Review" type="text-box" name="amt"/>
          </FormGroup>
          <Button variant="info" onClick={this.reviewClick(id)}>Submit</Button>
          </Form>
        )
      }
    }
    returnCards() {

       let cards = []
      // console.log(this.productInfo)
        for (const order of this.state.orderInfo){
            cards.push(
                <div className="col-sm-4" style={{ display: 'inline-block' }} key={order.productId.name}>
          <Card bg="warning" text="black" style={{ width: '18rem', margin: '1rem' }}>
            <Card.Body>
              <Card.Title>{order.productId.name}</Card.Title>
              <Card.Text>
                Order Quantity : {order.quantity} <br/>
                Remaining in Bundle : {order.productId.reqQuant - order.productId.currentQuant} <br/>
                Order Status : <Button variant="outline-danger" disabled> {order.productId.status} </Button>
              </Card.Text>
              {this.resolveRating(order.productId.status, order._id)}
            </Card.Body>
          </Card>
        </div>
            )
        }

        return cards
    }

  render() {
    return (
      <Container>
          {this.returnCards()}
      </Container>
    );
  }

  ratingClick(id){
    return function() {
      axios
        .post("http://localhost:8082/api/reviewApi/add",{orderId: id, rating: document.getElementById(id + "rating").value})
        .then(res => console.log("Rating Posted"))
    }
  }

  reviewClick(id){
    return function() {
      axios
        .post("http://localhost:8082/api/reviewApi/add",{orderId: id, rating: document.getElementById(id + "rating").value, review: document.getElementById(id + "review").value})
        .then(res => console.log("Review Posted"))
    }
  }
}


export default OrderDetails