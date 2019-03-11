//place for all the portfolios

import React from 'react';
import CardPortfolio from '../../../Components/Elements/Cards/CardPortfolio/CardPortfolio';

import { Container, Row } from 'react-bootstrap';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";


var data;
const PortfoliosAreaView = () => (

    <Container fluid={true}>
        <Row style={{margin: 0}}>


 {/* TRENDING SECTION */}

 <Row style={{margin: 0}}>
                     <Col sm={12} className="Header-Sections">
                      <h1><Translate id="Portfolios"/></h1>
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


            <CardPortfolio data={data}/>
        </Row>
    </Container>
)

export default withLocalize(PortfoliosAreaView);
