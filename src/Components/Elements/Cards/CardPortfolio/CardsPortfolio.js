import React from 'react';
import { Col, Card, Row } from 'react-bootstrap';
import Images from '../../../../Resources/Images/Images'
import './CardPortfolio.css'
import jsonarray from './CardPortfolioJSON'

function CreatePortfolio(data) {
 
  return (

<Card className="C-Portfolio">
 <div className="C-Portfolio-Link">
   <a href={"'"+data.link+"'"} className="C-Portfolio-Link">
    <Card.Body style={{padding: 0}}>
    <Card.Img src={Images.Iade} className="C-Portfolio-Image"/>
      <p className="C-Portfolio-Offer-Location">{data.location} </p>
      <Card.Title className="C-Portfolio-Offer-Name">{data.offerName}</Card.Title>
      <p className="C-Portfolio-Proponent-Name">{data.name}</p>
      <Card.Text className="C-Portfolio-Proponent-Description">
      {data.description}
      </Card.Text>
      <Card.Footer className="C-Portfolio-Footer">
        <Row>
          <Col xs="6"  className="C-Portfolio-Footer-Category">
          <p>{data.category}</p>
          </Col>
          <Col xs="6"  className="C-Portfolio-Footer-Date">
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

function CardPortfolio() {
  
  return jsonarray.map(val =>{ 
    return (
        CreatePortfolio(val)
    );
  });
}

export default CardPortfolio;
