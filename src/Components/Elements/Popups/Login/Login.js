import React from 'react'
import { Modal, Button, Row, Form, Col, Image  } from 'react-bootstrap';
import './Login.css'
import logo from '../../../../Resources/Images/Logo_black_white.png'

class Login extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleLoginPopUpClose = this.handleLoginPopUpClose.bind(this);
    this.handleLoginPopUpShow = this.handleLoginPopUpShow.bind(this);

    this.state = {
      showLogin: false,
    };
  }
  
  handleRegisterPopUpClose() {
    this.setState({ showRegister: false });
  }

  handleRegisterPopUpShow() {
    this.setState({ showRegister: true });
  }

  
    render() {
      return (
         <Modal size="lg"
         show={this.props.parent.state.showLogin} 
         onHide={this.props.closer} 
         centered={true}>
            <Modal.Header className="Login-Modal-Header" closeButton>
            </Modal.Header>
            <Modal.Body>
            <Image className="Login-Modal-Logo" src={logo}></Image>
              <Row>
              <Col sm={6}><p className="Login-Text-SignIn mr-auto"><b>Sign in to continue</b></p></Col>
              <Col sm={6}><p className="Login-Text-RegisterNow ml-auto">Not a member yet? <b style={{color: "#49c5b6"}}>Register Now</b></p></Col>
              </Row>
               <Form.Control  className="Login-Input-Email" placeholder="E-mail"/>
               <Form.Control  className="Login-Input-Password" placeholder="Password"/>

              <Row> <Button  className="Login-Button-Login">LOGIN NOW</Button></Row>
              <Row> <p className="Login-Password-Recovery">Forgot your password</p></Row>
            </Modal.Body>
            </Modal>
      );
    }
  }
  
export default Login