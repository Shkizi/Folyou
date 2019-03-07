import React from 'react';
import { Col, Card, Row, Image } from 'react-bootstrap';
import './CardPortfolio.css'
import jsonarray from './CardPortfolioJSON.js'
import AvatarImage from '../../../../Resources/Images/avatar.png'

function CreatePortfolio(data) {
 
  return (
    <div className="C-Portfolio">
  <a href={data.link} className="C-Portfolio-Link">


  <Card className="C-Portfolio-Card">

     <div className="C-Portfolio-Sheet"><Image src={AvatarImage} className="C-Portfolio-Sheet-Image"/></div>
     <Card.Body className="C-Portfolio-Body">
     <div style={{minHeight: "70px", display: "block"}}>
      <Row className="C-Portfolio-Sheet-Name rowCards">{data.sheetName}</Row>
      <Row className="C-Portfolio-Talent-Description rowCards">{data.description}</Row>
     </div>
    </Card.Body>
    <Card.Footer className="C-Portfolio-Footer">
      <Image src={AvatarImage} className="C-Portfolio-Footer-Avatar-Image"></Image>
      <div  className="C-Portfolio-Footer-Name">By {data.name}</div>
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
