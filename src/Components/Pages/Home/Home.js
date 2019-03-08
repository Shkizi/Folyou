import React from 'react'
import CardProposal from '../../../Components/Elements/Cards/CardProposal/CardProposal'
import CardPortfolio from '../../Elements/Cards/CardPortfolio/CardPortfolio'
import { Container, Row, Col} from 'react-bootstrap';
import { withLocalize } from "react-localize-redux";
import CardTalent from '../../Elements/Cards/CardTalent/CardTalent';
import jsonPortfolio from '../../Elements/Cards/CardPortfolio/CardPortfolioJSON'
import jsonProposal from '../../Elements/Cards/CardProposal/CardProposalJSON'
import jsonTalent from '../../Elements/Cards/CardTalent/CardTalentJSON'

import './Home.css'


class Home extends React.Component { 

  componentDidMount() {



  }
  render() {
    return ( 
        <Container fluid={true}>

          {/* TRENDING SECTION */}

                    <Row style={{margin: 0}}>
                     <Col sm={12} className="Header-Sections">
                      <h1>Trending</h1>
                      </Col>
                      <Col sm={12}>
                      <hr className="Hr-Sections"/>
                      <Row>
                      {jsonPortfolio.map(val =>{return(
                        <CardPortfolio data={val} />
                      );})}
                      {jsonProposal.map(val =>{return(
                        <CardProposal data={val} />
                      );})}
                      </Row>
                      </Col>
                    </Row>

         {/* PROJECT SECTION */}

         <Row style={{margin: 0}}>
                     <Col sm={12} className="Header-Sections">
                      <h1>Projects</h1>
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

        <Row style={{margin: 0}}>
                     <Col sm={12} className="Header-Sections">
                      <h1>Proposals</h1>
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

        <Row style={{margin: 0}}>
                     <Col sm={12} className="Header-Sections">
                      <h1>Rising Stars</h1>
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

              
        </Container>
 );} }

export default withLocalize(Home);
