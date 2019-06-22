import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap';
import { Navbar, Form, Button, Row, Col } from 'react-bootstrap';
import './Menu.css'
import { IoMdMenu } from "react-icons/io";
import {MdNotificationsActive} from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { FaSignOutAlt } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import Logo from '../../Resources/Images/logo.png'

import Login from '../Elements/Popups/Login/Login'
import { Translate } from "react-localize-redux";
import { withLocalize } from "react-localize-redux";
import { withCookies } from 'react-cookie';
import Badge from '@material-ui/core/Badge';
import Tabs from './Tabs';
import isCookieValid from '../../cookies';
import ServicesAPI from "../../serviceAPI";
var S = new ServicesAPI();
var classNames = require('classnames');

class Menu extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleLoginPopUpClose = this.handleLoginPopUpClose.bind(this);
    this.handleLoginPopUpShow = this.handleLoginPopUpShow.bind(this);

    this.handleShowTabs = this.handleShowTabs.bind(this);
    this.handleCloseTabs = this.handleCloseTabs.bind(this);

    this.handleLogOff = this.handleLogOff.bind(this);

    
    this.state = {
      showLogin: false,
      showTabs: false,
      showSearchButton: true,
      number:1
    };
  }
  componentDidMount(){
    let data={idUser:this.props.app.state.userLogged.idUser|null}
    S.getter(`getNumberUnviewedMessages`, data, (res) => {  
       
      if(res.data.number>0){this.props.app.state.notificationModule.notify("You have unread Messages","br",2,2);}
      this.setState({number:res.data.number});
    },
    (error) => { 
      console.log("Error: User", error);
      this.setState({ error: {message:error,error:true} });
    });
    let th = this;
    setInterval(
      function() {
          let data={idUser:th.props.app.state.userLogged.idUser|null}
        S.getter(`getNumberUnviewedMessages`, data, (res) => {  
          
          if(res.data.number>th.state.number){th.props.app.state.notificationModule.notify("You have new unread Messages","br",2,2);}
          th.setState({number:res.data.number});
        },
        (error) => { 
          console.log("Error: User", error);
          th.setState({ error: {message:error,error:true} });
        });
    }, 60 * 1000/2);
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

  componentDidUpdate(){
    if(!this.state.showSearchButton){
      this.focusIn("searchable");
    }
  }
focusIn(elem)
{
  let node = ReactDOM.findDOMNode(this.refs[elem]);
  if(node && node.focus instanceof Function){
    node.focus();
  }

}


  render() {
    
    const {cookies}= this.props.cookies;
        
    return (  
    <>
      <Navbar className="Menu-Navbar" sticky='top'>

      <Row style={{width:"100%"}}>

        {/* Menu button */}
        <Col xs={8} sm={8} md={10} lg={10} xl={10}>
        <Row>
          
            <Navbar.Brand>
              <Button  className="Menu-Navbar-Open-Button" onClick={this.handleShowTabs} variant="link"><IoMdMenu style={{fontSize: "25px", paddingBottom: 2}}/></Button> 
            </Navbar.Brand>
             <Link to='/NotificationsHub' className="Menu-Navbar-Brand" >
              <Badge style={{fontSize: "25px", paddingBottom: 2}} badgeContent={this.state.number} color="primary">
               <MdNotificationsActive style={{fontSize: "25px", paddingBottom: 2}}/>
             <span className="sr-only"><Translate id ="unreadMessages"/></span>
              </Badge>
            </Link> 
            <div className="Menu-Logo">
            <Link to='/'>
            <Image src={Logo} className="Menu-Navbar-Logo-Size"></Image>
            </Link>
            </div>
        </Row>
        </Col>



        {/* Login/Logout Col*/}
        <Col  xs={4} sm={4} md={2} lg={2} xl={2} style={{paddingRight: 0, position: "relative"}} >
         
        {(this.props.app.state.userLogged.set)?this.renderLogged():this.renderSign()}
            


            {/* <Button onClick={this.handleLoginPopUpShow} className="Menu-Login" variant="link">
              <strong><Translate id="login"/></strong>
            </Button> */}
        </Col>
        </Row>
      </Navbar>
      <Tabs parent={this} app={this.props.app} closer={this.handleCloseTabs} cookies={this.props.cookies}/>
      {/* Login Modal Render*/}
      <Login parent={this} closer={this.handleLoginPopUpClose} app={this.props.app}/>
    </>
    );} 
     renderLogged(){
      return (<>
      <Row style={{float: "right", paddingRight: "15px"}}>
        <a href={'/Profile/'+this.props.app.state.userLogged.idUser}>
      <Image src={S.baseURL()+"public/anexes/profiles/"+ ((this.props.app.state.userLogged.anexes.fileName!="")?this.props.app.state.userLogged.anexes.fileName:"default_user_pic.jpg")} className="Logged-Home-Avatar" roundedCircle />
    </a>
    <Button onClick={this.handleLogOff} className="Menu-Login" variant="link">
     <strong><Translate className="Menu-Logout-Text hidden-xs hidden-sm" id="logout"></Translate> <FaSignOutAlt/></strong>
    </Button>
    </Row>
    </>
      );
    }
     renderSign(){
      return (
      <Button onClick={this.handleLoginPopUpShow} className="Menu-Login" variant="link">
      <strong><Translate className="Menu-Login-Text hidden-xs hidden-sm"  id="login"/> <FaSignInAlt/></strong>
      </Button>);
      }
    handleLogOff(){
      this.props.app.setState({userLogged:{set:false}});
      this.props.app.state.notificationModule.notify("LOGOUT SUCCESS","br",3,2);
      const {cookies} = this.props;
      cookies.set('folyou_session', "", { path: '/' });
    }
  }
  export default withCookies(withLocalize(Menu));
  