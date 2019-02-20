import React from 'react'
import CardProposal from '../../../Components/Elements/Cards/CardProposal/CardProposal'
import CardPortfolio from '../../../Components/Elements/Cards/CardPortfolio/CardsPortfolio'
import { Container, Row, Col } from 'react-bootstrap';
const Home = () => (

<Container style={{padding: 0, margin: 0}} fluid={true}>
            <Row>
            <CardProposal/>
            </Row>
          </Container>
)

export default Home
