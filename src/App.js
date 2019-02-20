import React, { Component } from 'react';
import CardProposal from './Components/Elements/Cards/CardProposal/CardProposal'
import CardPortfolio from './Components/Elements/Cards/CardPortfolio/CardsPortfolio'
import './App.css'
import { Container, Row, Col } from 'react-bootstrap';




class App extends Component {
  render() {
    return (

          <Container style={{padding: 0, margin: 0}}>
            <Row>
            <CardProposal/>
            </Row>
          </Container>
    );
  }
}

export default App;
