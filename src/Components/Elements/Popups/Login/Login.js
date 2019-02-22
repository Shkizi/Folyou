import React from 'react'
import { Modal, Button, Row, Form, Col  } from 'react-bootstrap';
import './Login.css'

class Login extends React.Component {
  
    render() {
      return (
         <Modal size="lg"
         show={this.props.parent.state.showLogin} 
         onHide={this.props.closer} 
         centered={true}>
            <Modal.Header closeButton>
          <Modal.Title className="Login-Modal-Header">
            Folyou Logo
          </Modal.Title>
        </Modal.Header>
            <Modal.Body>
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