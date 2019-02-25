import React from 'react'
import { Modal, Button, Row, Form, Col, Image  } from 'react-bootstrap';
import './Register.css'
import logo from '../../../../Resources/Images/Logo_black_white.png'

class Register extends React.Component {
  
    render() {
      return (
         <Modal size="lg"
         show={this.props.parent.state.showRegister} 
         onHide={this.props.closer} 
         centered={true}>
            <Modal.Header className="Register-Modal-Header" closeButton>
            </Modal.Header>

            <Modal.Body style={{paddingBottom: "50px"}}>
            <Image className="Register-Modal-Logo" src={logo}></Image>

              <Row className="Login-Modal-Row">
              <Col sm={6} style={{paddingLeft: 0}}><p className="Register-Text-Register mr-auto"><b>Register with your E-mail</b></p></Col>
              <Col sm={6} style={{paddingRight: 0}}><p className="Register-Text-Member ml-auto">Are you a member? 
              <Button className="Register-Button-LoginNow" variant="link" onClick={ () => {this.props.closer();  this.props.parent.props.parent.handleLoginPopUpShow()}}>Login Now
              </Button></p></Col>
              </Row>
               <Form.Control  className="Register-Input-Email" placeholder="E-mail"/>
               <Form.Control  className="Register-Input-Password" placeholder="Password" type="password"/>
               <Form.Control  className="Register-Input-Password-Repeat" placeholder="Repeat Password" type="password"/>

              <Row> <Button  className="Register-Button-Create">CREATE YOUR ACCOUNT</Button></Row>
            </Modal.Body>
            </Modal>
      );
    }
  }
  
export default Register