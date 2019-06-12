import React from 'react'
import { Link } from "react-router-dom";
import { Modal, Image, Card, Row, Col, Form, Button } from 'react-bootstrap';
import { Translate } from "react-localize-redux";

import './MessageModal.css';
import { FiMail } from "react-icons/fi";

import getImageLanguage from "../../../../../Resources/Translations/compilerLanguageImages.js"
import { isNull } from 'util';
import ServicesAPI from "../../../../../serviceAPI";
var S = new ServicesAPI();
class MessageModal extends React.Component {

  constructor(props, context) {
    super(props, context);
   
    this.state = {
      data: {},
      done:false,
      messageText: ""
    };

    this.handleMessageText = this.handleMessageText.bind(this);
  }
  
  handleMessageText(event) {
    this.setState({ messageText: event.target.value});
}
handleFormSubmission(event,uyser){
  const data = new FormData()
  let item = {text:this.state.messageText,maker:this.props.app.state.userLogged.idUser, recetor:uyser.idUser}
  for ( var key in item ) {
    data.append(key, item[key]);
 }
 S.postter("postMessage",data,(res)=>{
  this.setState({done: true});
  
  this.props.closer();
  this.props.app.state.notificationModule.notify("Message Sent","br",2,15);
},  (error) => { 
  console.log("Error: Message", error);
  this.props.app.state.notificationModule.notify("Message ERROR","br",3,15);
  this.setState({ error: {message:error,error:true} });
}); 

}

  render() {
    if( this.props.parent.state.showModalMessage){
      let data = {};
      console.log(this.props.parent.state.propTrending);
      console.log(this.props.parent.state.talents);
      console.log(this.props.parent.state.idModal);
      if (this.props.parent.state.propTrending.length > 0){
       this.props.parent.state.propTrending.forEach((valuePort,indexPort,arrayPort)=>{
          if (this.props.parent.state.propTrending[indexPort].idTalentArea == this.props.parent.state.idModal){
          data = this.props.parent.state.propTrending[indexPort];
            }
        });
      }
      if (this.props.parent.state.talents.length > 0){
        this.props.parent.state.talents.forEach((valuePort,indexPort,arrayPort)=>{
          if (this.props.parent.state.talents[indexPort].idTalentArea == this.props.parent.state.idModal){
          data = this.props.parent.state.talents[indexPort];
         
            }
        });
      }
      if(this.props.parent.state.UserMessage ==true){
        data=this.props.parent.state.user;
        data.avatarUser=data.anexes.fileName;
      }
      console.log(data);
        return (   
          <Modal
            show={this.props.parent.state.showModalMessage} 
            onHide={this.props.closer} 
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >              
            <Modal.Header closeButton>
            <div>
              <Row style={{padding: "16px"}}>
              <Link style={{textDecoration: "none"}} variant="link" to={"/Profile/"+data.idUser}>
                <Row style={{paddingLeft: "16px", paddingTop: "16px"}}>
                  <Image src={(data.avatarUser=="")?"https://www.w3schools.com/howto/img_avatar.png":S.baseURL()+"public/anexes/profiles/"+data.avatarUser} className="Modal-Portfolio-Avatar" roundedCircle />
                  <div className="Modal-Portfolio-Username">{data.nameUser}</div>
                </Row>
              </Link>
              </Row>
              </div>
            </Modal.Header>
            <Modal.Body style={{padding: 0}}>
            <Card style={{padding: "16px"}}>
                <div className="Modal-Message-Sendme-Text"><Translate id="send me a message"></Translate></div>
                <Form>
                    <Form.Group>
                    <Form.Control as="textarea" rows="10" maxLength="2000" value={this.state.handleMessageText} onChange={(event) => {this.handleMessageText(event)}}/>
                    </Form.Group>
                </Form>
            </Card>
            <Modal.Footer>
              <Row>
                <Col>
                   <Button className={"Modal-Message-Button-Message"} onClick={(event)=>{this.handleFormSubmission(event,data)}}><FiMail/> <Translate id="send"></Translate></Button>
                </Col>
              </Row>
            </Modal.Footer>

            </Modal.Body>
            </Modal>
        );
      }else{
      return(<></>);
    } 
    }
}
  
  export default (MessageModal);
  