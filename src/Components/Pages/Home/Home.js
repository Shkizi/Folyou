import React from 'react'
import CardProposal from '../../../Components/Elements/Cards/CardProposal/CardProposal'
import CardPortfolio from '../../Elements/Cards/CardPortfolio/CardPortfolio'
import { Container, Row, Col} from 'react-bootstrap';
import { withLocalize } from "react-localize-redux";
import CardTalent from '../../Elements/Cards/CardTalent/CardTalent';
import jsonPortfolio from '../../Elements/Cards/CardPortfolio/CardPortfolioJSON'
import jsonProposal from '../../Elements/Cards/CardProposal/CardProposalJSON'
import jsonTalent from '../../Elements/Cards/CardTalent/CardTalentJSON'


class Home extends React.Component { 

  componentDidMount() {



  }
  render() {
    return ( 
        <Container fluid={true}>

                    <Row style={{margin: 0}}>
                    <Col sm={12} style={{}}>
                    <h1>Trending</h1>
                    </Col>
                    <Col sm={12}>
                    <Row>
                      {jsonPortfolio.map(val =>{return(
                        <CardPortfolio data={val} />
                      );})}
                      {jsonTalent.map(val =>{return(
                        <CardTalent data={val} />
                      );})}
                      </Row>
                      </Col>
                    </Row>
              
        </Container>
 );} }

export default withLocalize(Home);
