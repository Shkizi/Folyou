//place for all the portfolios

import React from 'react';
import CardPortfolio from '../../../Components/Elements/Cards/CardPortfolio/CardPortfolio';

import { Container, Row } from 'react-bootstrap';
import { withLocalize } from "react-localize-redux";


var data;
const PortfoliosAreaView = () => (

    <Container fluid={true}>
        <Row style={{margin: 0}}>
            <CardPortfolio data={data}/>
        </Row>
    </Container>
)

export default withLocalize(PortfoliosAreaView);
