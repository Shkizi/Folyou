//place for all the portfolios

import React from 'react';
import { Container, Row, Col, Form, Image} from 'react-bootstrap';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";
import ServicesAPI from '../../../../serviceAPI.js';
import '../../../Elements/Notifications/Notifications';
import "./CreateProposal.css";
import { throws } from 'assert';

var S = new ServicesAPI();

class CreateProposal extends React.Component { 
 
    constructor(props, context) {
        super(props, context);
        this.state = {
            position: "",
            country: "",
            region: "",
            proposalDescription:"",
            keywords: [],
            category: []
                };
    
    this.handleRegion = this.handleRegion.bind(this);
    this.handleCountry = this.handleCountry.bind(this);
    this.handlePosition = this.handlePosition.bind(this);
    this.handleProposalDescription = this.handleProposalDescription.bind(this);
    this.handleKeywords = this.handleKeywords.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleSubmitProposal = this.handleSubmitProposal.bind(this);
    }

    handlePosition(event) {
        this.setState({ position: event.target.value});
    }

    handleCountry(event) {
        this.setState({ country: event.target.value});
    }

    handleRegion(event) {
        this.setState({ region: event.target.value});
    }

    handleProposalDescription(event) {
        this.setState({ proposalDescription: event.target.value});
    }

    handleKeywords(event) {
        this.setState({ keywords: event.target.value});
    }

    handleCategory(event) {
        this.setState({ category: event.target.value});
    }

    handleSubmitProposal(event){
        event.preventDefault();
       
        const data ={category:this.state.category,
            keywords:this.state.keywords,
            proposalDescription:this.state.proposalDescription,
            region:this.state.region,
            country:this.state.country,
            position:this.state.position,
        idUser: this.props.app.state.userLogged.idUser||null
    }
    console.log(data);
    }

    render() {

        return (
            <>
            <form onSubmit={this.handleSubmitProposal}>
            <Container className="CreateProposal-Container">
                
            <Row>
                <Col sm={12} style={{textAlign: "center"}}>
                        <div><b><Translate id="create proposal title"></Translate></b>{}</div>
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                                <Form.Label><Translate id="proposalName"></Translate></Form.Label>
                                <Form.Control type="text" value={this.state.position} onChange={(event)=>{this.handlePosition(event)}} />
                </Col>
                </Row>
                <Row>
                <Col sm={6}>
                                <Form.Label><Translate id="country"></Translate></Form.Label>
                                <Form.Control type="text" value={this.state.country} onChange={(event)=>{this.handleCountry(event)}} />
                </Col>
                <Col sm={6}>
                                <Form.Label><Translate id="region"></Translate></Form.Label>
                                <Form.Control type="text" value={this.state.region} onChange={(event)=>{this.handleRegion(event)}} />
                </Col>
                </Row>
                <Row>
                    <div style={{paddingLeft: "15px", paddingRight: "15px", width: "100%"}}>
                     <Form.Label><Translate id="proposal description"></Translate></Form.Label>
                    <Form.Control as="textarea" rows="15" maxlength="2000" value={this.state.proposalDescription} onChange={(event)=>{this.handleProposalDescription(event)}}/>
                    </div>
                </Row>
                <Row>
                <Col sm={12}>
                                <Form.Label><Translate id="keywords"></Translate></Form.Label>
                                <Form.Control type="text" value={this.state.keywords} onChange={(event)=>{this.handleKeywords(event)}} />
                </Col>
                <Col sm={12}>
                                <Form.Label><Translate id="categories"></Translate></Form.Label>
                                <Form.Control type="text" value={this.state.category} onChange={(event)=>{this.handleCategory(event)}} />
                </Col>
                </Row>

            </Container>

            <Container className="Application-Register-Footer-Container">
                <Row style={{float: "right", marginBottom: "2%"}}>
                    <button className="Create-Proposal-Submit-Button">
                        <Translate id="publish"></Translate>
                    </button>
                </Row>
                </Container>
            </form>
            </>     
        );
    
    }
}



//CHECKBOX individual or team
//      if checked: textbox : how many
                //n searchers: with all the users 
//text area description
//button candidate
export default withLocalize(CreateProposal);
