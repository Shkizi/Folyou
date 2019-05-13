//place for all the portfolios

import React from 'react';
import { Container, Row, Col, Form, FormGroup, FormText} from 'react-bootstrap';
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
                gotData:false,
                isIndividual: null
        };

        this.handleRadioTeam = this.handleRadioTeam.bind(this);
        this.handleRadioIndividual = this.handleRadioIndividual.bind(this);
    }


    handleRadioIndividual() {
        this.setState({isIndividual: true});
    }

    handleRadioTeam() {
        this.setState({ isIndividual: false });
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
                <Col sm={12}>
                 <Form>
                    <Form.Group controlId="formBasicChecbox">
                        <Row>
                            <Form.Check  onClick={()=>{this.handleRadioIndividual()}} name="check" type="radio" label="Individual" default/>
                            <Form.Check onClick={()=>{this.handleRadioTeam()}} name="check" type="radio" label="Team"  />
                            
                        </Row>
                    </Form.Group>
                    {(this.state.isIndividual==false)?this.showTeam():this.empty()}
                    <Button variant="primary" type="submit">
                        <Translate id="candidate"></Translate>
                    </Button>
                 </Form>
                </Col>
            </Row>
            </>     
        );
    } 
    empty(){
        return(<></>);
    }
    showTeam(){
        return (
            <Form.Group controlId="numberApplicants">
                <Form.Label><Translate id="Number of Addicional Applicants:"></Translate> </Form.Label>
                 <Form.Control type="number" placeholder="" onChange={()=>{this.changeNumberOfSearches()}}/>
            </Form.Group>
        );
    }
    changeNumberOfSearches(){

    }
}

//CHECKBOX individual or team
//      if checked: textbox : how many
                //n searchers: with all the users 
//text area description
//button candidate
export default withLocalize(ApplicationFormView);
