import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';
import './Menu.css'
import { IoMdMenu } from "react-icons/io";

// The Header creates links that can be used to navigate
// between routes.
const Menu = () => (
    <Navbar className="Menu-Navbar" sticky='top'>
    <Navbar.Brand href="#" className="Menu-Navbar-Brand"><Link to='/'><IoMdMenu/> Menu</Link></Navbar.Brand>
    <Form inline>
    <Button variant="outline-info">Search</Button>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
    </Form>
    <h6>Login</h6>
    </Navbar>
  )
  
  export default Menu
  