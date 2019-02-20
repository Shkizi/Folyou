import React, { Component } from 'react';
import CardProposal from './Components/Elements/Cards/CardProposal/CardProposal'
import CardPortfolio from './Components/Elements/Cards/CardPortfolio/CardsPortfolio'
import './App.css'
import { Container, Row, Col } from 'react-bootstrap';
import Menu from './Components/Menu/Menu';




class App extends Component {
  render() {
    return (
      <div>
          <Menu/>
          <Container style={{padding: 0, margin: 0}}>
            <Row>
            <CardProposal/>
            </Row>
          </Container>
          </div>
    );
  }
}

export default App;
