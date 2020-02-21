<div className="AddUser">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Lol
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">User Registration</h1>
              <p className="lead text-center">
                  Register Your User Here
              </p>

              <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Username'
                    name='username'
                    className='form-control'
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                </div>
                <br />
                <div>
                  <input
                    type='text'
                    placeholder='Email'
                    name='email'
                    className='form-control'
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>

                <div>
                  <label className='radio-inline radio-light'>
                  <input
                    type='radio'
                    name='type'
                    value='buyer'
                    onClick={this.onChange}
                  />Normal User
                  </label>
                </div>
                <div>
                  <label className='radio-inline radio-light'>
                  <input
                    type='radio'
                    name='type'
                    value='seller'
                    onClick={this.onChange}
                  />Seller
                  </label>
                </div>

                <input
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-2"
                />
              </form>
          </div>
          </div>
        </div>
      </div>





renderLogin(){
  if(localStorage.loggedIn){
    return(
      <Nav className="justify-content-end">
      <Nav.Item>
        <Nav.Link href="/logout">Logout</Nav.Link>
      </Nav.Item>
      </Nav>
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



{/*
      <Container>
      <Row>
      <Nav variant="pills" className="justify-content-end" >
      <Nav.Item>
        <Nav.Link onClick={LogoutFunc()}>Logout</Nav.Link>
      </Nav.Item>
      </Nav>
      </Row>

      <Row>
    <Nav fill className="justify-content-left">
      <Nav.Link href="/market">Market</Nav.Link>
      <Nav.Link href="#features">My P</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
      </Row>
    </Container>*/}