//place for all the portfolios

import React from 'react';
import CardPortfolio from '../../../Components/Elements/Cards/CardPortfolio/CardPortfolio';
import { Container, Row, Col} from 'react-bootstrap';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";
import jsonPortfolio from '../../Elements/Cards/CardPortfolio/CardPortfolioJSON'


var data;
class PortfoliosAreaView extends React.Component { 
    constructor(props, context) {
        super(props, context);
    
        
        this.state = {
          portfolio:[]
        };
      }
    componentDidMount() {
  //axios
  
  
    }
    render() {
      return ( 
    <Container fluid={true}>
        

 {/* TRENDING SECTION */}

            <Row style={{margin: 0}}>
                <Col sm={12} className="Header-Sections">
                    <h1><Translate id="Portfolio"/></h1>
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
            
        
    </Container>
);} }

export default withLocalize(PortfoliosAreaView);
