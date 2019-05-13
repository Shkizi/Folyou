//place for all the portfolios

import React from 'react';
import { Container, Row, Col, Form, Image} from 'react-bootstrap';
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
import { throws } from 'assert';
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
                isIndividual: null,
                service:false
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
        S.getter(`getProposalByIdProposal`, {
            idProposal:this.props.match.params.id,
            limit:1
          }, (res) => {  
            const proposals = res.data.proposalList;
            console.log(res);
              this.setState({ proposals: proposals });
              this.setState({service:true});
          },
          (error) => { 
              console.log("Error: Proposal", error);
              this.setState({ error: {message:error,error:true} });
          });
     console.log("finish Mounting");    
    }
    

  
    render() {
        
        return(
            (this.state.service==true)?this.page():this.empty()
        );
    } 
    page(){
        return (
            <>
            <Container className="Application-Register-Container">
                <Row>
                    <Col sm={12}>
                        <div style={{float: "left"}}>
                        <Image src={this.state.proposals[0].dat} className="Application-Register-User-Avatar"/><span style={{paddingLeft: "1%"}}>{this.state.proposals[0].avatarUser}</span>
                        </div>
                        <div style={{float: "right"}}>
                        <Image src={this.state.proposals[0].dat} className="Application-Register-User-Avatar"/><span style={{paddingLeft: "1%"}}>{this.state.proposals[0].regionProposal}</span>
                        </div>
                    </Col>
                </Row>
            <Row>
                <Col sm={12} style={{textAlign: "center"}}>
                        <div className="Application-Register-Proposal-Title">{this.state.proposals[0].nameProposal}</div>
                        <div className="Application-Register-Proposal-Keywords"><b><Translate id="keywords"></Translate></b>{this.state.proposals[0].keywords}</div>

                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                        <div className="Application-Register-Proposal-Description">{this.state.proposals[0].descriptionProposal}</div>
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                 <Form>
                    <Form.Group controlId="formBasicChecbox">
                        <Row style={{paddingLeft: "15px", paddingTop: "2%", fontWeight: "bold"}}>
                            <Translate id="application form motivation do"></Translate>
                        </Row>
                        <Row style={{paddingLeft: "15px", paddingTop: "2%"}}>
                            <Form.Check  onClick={()=>{this.handleRadioIndividual()}} name="check" type="radio" label="Individual" default/>
                            <Form.Check style={{paddingLeft: "4%"}} onClick={()=>{this.handleRadioTeam()}} name="check" type="radio" label="Team"  />
                        </Row>
                    </Form.Group>
                    <Row>
                      <div>{(this.state.isIndividual==false)?this.showTeam():this.empty()}</div>
                    </Row>
                    <Form.Label style={{fontWeight: "bold"}}><Translate id="application form motivation text title"></Translate></Form.Label>
                    <Form.Control as="textarea" rows="15" maxlength="2000"/>
                 </Form>
                </Col>
            </Row>
            </Container>

            <Container className="Application-Register-Footer-Container">
                <Row style={{float: "right", marginBottom: "2%"}}>
                    <Button className="Application-Register-Submit-Button">
                        <Translate id="candidate"></Translate>
                    </Button>
                </Row>
            </Container>
            </>     
        );
    }
    empty(){
        return(<></>);
    }
    showTeam(){
        return (
            <Form.Group controlId="numberApplicants" style={{paddingLeft: "15px"}}>
                <Form.Label><Translate id="number of addicional applicants"></Translate> </Form.Label>
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
