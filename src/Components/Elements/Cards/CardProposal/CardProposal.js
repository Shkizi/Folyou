import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Col, Card, Row } from 'react-bootstrap';
import './CardsProposal.css'
import jsonarray from './CardProposalJSON.js'

function CreateProposal(data) {
 
  return (
<a href={"'"+data.link+"'"} className="C-Proposal-Link">
<Card className="C-Proposal">
   
    <Card.Body style={{paddingBottom: 0}}>
      <FaUserCircle className="C-Proposal-Avatar"/>
      <p className="C-Proposal-Offer-Location">{data.location} </p>
      <Card.Title className="C-Proposal-Offer-Name">{data.offerName}</Card.Title>
      <p className="C-Proposal-Proponent-Name">{data.name}</p>
      <Card.Text className="C-Proposal-Proponent-Description">
      {data.description}
      </Card.Text>
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
      <Col md="3">
        {CreateProposal(val)}
       </Col>
    );
  });
}

export default CardProposal;
