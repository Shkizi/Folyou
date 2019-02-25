import React from 'react'
import { Modal, Button, Row, Form, Col, Image  } from 'react-bootstrap';
import './Login.css'
import logo from '../../../../Resources/Images/Logo_black_white.png'
import Register from '../Register/Register'

class Login extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleRegisterPopUpClose = this.handleRegisterPopUpClose.bind(this);
    this.handleRegisterPopUpShow = this.handleRegisterPopUpShow.bind(this);

    this.state = {
      showRegister: false,
    };
  }
  
  handleRegisterPopUpClose() {
    this.setState({ showRegister: false });
  }

  handleRegisterPopUpShow() {
    this.setState({ showRegister: true });
    this.props.parent.setState({showLogin: false});
  }

  
    render() {
      return (
        <>
         <Modal size="lg"
         show={this.props.parent.state.showLogin} 
         onHide={this.props.closer} 
         centered={true}>
            <Modal.Header className="Login-Modal-Header" closeButton>
            </Modal.Header>
            <Modal.Body>
            <Image className="Login-Modal-Logo" src={logo}></Image>
              <Row className="Login-Modal-Row">
              <Col sm={6} style={{paddingLeft: 0}}><p className="Login-Text-SignIn mr-auto"><b>Sign in to continue</b></p></Col>
              <Col sm={6} style={{paddingRight: 0}}><p className="Login-Text-RegisterNow ml-auto">Not a member yet? 
                <Button onClick={()=>{
                  this.handleRegisterPopUpShow();
                } } variant="link" className="Login-Button-RegisterNow">Register Now</Button>
              </p></Col>
              </Row>
               <Form.Control  className="Login-Input-Email" placeholder="E-mail"/>
               <Form.Control  className="Login-Input-Password" placeholder="Password" type="password"/>

              <Row> <Button  className="Login-Button-Login">LOGIN NOW</Button></Row>
              <Row> <p className="Login-Password-Recovery">Forgot your password</p></Row>
            </Modal.Body>
            
            </Modal>
            <Register parent={this} closer={this.handleRegisterPopUpClose}></Register>
            </>
      );
    }
  }
  
export default Login