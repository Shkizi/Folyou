import React from 'react';
import { Col, Card, Row, Image } from 'react-bootstrap';
import './CardPortfolio.css';
import AvatarImage from '../../../../Resources/Images/avatar.png';
import ServicesAPI from "../../../../serviceAPI";
var S = new ServicesAPI();
function CreatePortfolio(data) {
   const avatImage =(data.avatarImage=="")?AvatarImage:S.baseURL()+data.avatarImage;
   const avatUser =(data.avatarUser=="")?AvatarImage:S.baseURL()+data.avatarUser;
  return (
    <div className="C-Portfolio">
  <a href={data.link} className="C-Portfolio-Link">


  <Card className="C-Portfolio-Card">

     <div className="C-Portfolio-Sheet"><Image src={avatImage} className="C-Portfolio-Sheet-Image"/></div>
     <Card.Body className="C-Portfolio-Body">
     <div style={{minHeight: "70px", display: "block"}}>
      <Row className="C-Portfolio-Sheet-Name rowCards">{data.sheetName}</Row>
      <Row className="C-Portfolio-Description rowCards">{data.description}</Row>
     </div>
    </Card.Body>
    <Card.Footer className="C-Portfolio-Footer">
      <Image src={avatUser} className="C-Portfolio-Footer-Avatar-Image"></Image>
      <div  className="C-Portfolio-Footer-Name">By {data.name}</div>
    </Card.Footer>
   
   </Card>
   </a>
 </div>
  )
}

class CardPortfolio extends React.Component { 
   
  render() {
    return ( 
   
      <Col xs={12} sm={6} md={6} lg={4} xl={3}>
        {CreatePortfolio(this.props.data)}
       </Col>
    );} }
export default CardPortfolio;
