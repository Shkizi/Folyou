//place for all the portfolios

import React from 'react';
import CardPortfolio from '../../../Components/Elements/Cards/CardPortfolio/CardPortfolio';
import { Container, Row, Col} from 'react-bootstrap';
import { withLocalize } from "react-localize-redux";
import { WithContext as ReactTags } from 'react-tag-input';
import { Translate } from "react-localize-redux";
import ServicesAPI from '../../../serviceAPI.js';
import Notifications from '../../Elements/Notifications/Notifications';
import { Button} from "reactstrap";
import "./PortfoliosAreaView.css";
var S = new ServicesAPI();

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class PortfoliosAreaView extends React.Component { 
    constructor(props, context) {
        super(props, context);
        this.state = {
            portfolios:[],
            filters:[],
            hasMoreItems: true,
            error:[],

            tags: [
              
           ],
          suggestions: [
              { id: 'Dev', text: 'Dev' },
              { id: 'Germany', text: 'Germany' },
              { id: 'Austria', text: 'Austria' },
              { id: 'Costa Rica', text: 'Costa Rica' },
              { id: 'Sri Lanka', text: 'Sri Lanka' },
              { id: 'Thailand', text: 'Thailand' }
           ] 
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
      }

      handleDelete(i) {
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }

  

      
    

    componentDidMount() {
        S.getter(`getPortfolioById`, { }, (res) => {  
               const portfolios = res.data.portfolioList;
                console.log(res);
                 this.setState({ portfolios: portfolios });
         },
       (error) => { 
        console.log("Error do alexandre", error);
              this.setState({ error: {message:error,error:true} });
        });
        console.log("finish Mounting");
    }
    
  
    render() {
        
        
       
      const { tags, suggestions } = this.state;
       
      return ( 
            <Row style={{margin: 0}}>

                <Col sm={2} className="Header-Sections" style={{marginTop: 0}}>
                {/* BOTAO PARA NOTIFICACOES 
                <Button
                              block
                              color="primary"
                              onClick={() => this.props.app.state.notificationModule.notify("Test","bl",1,200)}></Button> */}

                <div className="Portfolios-Page-Title">
                    <Translate id="projects" ></Translate>
                </div>
                </Col>
                <Col sm={10} className="Header-Sections">
                <ReactTags tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters}
                    placeholder="Keywords" 
                    allowDragDrop="false"
                    />
                </Col>
                <Col sm={12}>
                    <hr className="Hr-Sections"/>
                </Col>
                 <Col sm={12}>
                 { this.state.portfolios.map((portfolio, i) => {
                        console.log(portfolio);
                      return (  
                       
                       
                      <CardPortfolio data={portfolio}/>
                      
                      );
                          
                  })}
                  
                </Col>
            </Row>
    
);} }

export default withLocalize(PortfoliosAreaView);
