import React from 'react'
import { Carousel, Image, Col, Row,} from 'react-bootstrap';
import {  Link } from "react-router-dom";


import ServicesAPI from "../../../../serviceAPI";
import getImageLanguage from "../../../../Resources/Translations/compilerLanguageImages.js"
import './HomeCarousel.css'


var S = new ServicesAPI();
class HomeCarousel extends React.Component { 

  
    render() {
      let parent = this.props.parent;
        return ( 
       
            <Carousel className="Home-Carousel">
             {this.props.parent.state.portTrending.concat(this.props.parent.state.portfolios).map(val =>{return(
            
            <Carousel.Item className="HomeCarousel-Item">
                              <div className="w-100 HomeCarrousel-Background">
                                <Row>
                                <Col xs="5" sm="5" md="5" lg="5" xl="5">
                                    <div className="container HomeCarrousel-Image-Container">
                                      <Image className="HomeCarousel-Image" src={S.baseURL()+"public/anexes/sheets/"+val.defaultImageSheet} thumbnail onClick={() => {parent.handleModalShow("portfolioSheet",val.idSheet)}} />
                                    </div>
                                </Col>
                                <Col xs="7" sm="7" md="7" lg="7" xl="7">
                                    <div className="HomeCarrousel-Text-Container">
                                 
                                      <div className="HomeCarrousel-Text-Project-Name" onClick={() => {parent.handleModalShow("portfolioSheet",val.idSheet)}} >{val.nameSheet}</div>
                                      <Link style={{textDecoration: "none"}}variant="link" to={"/Profile/"+val.idUser}>
                                      <Row style={{marginLeft: "0"}}>
                                      <Image className="HomeCarousel-Profile-Image" src={S.baseURL()+"public/anexes/profiles/"+((val.avatarUser!="")?val.avatarUser:"default_user_pic.jpg")} style={{height: "32px",width: "32px"}} roundedCircle/>
                                      <div className="HomeCarrousel-Username">{val.nameUser}</div> 
                                      </Row>
                                      </Link>

                                      
                                      <div className="HomeCarrousel-Text-Project-Origin">
                                      <Row style={{marginLeft: "0"}}>
                                      <Image src={getImageLanguage(val.countrySheet)} style={{height: "32px",width: "32px"}} roundedCircle/>
                                      <div className="HomeCarrousel-Region">{val.regionSheet}</div> 
                                      </Row>                                      
                                      </div>
                                      <div className="HomeCarrousel-Text-Project-Description">
                                      {val.descriptionSheet.substring(0,200)+((val.descriptionSheet.length > 200)?"...":"")}
                                      </div>
                                    </div>
                                </Col>
                                </Row>
                              </div>
                              
              </Carousel.Item>  
            )} )}
        </Carousel>
        )}
}
export default HomeCarousel;
