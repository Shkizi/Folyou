import React from 'react'
import CardProposal from '../../../Components/Elements/Cards/CardProposal/CardProposal'
import CardPortfolio from '../../../Components/Elements/Cards/CardPortfolio/CardsPortfolio'
import { Container, Row } from 'react-bootstrap';
import { withLocalize } from "react-localize-redux";
import CardTalent from '../../Elements/Cards/CardTalent/CardTalent';

const Home = () => (

<Container fluid={true}>
            <Row style={{margin: 0}}>
            <CardTalent/>
            </Row>
          </Container>
)

export default withLocalize(Home);
