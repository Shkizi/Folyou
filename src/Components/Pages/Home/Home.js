import React from 'react'
import CardProposal from '../../../Components/Elements/Cards/CardProposal/CardProposal'
import CardPortfolio from '../../Elements/Cards/CardPortfolio/CardPortfolio'
import { Container, Row, Col, Button} from 'react-bootstrap';
import { withLocalize, Translate } from "react-localize-redux";
import CardTalent from '../../Elements/Cards/CardTalent/CardTalent';
import HomeCarousel from '../../Elements/Carousel/HomeCarousel/HomeCarousel'
import jsonPortfolio from '../../Elements/Cards/CardPortfolio/CardPortfolioJSON'
import jsonProposal from '../../Elements/Cards/CardProposal/CardProposalJSON'
import jsonTalent from '../../Elements/Cards/CardTalent/CardTalentJSON'
import CardsModal from '../../Elements/CardsModal/CardsModal.jsx'
import { IoIosArrowForward } from "react-icons/io";

import './Home.css'


class Home extends React.Component { 
  constructor(props, context) {
    super(props, context);
   
    this.state = {
      showModal: false,
      typeModal: null,
      idModal: null,
    };
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleModalShow = this.handleModalShow.bind(this);

  }
  
  handleModalClose() {
    this.setState({ showModal: false });
  }

  handleModalShow(type, id) {
    this.setState({ showModal: true, typeModal: type, idModal: id });
  }
  componentDidMount() {

  }


  render() {
    return ( 
        <>
        
          {/* HOME CAROUSEL SECTION */}
                    <Row style={{margin: 0}}>
                      <Col sm={12} className="Header-Sections">
                        <HomeCarousel/>
                      </Col>
                    </Row>
        

          {/* TRENDING SECTION */}

                    <Row style={{margin: 0}}>
                     <Col sm={12} className="Header-Sections">
                         <h1 style={{marginTop: "auto", marginBottom:"auto"}}><Translate id="trending"></Translate></h1>
                         </Col>
                      <Col sm={12}>
                      <hr className="Hr-Sections"/>
                      <Row>
                      {jsonPortfolio.map(val =>{return(
                        <CardPortfolio data={val} parent={this} />
                      );})}
                      {jsonProposal.map(val =>{return(
                        <CardProposal data={val} />
                      );})}
                      </Row>
                      </Col>
                    </Row>

         {/* PROJECT SECTION */}

         <Row style={{margin: 0, marginTop: "3%"}}>
                     <Col sm={12} className="Header-Sections">
                    
                        <b style={{fontFamily: "inherit",
                        fontWeight: "500",
                        color: "inherit",
                        fontSize:"26px",
                       }}><Translate id="latest projects" ></Translate> 
                       <Button className="Button-View-All">
                           <a className="Button-View-All-Text">
                            <Translate id="see more"></Translate>
                           </a>
                          <IoIosArrowForward></IoIosArrowForward>
                      </Button>
                       </b>
                     
                      </Col>
                      <Col sm={12}>
                      <hr className="Hr-Sections"/>
                      <Row>
                      {jsonPortfolio.map(val =>{return(
                        <CardPortfolio data={val} />
                      );})}
                      </Row>
                      </Col>
                    </Row>

        {/* PROPONENT SECTION*/}

        <Row style={{margin: 0, marginTop: "3%"}}>
                     <Col sm={12} className="Header-Sections">
                     <b style={{fontFamily: "inherit",
                        fontWeight: "500",
                        color: "inherit",
                        fontSize:"26px",
                       }}><Translate id="latest proposals" ></Translate> 
                       <Button className="Button-View-All">
                           <a className="Button-View-All-Text">
                            <Translate id="see more"></Translate>
                           </a>
                          <IoIosArrowForward></IoIosArrowForward>
                      </Button>
                       </b>
                                           </Col>
                      <Col sm={12}>
                      <hr className="Hr-Sections"/>
                      <Row>
                      {jsonProposal.map(val =>{return(
                        <CardProposal data={val} />
                      );})}
                      </Row>
                      </Col>
                    </Row>

        {/* TALENT SECTION */}

        <Row style={{margin: 0, marginTop: "3%"}}>
                     <Col sm={12} className="Header-Sections">
                     <b style={{fontFamily: "inherit",
                        fontWeight: "500",
                        color: "inherit",
                        fontSize:"26px",
                       }}><Translate id="latest rising stars" ></Translate> 
                       <Button className="Button-View-All">
                           <a className="Button-View-All-Text">
                            <Translate id="see more"></Translate>
                           </a>
                          <IoIosArrowForward></IoIosArrowForward>
                      </Button>
                       </b>
                                           </Col>
                      <Col sm={12}>
                      <hr className="Hr-Sections"/>
                      <Row>
                      {jsonTalent.map(val =>{return(
                        <CardTalent data={val} />
                      );})}
                      </Row>
                      </Col>
                    </Row>

                    <CardsModal parent={this} closer={this.handleModalClose}/>

              
        </>
 );} }

export default withLocalize(Home);
