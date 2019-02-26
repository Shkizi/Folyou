import React from 'react';
import { Col, Card, Row, Image } from 'react-bootstrap';
import './CardsProposal.css'
import jsonarray from './CardProposalJSON.js'
import AvatarImage from '../../../../Resources/Images/avatar.png'

function CreateProposal(data) {
 
  return (
<a href={"'"+data.link+"'"} className="C-Proposal-Link">

<Card className="C-Proposal">
    <Card.Body className="C-Proposal-Body">
    <div className="C-Proposal-Avatar"><Image src={AvatarImage} className="C-Proposal-Avatar-Image"/></div>
    <div style={{minHeight: "280px", display: "block"}}>
      <Row className="C-Proposal-Offer-Location">{data.location}</Row>
      <Row className="C-Proposal-Offer-Name">{data.offerName}</Row>
      <Row className="C-Proposal-Proponent-Name">{data.name}</Row>
      <Row className="C-Proposal-Proponent-Description">{data.description}</Row>
    </div>
    </Card.Body>
    <Card.Footer className="C-Proposal-Footer">
        <Row>
          <Col xs="6" className="C-Proposal-Footer-Category">
          <p>{data.category}</p>
          </Col>
          <Col xs="6" className="C-Proposal-Footer-Date">
          <p>{data.date}</p>
          </Col>
        </Row>
      </Card.Footer>
   
   </Card>
    </a>
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
