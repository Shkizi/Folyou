//place for all the portfolios

import React from 'react';
import { Container, Row, Col, Form, Image} from 'react-bootstrap';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";
import ServicesAPI from '../../../../serviceAPI.js';
import '../../../Elements/Notifications/Notifications';
import "./CreateProject.css";
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
  
class CreateProject extends React.Component { 
 
    constructor(props, context) {
        super(props, context);
        this.state = {
            position: "",
            country: "",
            region: "",
            imageLoaded: null,
            imageLoadedName: "",
            sheetDescription:"",
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
    this.handlesheetDescription = this.handlesheetDescription.bind(this);
    this.handleKeywords = this.handleKeywords.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleSubmitSheet = this.handleSubmitSheet.bind(this);
    this.handleImageLoadedName = this.handleImageLoadedName.bind(this);
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

    handlesheetDescription(event) {
        this.setState({ sheetDescription: event.target.value});
    }

    handleKeywords(event) {
        this.setState({ keywords: event.target.value});
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
      
    }
    handleImageLoadedName(event) {
        this.setState({ imageLoaded: event.target.files[0]})
        this.setState({ imageLoadedName: event.target.files[0].name})
        
    }

    handleCategory(event) {
        this.setState({ category: event.value});
    }

 

    handleSubmitSheet(event){
        event.preventDefault();
        let      kwy = [];
      this.state.tags.forEach((value,index,array)=>{
        kwy.push(array[index].text);
      });
      
    const data ={category:this.state.category,
            keywords:kwy,
            sheetDescription:this.state.sheetDescription,
            region:this.state.region,
            country:this.state.country,
            nameProposal:this.state.position,
            image:this.state.imageLoaded,
            imageName:this.state.imageLoadedName,
            idUser: this.props.app.state.userLogged.idUser||null
    }
    console.log(data);
        S.poster(`postCreateSheet`, data, (res) => {  
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
            <form onSubmit={this.handleSubmitSheet}>
            <Container className="CreateProject-Container">
                
            <Row>
                <Col sm={12} style={{textAlign: "center"}}>
                        <div><b><Translate id="create project form"></Translate></b>{}</div>
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                                <Form.Label><Translate id="project name"></Translate></Form.Label>
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
                <Col sm={6}>        
                                <div class="fileUpload btn btn-primary">
                                    <span>Upload</span>
                                    <input id="uploadBtn" type="file" class="upload"  onChange={(event)=>{this.handleImageLoadedName(event)}}   />
                                </div>
                                <input id="uploadFile"  disabled="disabled" value={this.state.imageLoadedName} />

                </Col>
                </Row>
                <Row>
                    <div style={{paddingLeft: "15px", paddingRight: "15px", width: "100%"}}>
                     <Form.Label><Translate id="project description"></Translate></Form.Label>
                    <Form.Control as="textarea" rows="15" maxlength="2000" value={this.state.sheetDescription} onChange={(event)=>{this.handlesheetDescription(event)}}/>
                    </div>
                </Row>
                <Row>
                <Col sm={12}>
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
export default withLocalize(CreateProject);
