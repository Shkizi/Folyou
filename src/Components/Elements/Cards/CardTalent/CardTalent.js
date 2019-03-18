import React from 'react';
import { Col, Card, Row, Image } from 'react-bootstrap';
import './CardTalent.css'
import jsonarray from './CardTalentJSON.js'
import AvatarImage from '../../../../Resources/Images/avatar.png'
import { MdMailOutline } from "react-icons/md";
import {  Link } from "react-router-dom";
import ServicesAPI from "../../../../serviceAPI";
var S = new ServicesAPI();
function CreateTalent(data) {
   const avatUser =(data.avatarUser=="")?AvatarImage:S.baseURL()+data.avatarUser;
  
  return (
    <div className="C-Talent">
  <Link to={data.link} className="C-Talent-Link">


  <Card className="C-Talent-Card">
    <Card.Body className="C-Talent-Body">
     <div className="C-Talent-Avatar"><Image src={avatUser} className="C-Talent-Avatar-Image"/></div>
     <div style={{minHeight: "280px", display: "block"}}>
      <Row className="C-Talent-User-Location rowCards">{data.location}</Row>
      <Row className="C-Talent-User-Name rowCards">{data.offerName}</Row>
      <Row className="C-Talent-Website-Link rowCards">{data.name}</Row>
      <Row className="C-Talent-User-Description rowCards">{data.description}</Row>
     </div>
    </Card.Body>
    <Card.Footer className="C-Talent-Footer">
      <div className="C-Talent-Footer-Risingstar">{data.category}</div>
      <div  className="C-Talent-Footer-Mailbox"><MdMailOutline/></div>
    </Card.Footer>
   
   </Card>
   </Link>
 </div>
  )
}

class CardTalent extends React.Component { 
  
  render() {
    return ( 
   
      <Col xs={12} sm={6} md={6} lg={4} xl={3}>
        {CreateTalent(this.props.data)}
       </Col>
    );} }

export default CardTalent;
