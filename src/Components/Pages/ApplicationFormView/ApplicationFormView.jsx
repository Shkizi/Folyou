//place for all the portfolios

import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import { withLocalize } from "react-localize-redux";
import { WithContext as ReactTags } from 'react-tag-input';
import { Translate } from "react-localize-redux";
import ServicesAPI from '../../../serviceAPI.js';
import Notifications from '../../searchboxstyle.css';
import { Button} from "reactstrap";
import '../../Elements/Notifications/Notifications';
import "./ApplicationFormView.css";
import CardsModalPortfolio from '../../Elements/CardsModal/Types/CardsModalPorfolio/CardsModalPortfolio.jsx'
import getImageLanguage from "../../../Resources/Translations/compilerLanguageImages.js";
import SelectSearch from 'react-select-search'
var S = new ServicesAPI();
var countryJson = require("../../../Resources/Translations/countries.json");

class ApplicationFormView extends React.Component { 
    constructor(props, context) {
        super(props, context);
        this.state = {
                    portfolios:[],
                    filters:[],
                    hasMoreItems: true,
                    error:[],
                    tags: [],
                suggestions: [],
                countries:[],
                gotData:false
        };
        
    }
    componentDidMount() {
        S.getter(`getProposalById`, {
            idProposal:this.props.match.params.id,
          }, (res) => {  
            const proposals = res.data.proposalList;
            console.log(res);
              this.setState({ proposals: proposals });
          },
          (error) => { 
              console.log("Error: Proposal", error);
              this.setState({ error: {message:error,error:true} });
          });
     console.log("finish Mounting");    
    }
    
  
    render() {
        return (
            <>
            <Row>
                <Col sm={1}>
                
                </Col>
                <Col sm={11}>

                </Col>
            </Row>
            <Row>
                <Col sm={1}>
                
                </Col>
                <Col sm={11}>

                </Col>
            </Row>
            </>     
);} }

//CHECKBOX individual or team
//      if checked: textbox : how many
                //n searchers: with all the users 
//text area description
//button candidate
export default withLocalize(ApplicationFormView);
