import React from 'react';
import { Col, Card, Row, Image } from 'react-bootstrap';
import './CardPortfolio.css';
import AvatarImage from '../../../../Resources/Images/avatar.png';
import ServicesAPI from "../../../../serviceAPI";
import { withLocalize, Translate } from "react-localize-redux";
import getImageLanguage from "../../../../Resources/Translations/compilerLanguageImages.js"
import {  Link } from "react-router-dom";

var S = new ServicesAPI();
function CreatePortfolio(props) {
  var data= props.data;
  var parent = props.parent;
  
   const avatImage =(data.avatarImage=="")?AvatarImage:S.baseURL()+data.avatarImage;
   const avatUser =(data.avatarUser=="")?AvatarImage:S.baseURL()+"public/anexes/profiles/"+data.avatarUser;
  return (
    <div className="C-Portfolio" onClick={() => {parent.handleModalShow("portfolioSheet",data.idSheet)}}>
  < span id={data.link} className="C-Portfolio-Link" >


  <Card className="C-Portfolio-Card">

     <div className="C-Portfolio-Sheet"><Image src={S.baseURL()+"public/anexes/sheets/"+data.defaultImageSheet} className="C-Portfolio-Sheet-Image"/></div>
     <Card.Body className="C-Portfolio-Body">
     <div style={{minHeight: "70px", display: "block"}}>
      <Row className="C-Portfolio-Sheet-Name rowCards">{data.nameSheet}</Row>
      
      <Row className="C-Portfolio-Location rowCards"><Image src={getImageLanguage(data.countrySheet)} style={{height: "32px",width: "32px"}} roundedCircle/> <div className="C-Portfolio-Country-Name">{data.regionSheet}</div></Row>
      <Row className="C-Portfolio-Keywords rowCards"><Translate id="keywords"></Translate>:<div className="C-Portfolio-Keywords-Name">{data.keywords.join(", ")}</div></Row>
      <Row className="C-Portfolio-Description rowCards">{data.descriptionSheet.substring(0,300)+
      ((data.descriptionSheet.length > 300)?"...":"")
      }</Row>
     </div>
    </Card.Body>
    <Card.Footer>
      <Row>
        <Col style={{paddingRight: 0}} xs={10} s={10} md={10} lg={10} xl={10}>
          <Link to={"/Profile/"+data.idUser} style={{width: "50%", textDecoration: "none"}}>
              <span  className="C-Portfolio-Footer-User">
                <Image src={avatUser} className="C-Portfolio-Footer-Avatar-Image"></Image>
                  <div className="C-Portfolio-Footer-Name">
                  <Translate id="by"></Translate>
                  <span className="C-Portfolio-Footer-Username">{data.nameUser}</span>
                  </div>
              </span>
          </Link>
        </Col>
        <Col xs={2} s={2} md={2} lg={2} xl={2} style={{marginTop: "auto", marginBottom: "auto"}}>
            <div className="C-Portfolio-Footer-Category">{data.valueCategory}</div>
        </Col>
    </Row>
    </Card.Footer>
   </Card>
   </span>
 </div>
  )
}

class CardPortfolio extends React.Component { 
   
  render() {
    return ( 
   
      <Col xs={12} sm={6} md={6} lg={4} xl={3} style={{marginTop:"10px"}}>
        {CreatePortfolio(this.props)}
       </Col>
    );} }
export default withLocalize(CardPortfolio);
