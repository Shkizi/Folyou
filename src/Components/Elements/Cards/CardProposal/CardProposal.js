import React from 'react';
import { Col, Card, Row, Image } from 'react-bootstrap';
import './CardProposal.css'
import AvatarImage from '../../../../Resources/Images/avatar.png'
import ServicesAPI from "../../../../serviceAPI";
import {  Link } from "react-router-dom";
import { withLocalize, Translate } from "react-localize-redux";
import getImageLanguage from "../../../../Resources/Translations/compilerLanguageImages.js"

var S = new ServicesAPI();
function CreateProposal(props) {
  var data= props.data;
   var parent = props.parent; 
   var app = props.app;
  const avatUser =(data.avatarUser=="")?AvatarImage:S.baseURL()+"public/anexes/profiles/"+data.avatarUser;
   
   
  return (
    
   <div className="C-Proposal" onClick={() => {parent.handleModalShow("proposalSheet",data.idProposal)}}>
  < span id={data.link} className="C-Proposal-Link" >

  <Card className="C-Proposal-Card">
    <Card.Body className="C-Proposal-Body">
     <div className="C-Proposal-Avatar"><Link variant="link" className="C-Proposal-Name-User" to={"/Profile/"+data.idUser}><Image src={avatUser} className="C-Proposal-Avatar-Image"/><span style={{paddingLeft: "1%"}}>{data.nameUser}</span></Link></div>
     <div style={{minHeight: "280px", display: "block"}}>
     
      <Row className="C-Proposal-Offer-Location rowCards"><Image src={getImageLanguage(data.countryProposal)} style={{height: "32px",width: "32px"}} roundedCircle/><div className="C-Proposal-Country-Name">{data.regionProposal}</div></Row>
      <Row className="C-Proposal-Offer-Name rowCards">{data.nameProposal}</Row>
      <Row className="C-Proposal-Proponent-Description rowCards">{data.descriptionProposal}</Row>
      <Row className="C-Proposal-Keywords rowCards"><Translate id="keywords"></Translate >:<div className="C-Proposal-Keywords-Name">{data.keywords.join(", ")}</div></Row>
     </div>
    </Card.Body>
    <Card.Footer className="C-Proposal-Footer">
      <div className="C-Proposal-Footer-Category">{data.valueCategory}</div>
      <div  className="C-Proposal-Footer-Date">{(app.state.currentLanguage==app.state.currentLanguage)?app.formatDate(data.createdTimestamp):app.formatDate(data.createdTimestamp)}</div>
    </Card.Footer>
   
   </Card>
   </span>
 </div>
  )
}

class CardProposal extends React.Component { 
  
  render() {
    return ( 
   
      <Col xs={12} sm={6} md={6} lg={4} xl={3} style={{marginTop:"10px"}}>
        {CreateProposal(this.props)}
       </Col>
    );} }

export default withLocalize(CardProposal);
