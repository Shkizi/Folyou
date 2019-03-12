//place for all the portfolios

import React from 'react';
import CardPortfolio from '../../../Components/Elements/Cards/CardPortfolio/CardPortfolio';
import { Container, Row, Col} from 'react-bootstrap';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";
import jsonPortfolio from '../../Elements/Cards/CardPortfolio/CardPortfolioJSON'
import ServicesAPI from '../../../serviceAPI.js';
import Notifications from '../../Elements/Notifications/Notifications';
import { Button} from "reactstrap";
var S = new ServicesAPI();

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
       
       
       S.getter("getPortfoliosWithFilters",{filters:this.state.filters},
          (res)=>{ 
          if(!res.data.error){
              const portfolios =res.data.portfolios;
              this.setState({portfolios});
              const error=[res.data.error,false];
              this.setState({ error} );
      console.log(res);
      
          }else{
              const error=[res.data.error,true];
              this.setState({ error} );
          }},(err)=>{
            const error=[err,true];
            this.setState({ error} );
            console.log(error);

          });
         
          
    }
    
  
    render() {
        
        
       
    
       
      return ( 
            <Row style={{margin: 0}}>

                <Col sm={4} className="Header-Sections">
                <Button
                              block
                              color="primary"
                              onClick={() => this.props.app.state.notificationModule.notify("Test","bl",1,200)}></Button>
>
                    <h1><Translate id="portfolios"/></h1>
                </Col>
                <Col sm={8} className="Header-Sections">
                <h1>Filters Here(Country, Region Search, Keyword[Cat] Search, Per page drop )</h1>
                </Col>
                <Col sm={12}>
                    <hr className="Hr-Sections"/>
                </Col>
                 <Col sm={12}>
                 { /*this.state.portfolios.map((portfolio, i) => {
           
                      return (  <CardPortfolio data={portfolio}/>);
       
                  })*/}
                  
                </Col>
            </Row>
    
);} }

export default withLocalize(PortfoliosAreaView);
