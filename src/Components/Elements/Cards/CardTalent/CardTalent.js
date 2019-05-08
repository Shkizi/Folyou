import React from 'react';
import { Col, Card, Row, Image } from 'react-bootstrap';
import './CardTalent.css'
import AvatarImage from '../../../../Resources/Images/avatar.png'
import { MdMailOutline } from "react-icons/md";
import {  Link } from "react-router-dom";
import ServicesAPI from "../../../../serviceAPI";
import { withLocalize, Translate } from "react-localize-redux";
import getImageLanguage from "../../../../Resources/Translations/compilerLanguageImages.js"
var S = new ServicesAPI();
function CreateTalent(props) {
  var data= props.data;
   var parent = props.parent;
   const avatUser =(data.avatarUser=="")?AvatarImage:S.baseURL()+"public/anexes/profiles/"+data.avatarUser;
  
  return (
   
    <div className="C-Talent" onClick={() => {parent.handleModalShow("talentSheet",data.idTalentArea)}}>
    < span id={data.link} className="C-Talent-Link" >
  

  <Card className="C-Talent-Card">
    <Card.Body className="C-Talent-Body">
     <div className="C-Talent-Avatar"><Image src={avatUser} className="C-Talent-Avatar-Image"/></div>
     <div style={{minHeight: "280px", display: "block"}}>
     
      <Row className="C-Talent-User-Location rowCards"><Image src={getImageLanguage(data.countryUser)} style={{height: "32px",width: "32px"}} roundedCircle/><div className="C-Talent-Country-Name">{data.regionUser}</div></Row>
      <Row className="C-Talent-User-Name rowCards">{data.nameUser}</Row>
      <Row className="C-Talent-Website-Link rowCards">{data.nameTalentArea}</Row>
      <Row className="C-Talent-User-Description rowCards">{data.descriptionTalentArea}</Row>
      <Row className="C-Talent-Keywords rowCards"><Translate id="keywords"></Translate >:<div className="C-Talent-Keywords-Name">{data.keywords.join(", ")}</div></Row>
     </div>
    </Card.Body>
    <Card.Footer className="C-Talent-Footer">
      <div className="C-Talent-Footer-Risingstar">{data.valueCategory}</div>
      <div  className="C-Talent-Footer-Mailbox"><MdMailOutline/></div>
    </Card.Footer>
   
   </Card>
   </span>
 </div>
  )
}

class CardTalent extends React.Component { 
  
  render() {
    return ( 
   
      <Col xs={12} sm={6} md={6} lg={4} xl={3}>
        {CreateTalent(this.props)}
       </Col>
    );} }

export default withLocalize(CardTalent);
