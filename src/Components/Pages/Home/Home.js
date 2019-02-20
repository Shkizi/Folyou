import React from 'react'
import CardProposal from '../../../Components/Elements/Cards/CardProposal/CardProposal'
import CardPortfolio from '../../../Components/Elements/Cards/CardPortfolio/CardsPortfolio'
import { Container, Row, Col } from 'react-bootstrap';
const Home = () => (

<Container fluid={true}>
            <Row style={{margin: 0}}>
            <CardProposal/>
            </Row>
          </Container>
)

export default Home
