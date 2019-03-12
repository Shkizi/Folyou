//place for all the portfolios

import React from 'react';
import CardPortfolio from '../../../Components/Elements/Cards/CardPortfolio/CardPortfolio';
import { Container, Row, Col} from 'react-bootstrap';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";
import jsonPortfolio from '../../Elements/Cards/CardPortfolio/CardPortfolioJSON'
import serviceAPI from '../../../serviceAPI';

class PortfoliosAreaView extends React.Component { 
    constructor(props, context) {
        super(props, context);
        this.state = {
            portfolios:[],
            filters:[],
            hasMoreItems: true,
            error:[]
        };
      }
    

    componentDidMount() {
       
        serviceAPI.get(`getPortfoliosWithFilters`, 
        { params: {
              filters: {},
              offset:0,
              limit:20
          }})
      .then(res => {
          if(!res.data.error){
              const portfolios =res.data.portfolios;
              this.setState({portfolios});
              const error=[res.data.error,false];
              this.setState({ error} );
      console.log(res);
      
          }else{
              const error=[res.data.error,true];
              this.setState({ error} );
          }
      }).catch(errore => {
        const error=[errore,true];
        this.setState({ error} );
      });      
    }
    
  
    render() {
        var items = [];
        
        
        this.state.portfolios.map((portfolio, i) => {
            items.push(
               <CardPortfolio data={portfolio}/>
            );
        });
    
       
      return ( 
    <Container fluid={true}>
            <Row style={{margin: 0}}>
                <Col sm={4} className="Header-Sections">
                    <h1><Translate id="portfolios"/></h1>
                </Col>
                <Col sm={8} className="Header-Sections">
                <h1>Filters Here(Country, Region Search, Keyword[Cat] Search, Per page drop )</h1>
                </Col>
                <Col sm={12}>
                    <hr className="Hr-Sections"/>
                </Col>
                 <Col sm={12}>
                 {items}
                  {this.state.error[0]}                 
                </Col>
            </Row>
            
        
    </Container>
);} }

export default withLocalize(PortfoliosAreaView);
