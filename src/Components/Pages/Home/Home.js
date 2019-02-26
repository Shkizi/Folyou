import React from 'react'
import CardProposal from '../../../Components/Elements/Cards/CardProposal/CardProposal'
import CardPortfolio from '../../../Components/Elements/Cards/CardPortfolio/CardsPortfolio'
import { Container, Row } from 'react-bootstrap';
import { withLocalize } from "react-localize-redux";
const Home = () => (

<Container fluid={true}>
            <Row style={{margin: 0}}>
            <CardProposal/>
            </Row>
          </Container>
)

export default withLocalize(Home);
