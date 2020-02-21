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
  

    returnCards() {

       let cards = []
      // console.log(this.productInfo)
        for (const order of this.state.orderInfo){
            cards.push(
                <div className="col-sm-4" style={{ display: 'inline-block' }} key={order.productId.name}>
          <Card bg="warning" text="black" style={{ width: '15rem', margin: '1rem' }}>
            <Card.Body>
              <Card.Title>{order.productId.name}</Card.Title>
              <Card.Text>
                Order Quantity : {order.quantity} <br/>
                Remaining in Bundle : {order.productId.reqQuant - order.productId.currentQuant} <br/>
                Order Status : <Button variant="outline-danger" disabled> {order.productId.status} </Button>
              </Card.Text>
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
}


export default OrderDetails