import React from 'react'
import { Carousel, Image, Col, Row,} from 'react-bootstrap';

import ServicesAPI from "../../../../serviceAPI";
import './HomeCarousel.css'


var S = new ServicesAPI();
class HomeCarousel extends React.Component { 

  
    render() {
        return ( 
       
            <Carousel className="Home-Carousel">
        {/*     {this.props.parent.state.portTrending.concat(this.props.parent.state.portfolios).map(val =>{return(
                        <Carousel.Item className="HomeCarousel-Item">
                        <img
                          className="d-block w-100 HomeCarousel-Image"
                          src={S.baseURL()+"public/anexes/sheets/"+val.defaultImageSheet}
                          alt="First slide"
                        /> */}

                           <Carousel.Item className="HomeCarousel-Item">
                              <div className="w-100 HomeCarrousel-Background">
                                <Row>
                                <Col md="5" lg="5">
                                    <div className="container HomeCarrousel-Image-Container">
                                      <Image className="HomeCarousel-Image" src="https://rockcontent.com/wp-content/uploads/2017/01/formatos-de-imagem-2.jpg" thumbnail />
                                    </div>
                                </Col>
                                <Col md="7" lg="7">
                                    <div className="HomeCarrousel-Text-Container">
                                      <div className="HomeCarrousel-Text-Project-Name">Project Name</div>
                                      <div className="HomeCarrousel-Text-Project-Origin">Country, region</div>
                                      <div className="HomeCarrousel-Text-Project-Description">
                                      DESCRIPTION TEST DESCRIPTION TEST DESCRIPTION TEST DESCRIPTION TEST DESCRIPTION TEST DESCRIPTION TEST DESCRIPTION TEST 
                                      DESCRIPTION TEST DESCRIPTION TEST DESCRIPTION TEST DESCRIPTION TEST DESCRIPTION TEST DESCRIPTION TEST DESCRIPTION TEST 
                                      DESCRIPTION TEST DESCRIPTION TEST DESCRIPTION TEST DESCRIPTION TEST DESCRIPTION TEST DESCRIPTION TEST DESCRIPTION TEST
                                      </div>
                                    </div>
                                </Col>
                                </Row>
                              </div>
                              
                           </Carousel.Item>           
           
          </Carousel>
        );} }

export default HomeCarousel;
