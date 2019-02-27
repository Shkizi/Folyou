import React from 'react';
import { Col, Card, Row, Image } from 'react-bootstrap';
import './CardPortfolio.css'
import jsonarray from './CardPortfolioJSON.js'
import AvatarImage from '../../../../Resources/Images/avatar.png'

function CreatePortfolio(data) {
 
  return (
    <div className="C-Portfolio">
  <a href={"'"+data.link+"'"} className="C-Portfolio-Link">


  <Card className="C-Portfolio-Card">
    <Card.Body className="C-Portfolio-Body">
     <div className="C-Portfolio-Avatar"><Image src={AvatarImage} className="C-Portfolio-Avatar-Image"/></div>
     <div style={{minHeight: "280px", display: "block"}}>
      <Row className="C-Portfolio-Offer-Location rowCards">{data.location}</Row>
      <Row className="C-Portfolio-Offer-Name rowCards">{data.offerName}</Row>
      <Row className="C-Portfolio-Proponent-Name rowCards">{data.name}</Row>
      <Row className="C-Portfolio-Proponent-Description rowCards">{data.description}</Row>
     </div>
    </Card.Body>
    <Card.Footer className="C-Portfolio-Footer">
      <div className="C-Portfolio-Footer-Category">{data.category}</div>
      <div  className="C-Portfolio-Footer-Date">{data.date}</div>
    </Card.Footer>
   
   </Card>
   </a>
 </div>
  )
}

function CardPortfolio() {
  
  return jsonarray.map(val =>{ 
    return (
      <Col xs={12} sm={6} md={6} lg={4} xl={3}>
        {CreatePortfolio(val)}
       </Col>
    );
  });
}

export default CardPortfolio;
