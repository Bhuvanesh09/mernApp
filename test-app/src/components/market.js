import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { Row, Col, Grid, Card, Container, Button, Form, FormLabel, FormGroup, FormControl} from "react-bootstrap";

class Market extends Component{
    constructor() {
        super();
        this.state = {
          cards : [],
          productInfo : [],
          searchstr : ""
        };
        axios
        .get('http://localhost:8082/api/productApi/list')
        .then(res => {

          this.setState({
             productInfo : res.data
          })

        })
        .catch(err => {
          console.log("Error in Fetching Products");
        })
    }

    handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };
  
    retVendRev(id) {
      return "/reviews/" + id
    }
    returnCards() {
       let cards = []
      // console.log(this.productInfo)
      console.log("Search String:")
      console.log(this.state.searchstr)
        for (const product of this.state.productInfo){
            if(product.status == "Waiting" && (this.state.searchstr == "" || this.state.searchstr == product.name))
            cards.push(
                <div className="col-sm-4" style={{ display: 'inline-block' }} key={product.name}>
          <Card bg="primary" text="white" style={{ width: '20rem', margin: '2rem' }}>
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>
                Price :  Rs. {product.price} per item. <br/>
                Currently {product.currentQuant} items are bought.<br/>
                Total {product.reqQuant} req for dispatch. <br/>
                <b>Remaining : {product.reqQuant - product.currentQuant}</b>
                <br/>
                Sold By : <a style={{color: "white"}} href={this.retVendRev(product.sellerId._id)}><b>{product.sellerId.name}</b> </a>
              
              
              </Card.Text>
                <br/>
                <Form onSubmit={this.clickFunc(product._id)}>
                <FormGroup controlId={product._id}>
                <FormControl placeholder="Enter Quantity" type="number" name="amt" onChange={this.handleChange}/>
                </FormGroup>
                <Button  onClick={this.clickFunc(product._id)} variant="info">Purchase Now</Button>
                </Form>

            </Card.Body>
          </Card>
        </div>
            )
        }

        return cards
    }

  render() {
    return (<Container>
      <br/>
      <FormGroup controlId="searchstr" variant="large">
              <FormControl
                autoFocus
                type="text"
                placeholder="Search Box"
                onChange={e => this.setState({ searchstr: e.target.value })}
              />
            </FormGroup>
      <Container>
          {this.returnCards()}
      </Container>
      </Container>
    );
  }


  buyProduct(id){
    //let amount = document.getElementById(id).value;
    let amount = this.state.amt
    let data = {
      productId : id,
      quantity : amount,
      userId : localStorage.userId
    }
    console.log("Order:")
    console.log(data)
  }

  clickFunc = id => {
    return function() {
      let amount = document.getElementById(id).value
      let data = {
        productId : id,
        quantity : amount,
        userId : localStorage.userId
      }
      // Sending the Order Request:
      axios
      .post('http://localhost:8082/api/orderApi/add', data)
      .then(res => {
          console.log(res)
      })
      .catch(err => {
        console.log(err)
        console.log("Error in Ordering!");
      })
      console.log("Order:")
      console.log(data)

      let productData = null;

      //Updating the product info:

      //fetching product data object:
      axios
      .get('http://localhost:8082/api/productApi/details/' + id)
      .then(res => {
          productData = res.data
          console.log("Data we got:")
          console.log(productData)
          // Changing Data:
          productData.currentQuant = parseInt(amount) + parseInt(productData.currentQuant);
          if(productData.currentQuant >= productData.reqQuant){
            productData.status = "Placed"
          }
          else{
            productData.status = "Waiting"
          }
          updateDatabase(productData)
      })
      .catch(err => {
        console.log(err)
        console.log("Didn't get get");
      })

      //Pushing back to the database:
      function updateDatabase(productData){
        axios
        .post('http://localhost:8082/api/productApi/update', productData)
        .then(res => {
            console.log(res)
            window.location.reload()
        })
        .catch(err => {
          console.log(err)
          console.log("Error in Ordering!");
        })
      }

    }
  }
}


export default Market