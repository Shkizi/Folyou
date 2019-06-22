import React from 'react'
import { Link } from "react-router-dom";
import { Modal, Image, Card, Row, Button, Col } from 'react-bootstrap';
import { Translate } from "react-localize-redux";
import './CardsModalProposal.css';
import getImageLanguage from "../../../../../Resources/Translations/compilerLanguageImages.js"
import { isNull } from 'util';
import {  FiMail } from "react-icons/fi";
import { FaFileContract } from "react-icons/fa";
import { TiHeart } from "react-icons/ti";
import { TiHeartOutline } from "react-icons/ti";
import { getIconForExtension } from 'font-awesome-filetypes'

import ServicesAPI from "../../../../../serviceAPI";
var S = new ServicesAPI();
class CardsModalProposal extends React.Component {

  constructor(props, context) {
    super(props, context);
   
    this.state = {
      data: {}
    };
    

  }
  componentDidMount(){
  
    
  }

  render() {
    if( this.props.parent.state.showModalProposal){
      let data = {};
      console.log(this.props.parent.state.propTrending);
      console.log(this.props.parent.state.proposals);
      console.log(this.props.parent.state.idModal);
      if (!(typeof this.props.parent.state.propTrending ==="undefined")&&this.props.parent.state.propTrending.length > 0){
       this.props.parent.state.propTrending.forEach((valuePort,indexPort,arrayPort)=>{
          if (this.props.parent.state.propTrending[indexPort].idProposal == this.props.parent.state.idModal){
          data = this.props.parent.state.propTrending[indexPort];
            }
        });
      } if (!(typeof this.props.parent.state.proposals ==="undefined")&&this.props.parent.state.proposals.length > 0){
        this.props.parent.state.proposals.forEach((valuePort,indexPort,arrayPort)=>{
          if (this.props.parent.state.proposals[indexPort].idProposal == this.props.parent.state.idModal){
          data = this.props.parent.state.proposals[indexPort];
         
            }
        });
      }
      else{data = {};}
      console.log(data);
        return (   
          <Modal
            show={this.props.parent.state.showModalProposal} 
            onHide={this.props.closer} 
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
            <Row style={{padding: "16px"}}>
                <Link style={{textDecoration: "none"}}variant="link" to={"/Profile/"+data.idUser}>
                  <Row style={{paddingLeft: "16px", paddingTop: "16px"}}>
                  <Image src={S.baseURL()+"public/anexes/profiles/"+((data.avatarUser!="")?data.avatarUser:"default_user_pic.jpg")} className="Modal-Proposal-Avatar" roundedCircle />
                    <div className="Modal-Proposal-Username">{data.nameUser}</div>
                  </Row>
                </Link>
                {(this.props.app.state.userLogged.idUser==data.idUser  && this.props.app.state.userLogged.set!=false)?
                <Link variant="primary" to={"/EditProposal/"+data.idProposal}>
                    <Button className="Modal-Proposal-Config"><Translate id="edit project"/></Button>
                </Link>
                  :
                  <></>}
            </Row>
            </Modal.Header>
            <Modal.Body  style={{padding: 0}}>
            <Card >
              <Card.Body>
                <Row  style={{padding: "16px"}}>
                  <Image src={getImageLanguage(data.countryProposal)} className="Modal-Proposal-Avatar-Country" roundedCircle/>
                  <div className="Modal-Proposal-User-Location">{data.regionProposal}</div>
                  <div className="Modal-Proposal-Proposal-Category"><b><Translate id="category profile"></Translate></b>{"  " + data.valueCategory}</div>
                </Row>
                <div className="Modal-Proposal-ProposalName">{data.nameProposal}</div> 
                <div className="Modal-Proposal-Keywords"><b><Translate id="keywords"></Translate> </b>{": " + data.keywords.join(", ")}</div>

              
              </Card.Body>
            </Card>

              <Card className="Modal-Proposal-Description-Area">
                <div><b><Translate id="description"></Translate></b></div>
                <div className="Modal-Proposal-Description">{data.descriptionProposal}</div>
              </Card>

              <Card>
              <div className="Modal-Proposal-Anexes-Container">
                    <div style={{marginBottom: "2%", fontWeight: "bold"}}><Translate id="anexes"></Translate></div>
                    <Row style={{paddingLeft: "16px", textAlign: "center"}}>
                    {data.fil.split(",").map(val=>{if(val!=""){return(
                      <Col className="Modal-Proposal-Anexes" sm={3}>
                      <a href={S.baseURL()+"public/anexes/proposals/"+val} target="_blank" >
                        <div  dangerouslySetInnerHTML={{__html: getIconForExtension(val.split('.').pop())}} />
                        <div style={{marginLeft: "6px"}}>{val}</div>
                      </a>
                      </Col>
                    )}else{
                      return <></>
                    }})}
                    </Row>
                </div>
                </Card>


            </Modal.Body>
            <Modal.Footer>
              
              {(this.props.app.state.userLogged.idUser!=data.idUser  && this.props.app.state.userLogged.set!=false)?
              <Row>  <Col>
                  <Link to={"/ApplicationRegister/"+data.idProposal}>
                   <Button className={"Modal-Proposal-Button"}><FaFileContract/> <Translate id="apply"></Translate></Button>
                  </Link>
                </Col>
                <Col>
                   <Button className={"Modal-Proposal-Button-Message"} onClick={(event)=>{handleMessage(event,this,data)}} ><FiMail/> <Translate id="send a message"></Translate></Button>           
                   
                </Col>
                </Row>
                :<></>}
              
            </Modal.Footer>
            </Modal>
        );
      }else{
      return(<></>);
    } 
    }
}
function handleMessage(event,card,data) {
  var data= data;
   var parent = card.props.parent;
  event.stopPropagation();
  parent.handleModalShow("messageModalProposal",data.idProposal);
  
}
  export default (CardsModalProposal);
  