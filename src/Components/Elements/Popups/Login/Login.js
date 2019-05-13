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
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleRegisterPopUpClose() {
    this.setState({ showRegister: false });
  }

  handleRegisterPopUpShow() {
    this.setState({ showRegister: true });
    this.props.parent.setState({showLogin: false});
  }
  
  handleSubmit(event) {
    event.preventDefault();
    console.log("sanifowrnirngoirneob");
    const data = new FormData(event.target);
    console.log(data);
   
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
               <Row className="Login-Modal-Row">
              <Col sm={6} style={{paddingLeft: 0}}><b className="Login-Text-SignIn mr-auto">Sign in to continue</b></Col>
              <Col sm={4} style={{paddingRight: 0}}><p className="Login-Text-RegisterNow ml-auto">Not a member yet? 
               </p> </Col>
                <Col sm={2} style={{paddingRight: 0, paddingLeft: 0}}>
                <Button onClick={()=>{
                  this.handleRegisterPopUpShow();
                } } variant="link" className="Login-Button-RegisterNow">Register Now
                </Button>
              </Col>
              </Row>
              <form onSubmit={this.handleSubmit}>
               <Form.Control  className="Login-Input-Email" placeholder="E-mail" name={"email"} id={"email"}/>
               <Form.Control  className="Login-Input-Password" placeholder="Password" type="password" name={"password"} id={"password"}/>
                
              <Row> <button  className="Login-Button-Login">LOGIN NOW</button></Row>
              </form>
              <Row> <p className="Login-Password-Recovery">Forgot your password</p></Row>
            </Modal.Body>
            
            </Modal>
            <Register parent={this} closer={this.handleRegisterPopUpClose} app={this.props.app}></Register>
            </>
      );
    }
  }
  
export default Login