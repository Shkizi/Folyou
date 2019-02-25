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
              <Row className="Register-Modal-Row">
              <Col sm={6} style={{paddingLeft: 0}}><b className="Register-Text-Register mr-auto">Register with your E-mail</b></Col>
              <Col sm={4} style={{paddingRight: 0}}><p className="Register-Text-Member ml-auto">Are you a member?
              </p></Col>
              <Col sm={2} style={{paddingRight: 0, paddingLeft: 0}}>
              <Button className="Register-Button-LoginNow" variant="link" onClick={ () => {this.props.closer();  this.props.parent.props.parent.handleLoginPopUpShow()}}>Login Now
              </Button>
              </Col>
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