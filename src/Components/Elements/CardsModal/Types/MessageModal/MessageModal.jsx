import React from 'react'
import { Modal, Image, Card, Row, Form } from 'react-bootstrap';
import { Translate } from "react-localize-redux";
import './MessageModal.css';
import getImageLanguage from "../../../../../Resources/Translations/compilerLanguageImages.js"
import { isNull } from 'util';
import ServicesAPI from "../../../../../serviceAPI";
var S = new ServicesAPI();
class MessageModal extends React.Component {

  constructor(props, context) {
    super(props, context);
   
    this.state = {
      data: {}
    };
    

  }
  componentDidMount(){
  
    
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
      }else if (this.props.parent.state.talents.length > 0){
        this.props.parent.state.talents.forEach((valuePort,indexPort,arrayPort)=>{
          if (this.props.parent.state.talents[indexPort].idTalentArea == this.props.parent.state.idModal){
          data = this.props.parent.state.talents[indexPort];
         
            }
        });
      }
      else{data = {};}
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
              <Image src={(data.avatarUser=="")?"https://www.w3schools.com/howto/img_avatar.png":S.baseURL()+"public/anexes/profiles/"+data.avatarUser} className="Modal-Portfolio-Avatar" roundedCircle />
              <div className="Modal-Portfolio-Username">{data.nameUser}</div>
              </Row>
              </div>
            </Modal.Header>
            <Modal.Body style={{padding: 0}}>
            <Card style={{padding: "16px"}}>
                <div className="Modal-Message-Sendme-Text"><Translate id="send me a message"></Translate></div>
                <Form>
                    <Form.Group>
                    <Form.Control as="textarea" rows="10" maxLength="2000" />
                    </Form.Group>
                </Form>
 

            </Card>
            </Modal.Body>
            </Modal>
        );
      }else{
      return(<></>);
    } 
    }
}
  
  export default (MessageModal);
  