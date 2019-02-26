import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Button, Image, Row, Col } from 'react-bootstrap';
import './Menu.css'
import { IoMdMenu } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import Login from '../Elements/Popups/Login/Login'
import logo from '../../Resources/Images/Logo_black_white.png'
import { Translate } from "react-localize-redux";
import LanguageSelector from "../Elements/LanguageSelector/LanguageSelector";
import { withLocalize } from "react-localize-redux";
import { withCookies } from 'react-cookie';

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
    return (  
    <>
      <Navbar className="Menu-Navbar" sticky='top'>
      <Row>
        <Col sm={2}>
        <Navbar.Brand href="#">
          <Link to='/' className="Menu-Navbar-Brand"><IoMdMenu style={{fontSize: "25px", paddingBottom: 2}}/></Link>
        </Navbar.Brand>
        </Col>
        <Col sm={2}>
        <FiSearch style={{fontSize: "25px",  paddingTop:10}}/>
        </Col>
        {/* Logo image Col */}
        <Col sm={4}>
          <Image className="Menu-Logo" src={logo}></Image>
        </Col>
        {/* Empty Col*/}
        <Col sm={1}></Col>
        {/* Language Col*/}
        <Col sm={2}>
        <Nav style={{float:"right"}}>   
          <LanguageSelector languages={this.props.app.props.languages} app={this.props.app} cookies={this.props.cookies}/>
          </Nav>
        </Col>
        {/* Login/Logout Col*/}
        <Col sm={1}>
          <Nav style={{float:"right"}}>    
            <Button onClick={this.handleLoginPopUpShow} className="Menu-Login" variant="link">
              <strong><Translate id="login"/></strong>
            </Button>
          </Nav>
        </Col>
        </Row>
      </Navbar>
      {/* Login Modal Render*/}
      <Login parent={this} closer={this.handleLoginPopUpClose} app={this.props.app}/>
    </>
    );} }
  
  export default withCookies(withLocalize(Menu));
  