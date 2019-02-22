import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { Navbar, Modal, Nav, Button } from 'react-bootstrap';
import './Menu.css'
import { IoMdMenu } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import Login from '../Elements/Popups/Login/Login'



// The Header creates links that can be used to navigate
// between routes.
class Menu extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleLoginPopUpClose = this.handleLoginPopUpClose.bind(this);
    this.handleLoginPopUpShow = this.handleLoginPopUpShow.bind(this);

    this.state = {
      showLogin: false,
    };
  }
  
  handleLoginPopUpClose() {
    this.setState({ showLogin: false });
  }

  handleLoginPopUpShow() {
    this.setState({ showLogin: true });
  }

  
  render() {
    return (  <div>
    <Navbar className="Menu-Navbar" sticky='top'>
    <Navbar.Brand href="#"><Link to='/' className="Menu-Navbar-Brand"><IoMdMenu style={{fontSize: "25px", paddingBottom: 2}}/> Menu</Link></Navbar.Brand>  
    <FiSearch/>
    <div style={{marginLeft: "41%"}}>
    <h4>Logotipo</h4>
    </div>
    <Nav className="ml-auto">
    <Button onClick={this.handleLoginPopUpShow} className="Menu-Login">
    <strong>Login</strong></Button>
    </Nav>
    </Navbar>
    <Login  parent={this} closer={this.handleLoginPopUpClose}/>
    </div>

    );} }
  
  export default Menu
  