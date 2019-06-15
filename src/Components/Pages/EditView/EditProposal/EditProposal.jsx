//place for all the portfolios

import React from 'react';
import { Container, Row, Col, Form, Image} from 'react-bootstrap';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";
import ServicesAPI from '../../../../serviceAPI.js';
import { WithContext as ReactTags } from 'react-tag-input';
import '../../../Elements/Notifications/Notifications';
import "./EditProposal.css";
import { throws } from 'assert';
import SelectSearch from 'react-select-search'

import getImageLanguage from "../../../../Resources/Translations/compilerLanguageImages.js";
var countryJson = require("../../../../Resources/Translations/countries.json");
var S = new ServicesAPI();
const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  
  const delimiters = [KeyCodes.comma, KeyCodes.enter];
  
class EditProposal extends React.Component { 
 
    constructor(props, context) {
        super(props, context);
        this.state = {
            position: "",
            country: "",
            region: "",
            proposalDescription:"",
            keywords: [],
            category: [],
            categories:[],
            tags: [],
            suggestions: [],
            service:false,
                };
                this.handleDelete = this.handleDelete.bind(this);
                this.handleAddition = this.handleAddition.bind(this);
               
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
        
       this.setState({ country: event.value});
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
        this.setState({ category: event.value});
    }
    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        });
        console.log(this.state.tags);
       
    }

    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
        console.log(this.state.tags);
    }
    handleSubmitProposal(event){
        event.preventDefault();
        let      kwy = [];
      this.state.tags.forEach((value,index,array)=>{
        kwy.push(array[index].text);
      });
        let data = new FormData();
        const item ={category:this.state.category,
            keywords:kwy,
            proposalDescription:this.state.proposalDescription,
            region:this.state.region,
            country:this.state.country,
            nameProposal:this.state.position,
        idUser: this.props.app.state.userLogged.idUser||null
    }
    for ( var key in item ) {
        data.append(key, item[key]);
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
        const { tags, suggestions } = this.state;
     
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
            <form onSubmit={this.handleSubmitProposal}>
            <Container className="CreateProposal-Container">
                
            <Row>
                <Col sm={12} style={{textAlign: "center"}}>
                        <div><b><Translate id="create proposal title"></Translate></b>{}</div>
                </Col>
            </Row>
            <Row>
                <Col sm={12} style={{marginBottom: "2%"}}>
                                <Form.Label><Translate id="proposalName"></Translate></Form.Label>
                                <Form.Control type="text" value={this.state.position} onChange={(event)=>{this.handlePosition(event)}} />
                </Col>
                </Row>
                <Row>
                <Col sm={6}>
                                <Form.Label><Translate id="country"></Translate></Form.Label>
                                <SelectSearch renderOption={renderFriend} options={countries} value={this.state.country} name="country" onChange={(event)=>{this.handleCountry(event)}} style={{height: "36px"}} />
                                
                </Col>
                <Col sm={6}>
                                <Form.Label><Translate id="region"></Translate></Form.Label>
                                <Form.Control type="text" value={this.state.region} onChange={(event)=>{this.handleRegion(event)}} />
                </Col>
            </Row>
            <Row  style={{marginBottom: "2%"}}>
                    <div style={{paddingLeft: "15px", paddingRight: "15px", width: "100%"}}>
                     <Form.Label><Translate id="proposal description"></Translate></Form.Label>
                    <Form.Control as="textarea" rows="15" maxlength="2000" value={this.state.proposalDescription} onChange={(event)=>{this.handleProposalDescription(event)}}/>
                    </div>
            </Row>
            <Row> 
                <Col sm={12}  style={{marginBottom: "2%"}}>
                                <Form.Label><Translate id="keywords"></Translate></Form.Label>
                                <ReactTags tags={tags}
                    
                    inputFieldPosition="top"
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters}
                    placeholder="Keywords" 
                    allowDragDrop={false}
                    
                    />
                </Col>
                <Col sm={12}  style={{marginBottom: "2%"}}>
                                <Form.Label><Translate id="categories"></Translate></Form.Label>
                                  <SelectSearch options={categ} value={this.state.category} name="category" onChange={(event)=>{this.handleCategory(event)}} style={{height: "36px"}} />
                                
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
export default withLocalize(EditProposal);
