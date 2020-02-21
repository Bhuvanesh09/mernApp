import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddUser from './components/AddUser'
import LoginUser from './components/LoginUser'
import Market from './components/market'
import Logout from './components/LogoutUser'
import ProductAdd from './components/ProductAdd'
import OrderDetails from './components/OrderDetails'
import {Nav, Navbar, NavDropdown, Container, Row} from "react-bootstrap"
import ProductListing from './components/ProductListing';
import ProductListingAll from './components/ProductListingAll'
import ProductDispatched from './components/ProductDispatched';
import VendorReview from './components/VendorReviews'

function LogoutFunc(){
  return function() {
  localStorage.setItem('loggedIn', false)
  window.location.href = '/login';
  }
}

function retSelfRev(){
  return "/reviews/" + localStorage.userId
}

function renderLogin(){
  if(JSON.parse(localStorage.loggedIn)){
    return(
      

  <Navbar sticky="top" bg="warning" variant="light">
  <Navbar.Brand href="/market">Hello, {localStorage.name}</Navbar.Brand>
  <Navbar.Toggle />
  <Nav className="mr-auto">
      <Nav.Link href="/market">Market</Nav.Link>
      <Nav.Link href="/orders">My Orders</Nav.Link>
      <NavDropdown title="Products" id="collasible-nav-dropdown">
        <NavDropdown.Item href="/product/add">Add Product</NavDropdown.Item>
        <NavDropdown.Item href="/product/listing">Products Placed</NavDropdown.Item>
        <NavDropdown.Item href="/product/listDispatched">Products Dispatched</NavDropdown.Item>
        <NavDropdown.Item href={retSelfRev()} >My Reviews</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/product/listAll">All My Products</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  <Navbar.Collapse className="justify-content-end" text="white">
      <Nav.Item variant="primary">
        <Nav.Link onClick={LogoutFunc()}>Logout</Nav.Link>
      </Nav.Item>
  </Navbar.Collapse>
</Navbar>
    )
  }
  else {
    return(
      <Nav className="justify-content-end">
      <Nav.Item>
        <Nav.Link href="/login">Login</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/register">Register</Nav.Link>
      </Nav.Item>
      </Nav>
    )

  }
}
class App extends Component {
  render() {
    return (
      
      <Router>
        {renderLogin()}

      
        
          {/*<Route exact path='/' component={ShowUsers} />
          <Route path='/login' component={LoginUser} />*/}
          <Route path='/register' component={AddUser} />
          <Route path='/login' component={LoginUser} />
          <Route path='/market' component={Market} />
          <Route path='/logout' component={Logout} />
          <Route path='/product/add' component={ProductAdd} />
          <Route path='/orders' component={OrderDetails} />
          <Route path='/product/listing' component={ProductListing} />
          <Route path='/product/listAll' component={ProductListingAll} />
          <Route path='/product/listDispatched' component={ProductDispatched} />
          <Route path='/reviews/:id' component={VendorReview}/>


      </Router>
    );
  }
}

export default App;