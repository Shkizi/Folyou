//place for all the portfolios

import React from 'react';
import { Container, Row, Col, Form, Image} from 'react-bootstrap';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";
import ServicesAPI from '../../../../serviceAPI.js';
import '../../../Elements/Notifications/Notifications';
import "./EditTalent.css";
import { throws } from 'assert';
import SelectSearch from 'react-select-search'
import { WithContext as ReactTags } from 'react-tag-input';
import getImageLanguage from "../../../../Resources/Translations/compilerLanguageImages.js";
var countryJson = require("../../../../Resources/Translations/countries.json");
var S = new ServicesAPI();
const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  
  const delimiters = [KeyCodes.comma, KeyCodes.enter];
  
class EditTalent extends React.Component { 
 
    constructor(props, context) {
        super(props, context);
        this.state = {
            talentName: "",
            talentDescription:"",
            keywords: [],
            category: [],
            categories:[],
            tags: [],
            suggestions: [],
            service:false,
                };
                this.handleDelete = this.handleDelete.bind(this);
                this.handleAddition = this.handleAddition.bind(this);
    
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
    handleSubmitTalent(event){
        event.preventDefault();
        let      kwy = [];
        this.state.tags.forEach((value,index,array)=>{
          kwy.push(array[index].text);
        });
        let data = new FormData();
        const item ={category:this.state.category,
            keywords:kwy,
            talentDescription:this.state.talentDescription,
            talentName:this.state.talentName,
        idUser: this.props.app.state.userLogged.idUser||null,
        idTalentArea:this.props.match.params.id
    }
    for ( var key in item ) {
        data.append(key, item[key]);
     }
    console.log(data);
        S.postter(`postUpdateTalent`, data, (res) => {  
            this.props.app.state.notificationModule.notify("UPDATE SUCCESS","br",2,2);
            
    
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
            S.getter(`getTalentById`, { idTalentArea: this.props.match.params.id
            }, (res) => {  
            const talent = res.data.talentList[0];
            console.log("RES: getTalentById: ", talent);
            talent.keywords.forEach((value)=> {this.handleAddition({id:value,text:value})});
            this.setState({ talentName: talent.nameTalentArea});
            this.setState({ category: talent.Category_idCategory});
            this.setState({ talentDescription: talent.descriptionTalentArea});
            
            
           this.setState({ service:true});
        },
        (error) => { 
            console.log("Error: Sheet", error);
            this.setState({ error: {message:error,error:true} });
            
        });
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
            <form onSubmit={this.handleSubmitTalent}>
            <Container className="CreateTalent-Container">
                
            <Row>
                <Col sm={12} style={{textAlign: "center"}}>
                        <div><b><Translate id="edit talent"></Translate></b>{}</div>
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
export default withLocalize(EditTalent);
