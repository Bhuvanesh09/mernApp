import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { Row, Col, Grid, Card, Container, Button, Form, FormLabel, FormGroup, FormControl} from "react-bootstrap";

class VendorReview extends Component{
    constructor() {
        super();
        this.state = {
          cards : [],
          reviewInfo : []
        };
        axios
        .get('http://localhost:8082/api/reviewApi/details')
        .then(res => {
            console.log(res)
          this.setState({
             reviewInfo : res.data
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
        console.log(this.props.match.params.id)
       let cards = []
      // console.log(this.productInfo)
        for (const review of this.state.reviewInfo){
            if(review.orderId.productId.sellerId == this.props.match.params.id)
            cards.push(
                <div className="col-sm-4" style={{ display: 'inline-block' }}>
          <Card bg="warning" text="black" style={{ width: '20rem', margin: '1rem' }}>
            <Card.Body>
              <Card.Title>{review.orderId.productId.name}</Card.Title>
              <Card.Text>
                <b>Rating: {review.rating} </b>
                <br/>
                <b>Review:</b>
                <br/>
                {review.review}
                <br/>
                Order Quantity : {review.orderId.quantity} <br/>
                USER: {review.orderId.userId}
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


export default VendorReview