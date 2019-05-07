import React from 'react';
import { Col, Card, Row, Image } from 'react-bootstrap';
import './CardProposal.css'
import AvatarImage from '../../../../Resources/Images/avatar.png'
import ServicesAPI from "../../../../serviceAPI";
import { withLocalize, Translate } from "react-localize-redux";
import getImageLanguage from "../../../../Resources/Translations/compilerLanguageImages.js"

var S = new ServicesAPI();
function CreateProposal(props) {
  var data= props.data;
   var parent = props.parent; 
  const avatUser =(data.avatarUser=="")?AvatarImage:S.baseURL()+data.avatarUser;
   
   
  return (
    
   <div className="C-Proposal" onClick={() => {parent.handleModalShow("proposalSheet",data.idProposal)}}>
  < span id={data.link} className="C-Proposal-Link" >

  <Card className="C-Proposal-Card">
    <Card.Body className="C-Proposal-Body">
     <div className="C-Proposal-Avatar"><Image src={avatUser} className="C-Proposal-Avatar-Image"/></div>
     <div style={{minHeight: "280px", display: "block"}}>
     
      <Row className="C-Proposal-Offer-Location rowCards"><Image src={getImageLanguage(data.countryProposal)} className="Modal-Portfolio-Avatar-Country" roundedCircle/> {data.regionProposal }</Row>
      <Row className="C-Proposal-Offer-Name rowCards">{data.nameProposal}</Row>
      <Row className="C-Proposal-Proponent-Name rowCards">{data.nameUser}</Row>
      <Row className="C-Proposal-Proponent-Description rowCards">{data.descriptionProposal}</Row>
      <Row className="C-Proposal-Keywords rowCards"><Translate id="keywords"></Translate >: {data.keywords.join(", ")}</Row>
     </div>
    </Card.Body>
    <Card.Footer className="C-Proposal-Footer">
      <div className="C-Proposal-Footer-Category">{data.valueCategory}</div>
      <div  className="C-Proposal-Footer-Date">{data.createdTimestamp}</div>
    </Card.Footer>
   
   </Card>
   </span>
 </div>
  )
}

class CardProposal extends React.Component { 
  
  render() {
    return ( 
   
      <Col xs={12} sm={6} md={6} lg={4} xl={3}>
        {CreateProposal(this.props)}
       </Col>
    );} }

export default withLocalize(CardProposal);
