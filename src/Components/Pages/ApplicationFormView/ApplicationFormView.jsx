//place for all the portfolios

import React from 'react';
import {Redirect} from 'react-router-dom';
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
                service:false,
                users: [],
                numberOfPeople: 1,
                description: '',
                teamPeople: [],
                submited:false
        };

        this.handleRadioTeam = this.handleRadioTeam.bind(this);
        this.handleRadioIndividual = this.handleRadioIndividual.bind(this);
        this.changeNumberOfSearches = this.changeNumberOfSearches.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.updateNumber = this.updateNumber.bind(this);
        this.handleTeamPeople = this.handleTeamPeople.bind(this);

        this.handleSubmitAplication = this.handleSubmitAplication.bind(this)
    }

    updateNumber(event){
        this.setState({numberOfPeople : event.target.value});
        console.log(this.state.numberOfPeople);
        }

    handleRadioIndividual() {
        this.setState({isIndividual: true});
    }

    handleRadioTeam() {
        this.setState({ isIndividual: false });
    }

    handleDescription(event) {
        this.setState({ description: event.target.value})
    }

    handleTeamPeople(event, id) {
       
        let tem = this.state.teamPeople;
        tem[id]= event.value;
        console.log(tem);
        this.setState({ teamPeople: tem});

    }

    handleSubmitAplication(event) {
        event.preventDefault();
        let data= { 
            numberOfPeople: this.state.numberOfPeople, isIndividual: this.state.isIndividual, users: this.state.users,
            teamPeople: this.state.teamPeople, description: this.state.description
        };
        console.log(data);
let item = new FormData();
item.append( "idProposal",this.props.match.params.id);
item.append( "data",data);
item.append( "idUser", this.props.app.state.userLogged.idUser||null);

        S.postter(`postApplication`, item, (res) => {  
            if(!res.error){
                this.props.app.state.notificationModule.notify("Application Received","br",2,15);
                this.setState({submited:true});
            }else{
                this.props.app.state.notificationModule.notify("Application ERROR","br",2,15);
            }
                 
          },
          (error) => { 
              console.log("Error: Application", error);
              this.setState({ error: {message:error,error:true} });
          });
         

    
    }
   

    componentDidMount() {
        S.getter(`getProposalByIdProposal`, {
            idProposal:this.props.match.params.id,
            limit:1
          }, (res) => {  
            const proposals = res.data.proposalList;
            console.log(res);
              this.setState({ proposals: proposals });
                    S.getter(`getUsers`, {
                }, (res) => {  
                    const users = res.data.user;
                    console.log(res.data.user);
                    this.setState({ users: users });
                    this.setState({service:true});
                },
                (error) => { 
                    console.log("Error: users", error);
                    this.setState({ error: {message:error,error:true} });
                });
          },
          (error) => { 
              console.log("Error: Proposal", error);
              this.setState({ error: {message:error,error:true} });
          });

         
    }
    

  
    render() {

        
        return(
            (this.state.service==true)?(this.state.submitted==true)?<Redirect to="/home" />:this.page():this.empty()
        );
    } 
    page(){
        
        return (
            <>
            <form onSubmit={this.handleSubmitAplication}>
            <Container className="Application-Register-Container">
                <Row>
                    <Col sm={6}>
                        <div style={{width: "100%"}}>
                        <Image src={S.baseURL()+"public/anexes/profiles/"+((this.state.proposals[0].avatarUser!="")?this.state.proposals[0].avatarUser:"default_user_pic.jpg")} className="Application-Register-User-Avatar"/><span style={{paddingLeft: "1%"}}>{this.state.proposals[0].nameUser}</span>
                        </div>
                    </Col>
                    <Col sm={6} >
                         <Row style={{float: "right"}}>
                            <Col sm={3}>
                                <Image src={getImageLanguage(this.state.proposals[0].countryProposal)} className="Application-Register-User-Country-Image"/>
                            </Col>
                            <Col sm={9} style={{marginTop: "auto", marginBottom: "auto"}}>
                                <div style={{paddingLeft: "1%"}}>{this.state.proposals[0].regionProposal}</div>
                            </Col>
                        </Row>
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
                        <Col sm={12}>
                            <Col sm={6} style={{paddingLeft: 0}}>
                                <div>{(this.state.isIndividual==false)?this.showTeam():this.empty()}</div>
                            </Col>
                        </Col>
                        </Row>
                        <Row>
                       
                            {(this.state.isIndividual==false)?this.changeNumberOfSearches():this.empty()}
                       
                    </Row>
                    <Form.Label style={{fontWeight: "bold"}}><Translate id="application form motivation text title"></Translate></Form.Label>
                    <Form.Control as="textarea" rows="15" maxlength="2000" value={this.state.description} onChange={this.handleDescription}/>
                 </Form>
                </Col>
            </Row>
            </Container>

            <Container className="Application-Register-Footer-Container">
                <Row style={{float: "right", marginBottom: "2%"}}>
                    <button className="Application-Register-Submit-Button">
                        <Translate id="candidate"></Translate>
                    </button>
                </Row>
                </Container>
            </form>
            </>     
        );
    }
    empty(){
        return(<></>);
    }
    showTeam(){
        return (
            <Form.Group controlId="numberApplicants">
                <Form.Label><Translate id="number of addicional applicants"></Translate> </Form.Label>
                 <Form.Control type="number" min="1" max="10" value={this.state.numberOfPeople} onChange={(event) => {this.updateNumber(event); this.changeNumberOfSearches();}}/>
            </Form.Group>
        );
    }
    changeNumberOfSearches(){
        let userlist=[];
        if(this.state.isIndividual==false){
            console.log(this.state.users);
      
            this.state.users.forEach((value, index, array) => {
                userlist.push({name:array[index].nameUser,value:array[index].idUser,photo:S.baseURL() + "public/anexes/profiles/"+((array[index].fileName!="")?array[index].fileName:"default_user_pic.jpg")});
            })  
            }
            console.log(userlist);
            const userListConstant = userlist;
        let arrayOfMembers = []
         for(let i = 0; i < this.state.numberOfPeople; i++) {
            function renderFriend(option) {
                const imgStyle = {
                    borderRadius: '50%',
                    verticalAlign: 'middle',
                    marginRight: 10,
                };
            
                return (<span><img alt="" style={imgStyle} width="40" height="40" src={option.photo} /><span>{option.name}</span></span>);
            }
            arrayOfMembers.push (
                <Col sm={6}>
                    <div>
                        <SelectSearch renderOption={renderFriend}  options={userListConstant} value={this.state.teamPeople[i]} name="country" onChange={(event)=>{this.handleTeamPeople(event,i)}}/>
                    </div>
                </Col>
            )
        } 
        return arrayOfMembers
    }
}


//CHECKBOX individual or team
//      if checked: textbox : how many
                //n searchers: with all the users 
//text area description
//button candidate
export default withLocalize(ApplicationFormView);
