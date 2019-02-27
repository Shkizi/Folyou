import React from 'react'
import CardProposal from '../../../Components/Elements/Cards/CardProposal/CardProposal'
import CardPortfolio from '../../Elements/Cards/CardPortfolio/CardPortfolio'
import { Container, Row } from 'react-bootstrap';
import { withLocalize } from "react-localize-redux";
import CardTalent from '../../Elements/Cards/CardTalent/CardTalent';


const Home = () => (

<Container fluid={true}>
            <Row style={{margin: 0}}>
            <CardPortfolio/>
            </Row>
          </Container>
)

export default withLocalize(Home);
