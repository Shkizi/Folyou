import React from 'react'
import { Modal, Button, Row, Form, Checkbox  } from 'react-bootstrap';
import './Login.css'

class Login extends React.Component {
  
    render() {
      return (
         <Modal size="lg"
         show={this.props.parent.state.showLogin} 
         onHide={this.props.closer} 
         centered={true}>
            <Modal.Body>
              <Row>
              <p className="Login-Text-SignIn mr-auto"><b>Sign in to continue</b></p>
              <p className="Login-Text-RegisterNow ml-auto">Not a member yet? <b style={{color: "#49c5b6"}}>Register Now</b></p>
              </Row>
              
               <Form.Control  className="Login-Input-Email col-centered" placeholder="E-mail"/>
               <Form.Control  className="Login-Input-Password" placeholder="Password"/>

            </Modal.Body>
            <Modal.Footer style={{borderTop: 0}}>
            <Button className="Login-Button-Login">LOGIN NOW</Button>
            <Row>
            <p className="Login-Password-Recovery">Forgot your passowrd?</p>
            </Row>
            </Modal.Footer>
          </Modal>
      );
    }
  }
  
export default Login