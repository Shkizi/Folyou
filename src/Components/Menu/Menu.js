import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Form, Button, s, Row, Col } from 'react-bootstrap';
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

    this.handleShowSearchButton = this.handleShowSearchButton.bind(this);
    this.handleCloseSearchButton = this.handleCloseSearchButton.bind(this);


    this.state = {
      showLogin: false,
      showTabs: false,
      showSearchButton: true
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

  handleShowSearchButton() {
    this.setState({ showSearchButton: true});
  }

  handleCloseSearchButton() {
    this.setState({ showSearchButton: false});

  }

  searchButton = () => {return(
            <Button               
               variant="link"
               color="primary"
               className="Menu-Search-Button"
               onClick={this.handleCloseSearchButton}>
              <FiSearch className="Menu-Search-Button-Icon"/>
            </Button>  
    )}

searchLine = () => {return (
  <Form.Group as={Row} controlId="formPlaintextPassword">
    <Col sm="10">
      <Form.Control type="text" placeholder="Search..." />
    </Col>
  </Form.Group>
)}

  
  render() {
    
    const {cookies}= this.props.cookies;
        
    return (  
    <>
      <Navbar className="Menu-Navbar" sticky='top'>

      <Row style={{width:"100%"}}>

        {/* Menu button */}
        <Col xs={11} sm={11} md={11} lg={11} xl={11}>
        <Row>
            <Navbar.Brand>
              <Button  className="Menu-Navbar-Open-Button" onClick={this.handleShowTabs} variant="link"><IoMdMenu style={{fontSize: "25px", paddingBottom: 2}}/></Button> 
            </Navbar.Brand>
             <Link to='/NotificationsHub' className="Menu-Navbar-Brand" >
              <Badge style={{fontSize: "25px", paddingBottom: 2}} badgeContent={4} color="primary">
               <MdNotificationsActive style={{fontSize: "25px", paddingBottom: 2}}/>
             <span className="sr-only"><Translate id ="unreadMessages"/></span>
              </Badge>
            </Link> 

            {(this.state.showSearchButton) ? this.searchButton():this.searchLine()}
        </Row>
        </Col>



        {/* Login/Logout Col*/}
        <Col  xs={1} sm={1} md={1} lg={1} xl={1} style={{paddingRight: 0}} >
            <Button onClick={this.handleLoginPopUpShow} className="Menu-Login" variant="link">
              <strong><Translate id="login"/></strong>
            </Button>
        </Col>
        </Row>
      </Navbar>
      <Tabs parent={this} app={this.props.app} closer={this.handleCloseTabs} cookies={this.props.cookies}/>
      {/* Login Modal Render*/}
      <Login parent={this} closer={this.handleLoginPopUpClose} app={this.props.app}/>
    </>
    );} }
  
  export default withCookies(withLocalize(Menu));
  