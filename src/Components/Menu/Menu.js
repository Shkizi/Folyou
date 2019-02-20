import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Form, FormControl, Button, Nav } from 'react-bootstrap';
import './Menu.css'
import { IoMdMenu } from "react-icons/io";
import { FiSearch } from "react-icons/fi";



// The Header creates links that can be used to navigate
// between routes.
const Menu = () => (
    <Navbar className="Menu-Navbar" sticky='top'>
    <Navbar.Brand href="#"><Link to='/' className="Menu-Navbar-Brand"><IoMdMenu style={{fontSize: "25px"}}/> Menu</Link></Navbar.Brand>  
    <FiSearch/>
    <div style={{marginLeft: "41%"}}>
    <h4>Logotipo</h4>
    </div>
    <Nav className="ml-auto">
    <Link to='/'  className="Menu-Login">
    <strong>Login</strong></Link>
    </Nav>
    </Navbar>
  )
  
  export default Menu
  