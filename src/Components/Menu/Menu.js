import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Button, Image } from 'react-bootstrap';
import './Menu.css'
import { IoMdMenu } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import Login from '../Elements/Popups/Login/Login'
import logo from '../../Resources/Images/Logo_black_white.png'
import { Translate } from "react-localize-redux";
import LanguageSelector from "../Elements/LanguageSelector/LanguageSelector";
import { withLocalize } from "react-localize-redux";
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
    <Navbar.Brand href="#"><Link to='/' className="Menu-Navbar-Brand"><IoMdMenu style={{fontSize: "25px", paddingBottom: 2}}/></Link></Navbar.Brand>
    <LanguageSelector languages={this.props.app.props.languages} app={this.props.app} />
    <FiSearch/>
    <div style={{marginLeft: "41%"}}>
    <Image className="Menu-Logo" src={logo}></Image>
    </div>
    <Nav className="ml-auto">
    <Button onClick={this.handleLoginPopUpShow} className="Menu-Login" variant="link">
    <strong><Translate id="login"/></strong></Button>
    </Nav>
    </Navbar>
    <Login  parent={this} closer={this.handleLoginPopUpClose}/>
    </div>

    );} }
  
  export default withLocalize(Menu);
  