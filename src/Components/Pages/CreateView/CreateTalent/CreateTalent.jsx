//place for all the portfolios

import React from 'react';
import { Container, Row, Col, Form, Image} from 'react-bootstrap';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";
import ServicesAPI from '../../../../serviceAPI.js';
import '../../../Elements/Notifications/Notifications';
import "./CreateTalent.css";
import { throws } from 'assert';
import SelectSearch from 'react-select-search'

import getImageLanguage from "../../../../Resources/Translations/compilerLanguageImages.js";
var countryJson = require("../../../../Resources/Translations/countries.json");
var S = new ServicesAPI();

class CreateTalent extends React.Component { 
 
    constructor(props, context) {
        super(props, context);
        this.state = {
            talentName: "",
            talentDescription:"",
            keywords: [],
            category: [],
            categories:[],
            service:false,
                };
    
    this.handleTalentName = this.handleTalentName.bind(this);
    this.handleTalentDescription = this.handleTalentDescription.bind(this);
    this.handleKeywords = this.handleKeywords.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleSubmitTalent = this.handleSubmitTalent.bind(this);
    }

    handleTalentName(event) {
        this.setState({ talentName: event.target.value});
    }

    handleTalentDescription(event) {
        this.setState({ talentDescription: event.target.value});
    }

    handleKeywords(event) {
        this.setState({ keywords: event.target.value});
    }

    handleCategory(event) {
        this.setState({ category: event.value});
    }

    handleSubmitTalent(event){
        event.preventDefault();
        
        const data ={category:this.state.category,
            keywords:[this.state.keywords],
            talentDescription:this.state.talentDescription,
            talentName:this.state.talentName,
        idUser: this.props.app.state.userLogged.idUser||null
    }
    console.log(data);
        S.postter(`postCreateProposal`, data, (res) => {  
            this.props.app.state.notificationModule.notify("CREATION SUCCESS","br",2,2);
            
    
        },
        (error) => { 
            console.log("Error: User", error);
            this.setState({ error: {message:error,error:true} });
        });
    }
componentDidMount(){
   // categories
        S.getter(`getCategories`, {
            }, (res) => {  
            const categories = res.data.categories;
            console.log(res.data.categories);
            this.setState({ categories: categories });
            this.setState({service:true});
        },
        (error) => { 
            console.log("Error: categories", error);
            this.setState({ error: {message:error,error:true} });
        });
}
    render() {
        return((this.state.service==true)?this.page():this.empty());
    }
    empty(){
        return(<></>);
    }
    page(){
        function renderFriend(option) {
            const imgStyle = {
                borderRadius: '50%',
                verticalAlign: 'middle',
                marginRight: 10,
            };
        
            return (<span><img alt="" style={imgStyle} width="40" height="40" src={option.photo} /><span>{option.name}</span></span>);
        } 
            let countries=[];
            let categ=[];
            for (var index in countryJson) {
                countries.push({name:countryJson[index],value:index,photo:getImageLanguage(index.toLowerCase())});
            }
            for (var index in this.state.categories) {
                categ.push({name:this.state.categories[index].valueCategory,value:this.state.categories[index].idCategory});
            }
            console.log(countries);
            console.log(categ);
        return (
            <>
            <form onSubmit={this.handleSubmitTalent}>
            <Container className="CreateTalent-Container">
                
            <Row>
                <Col sm={12} style={{textAlign: "center"}}>
                        <div><b><Translate id="create talent title"></Translate></b>{}</div>
                </Col>
            </Row>
            <Row style={{marginBottom: "2%"}}>
                <Col sm={12}>
                                <Form.Label><Translate id="talent name"></Translate></Form.Label>
                                <Form.Control type="text" value={this.state.talentName} onChange={(event)=>{this.handleTalentName(event)}} />
                </Col>
                </Row>

                <Row style={{marginBottom: "2%"}}>
                    <div style={{paddingLeft: "15px", paddingRight: "15px", width: "100%"}}>
                     <Form.Label><Translate id="talent description"></Translate></Form.Label>
                    <Form.Control as="textarea" rows="15" maxlength="2000" value={this.state.talentDescription} onChange={(event)=>{this.handleTalentDescription(event)}}/>
                    </div>
                </Row>
                <Row>
                <Col sm={12} style={{marginBottom: "2%"}}>
                                <Form.Label><Translate id="keywords"></Translate></Form.Label>
                                <Form.Control type="text" value={this.state.keywords} onChange={(event)=>{this.handleKeywords(event)}} />
                </Col>
                <Col sm={12}>
                                <Form.Label><Translate id="categories"></Translate></Form.Label>
                                  <SelectSearch options={categ} value={this.state.category} name="category" onChange={(event)=>{this.handleCategory(event)}} style={{height: "36px"}} />
                                
                </Col>
                </Row>

            </Container>

            <Container className="Application-Register-Footer-Container">
                <Row style={{float: "right", marginBottom: "2%"}}>
                    <button className="Create-Talent-Submit-Button">
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
export default withLocalize(CreateTalent);
