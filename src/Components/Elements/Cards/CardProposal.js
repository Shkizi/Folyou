import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Col, Card, Row } from 'react-bootstrap';
import './CardsProposal.css'
import jsonarray from './CardProposalJSON.js'

function CreateProposal(data) {
 
  return (
<Card className="C-Proposal">
 <div className="C-Proposal-Link">
   <a href={"'"+data.link+"'"} className="C-Proposal-Link">
    <Card.Body>
         <FaUserCircle className="C-Proposal-Avatar"/>
         <Card.Title className="C-Proposal-Offer-Name">{data.offerName}</Card.Title>
      <Card.Subtitle className="C-Proposal-Offer-Location">{data.location}</Card.Subtitle>
      <p className="C-Proposal-Proponent-Name">{data.name}</p>
      <Card.Text className="C-Proposal-Proponent-Description">
      {data.description}
      </Card.Text>
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
    </Card.Body>
    </a>
    </div>

   </Card>
  )
}

function CardProposal(props) {
  
  return jsonarray.map(val =>{ 
    return (
        CreateProposal(val)
    );
  });
}

export default CardProposal;
