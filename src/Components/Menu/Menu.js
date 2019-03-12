import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Button, Image, Row, Col } from 'react-bootstrap';
import './Menu.css'
import { IoMdMenu } from "react-icons/io";
import {MdNotificationsActive} from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import Login from '../Elements/Popups/Login/Login'
import logo from '../../Resources/Images/Logo_black_white.png'
import { Translate } from "react-localize-redux";
import LanguageSelector from "../Elements/LanguageSelector/LanguageSelector";
import { withLocalize } from "react-localize-redux";
import { withCookies } from 'react-cookie';
import Badge from '@material-ui/core/Badge';
import Tabs from './Tabs';
import isCookieValid from '../../cookies';
 

class Menu extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleLoginPopUpClose = this.handleLoginPopUpClose.bind(this);
    this.handleLoginPopUpShow = this.handleLoginPopUpShow.bind(this);

    this.handleShowTabs = this.handleShowTabs.bind(this);
    this.handleCloseTabs = this.handleCloseTabs.bind(this);

    this.state = {
      showLogin: false,
      showTabs: false
    };
  }
  
  handleLoginPopUpClose() {
    this.setState({ showLogin: false });
  }

  handleLoginPopUpShow() {
    this.setState({ showLogin: true });
  }

  handleShowTabs() {
    this.setState({ showTabs: true});
  }

  handleCloseTabs() {
    this.setState({ showTabs: false});
  }

  
  render() {
    var notif=this.props.app.notificationModule;
    const {cookies}= this.props.cookies;
        
    return (  
    <>
      <Navbar className="Menu-Navbar" sticky='top'>
      <Row style={{width:"100%"}}>
        <Col xs={1} sm={1} md={2} lg={2} xl={1} >
        <Navbar.Brand>
           <Button onClick={this.handleShowTabs} variant="link"><IoMdMenu style={{fontSize: "25px", paddingBottom: 2}}/></Button> 
        </Navbar.Brand>
        </Col>
        <Col xs={1} sm={1} md={2} lg={2} xl={1} >
        
        <Link to='/NotificationsHub' className="Menu-Navbar-Brand" >
          <Badge className={{margin: 2}} badgeContent={4} color="primary">
        <MdNotificationsActive style={{width:"25px",height:"25px"}}/>
        <span className="sr-only"><Translate id ="unreadMessages"/></span>
        </Badge>
        </Link> 
        </Col>
        
        <Col  xs={1} sm={1} md={1} lg={2} xl={2} >
        <FiSearch style={{fontSize: "25px",  paddingTop:10}}/>
        </Col>
        {/* Logo image Col */}
        <Col  xs={2} sm={2} md={2} lg={4} xl={4} >
          <Image className="Menu-Logo" src={logo}></Image>
        </Col>
        {/* Empty Col*/}
        <Col  xs={1} sm={1} md={1} lg={1} xl={1}></Col>
        
        {/* Login/Logout Col*/}
        <Col  xs={5} sm={5} md={5} lg={5} xl={3} >
          <Nav style={{float:"right"}}>    
            <Button onClick={this.handleLoginPopUpShow} className="Menu-Login" variant="link">
              <strong><Translate id="login"/></strong>
            </Button>
          </Nav>
        </Col>
        </Row>
      </Navbar>
      <Tabs parent={this} app={this.props.app} closer={this.handleCloseTabs} cookies={this.props.cookies}/>
      {/* Login Modal Render*/}
      <Login parent={this} closer={this.handleLoginPopUpClose} app={this.props.app}/>
    </>
    );} }
  
  export default withCookies(withLocalize(Menu));
  