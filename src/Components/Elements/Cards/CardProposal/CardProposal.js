import React from 'react';
import { Col, Card, Row, Image } from 'react-bootstrap';
import './CardsProposal.css'
import jsonarray from './CardProposalJSON.js'
import AvatarImage from '../../../../Resources/Images/avatar.png'

function CreateProposal(data) {
 
  return (
    <div className="C-Proposal">
  <a href={"'"+data.link+"'"} className="C-Proposal-Link">


  <Card className="C-Proposal-Card">
    <Card.Body className="C-Proposal-Body">
     <div className="C-Proposal-Avatar"><Image src={AvatarImage} className="C-Proposal-Avatar-Image"/></div>
     <div style={{minHeight: "280px", display: "block"}}>
      <Row className="C-Proposal-Offer-Location rowCards">{data.location}</Row>
      <Row className="C-Proposal-Offer-Name rowCards">{data.offerName}</Row>
      <Row className="C-Proposal-Proponent-Name rowCards">{data.name}</Row>
      <Row className="C-Proposal-Proponent-Description rowCards">{data.description}</Row>
     </div>
    </Card.Body>
    <Card.Footer className="C-Proposal-Footer">
      <div className="C-Proposal-Footer-Category">{data.category}</div>
      <div  className="C-Proposal-Footer-Date">{data.date}</div>
    </Card.Footer>
   
   </Card>
   </a>
 </div>
  )
}

function CardProposal() {
  
  return jsonarray.map(val =>{ 
    return (
      <Col xs={12} sm={6} md={6} lg={4} xl={3}>
        {CreateProposal(val)}
       </Col>
    );
  });
}

export default CardProposal;
