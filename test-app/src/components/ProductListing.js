import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import {Card, Alert, Row, Col, Grid,FormLabel, Form, FormGroup, Button, FormControl, Container} from "react-bootstrap";


class ProductListing extends Component {
  constructor() {
    super();
    this.state = {
        flag: false,
        cards : [],
        productInfo : []
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

    axios
        .post('http://localhost:8082/api/productApi/listbyseller',{sellerId: localStorage.userId})
        .then(res => {

          this.setState({
             productInfo : res.data
          })

        })
        .catch(err => {
          console.log("Error in Fetching Products");
        })

    //this.onSubmit = this.onSubmit.bind(this);
    //this.onChange = this.onChange.bind(this);
  }

  returnPage(cond) {
    if(cond){
        return (
            this.returnCards()
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


  returnCards() {
    let cards = []
   // console.log(this.productInfo)
     for (const product of this.state.productInfo){
         if(product.status == "Placed")
         cards.push(
             <div className="col-sm-4" style={{ display: 'inline-block' }} key={product.name}>
       <Card bg="primary" text="white" style={{ width: '20rem', margin: '2rem' }}>
         <Card.Body>
           <Card.Title>{product.name}</Card.Title>
           <Card.Text>
             Currently {product.currentQuant} items are bought.<br/>
             Total {product.reqQuant} req for dispatch. <br/>
           </Card.Text>
             <br/>

             <Button className="btn-space" onClick={this.clickFunc(product._id,"Dispatched")}  variant="info">Dispatch</Button>
             
             <Button className="btn-space" onClick={this.clickFunc(product._id,"Cancelled")}  variant="info">Cancel</Button>


         </Card.Body>
       </Card>
     </div>
         )
     }

     return cards
 }

 clickFunc = (id,cancelOrPurchase) => {
    return function() {

      //Updating the product info:

      //fetching product data object:
      axios
      .get('http://localhost:8082/api/productApi/details/' + id)
      .then(res => {
          let productData = res.data
          console.log("Data we got:")
          console.log(productData)
          // Changing Data:
          productData.status = cancelOrPurchase;
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


  render() {
    if(this.state.flag){
        return this.returnPage(true)
    }
    else {
        return this.returnPage(false)
    }
  }
}

export default ProductListing;