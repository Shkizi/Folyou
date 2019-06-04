//place for all the portfolios

import React from 'react';
import CardProposal from '../../../Components/Elements/Cards/CardProposal/CardProposal';
import { Container, Row, Col} from 'react-bootstrap';
import { withLocalize } from "react-localize-redux";
import { WithContext as ReactTags } from 'react-tag-input';
import { Translate } from "react-localize-redux";
import ServicesAPI from '../../../serviceAPI.js';
import Notifications from '../../searchboxstyle.css';
import { Button} from "reactstrap";
import '../../Elements/Notifications/Notifications';
import "./ProposalsAreaView.css";
import CardsModalProposal from '../../Elements/CardsModal/Types/CardsModalProposal/CardsModalProposal.jsx'
import getImageLanguage from "../../../Resources/Translations/compilerLanguageImages.js";
import SelectSearch from 'react-select-search'
var S = new ServicesAPI();
var countryJson = require("../../../Resources/Translations/countries.json");
const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class ProposalsAreaView extends React.Component { 
    constructor(props, context) {
        super(props, context);
        this.state = {
          portfolios:[],
          talents:[],
          proposals:[],
          portTrending:[],
          propTrending:[],
          showModalPortfolio: false,
          showModalTalent: false,
          showModalProposal: false,
          typeModal: null,
          liveKeywords: [],
          idModal: null,
            filters:[],
                    hasMoreItems: true,
                    error:[],

                    tags: [
                    
                ],
                suggestions: [
                ],
                countries:[]
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalShow = this.handleModalShow.bind(this);
        
        this.handleCountry = this.handleCountry.bind(this);
      }
      handleModalClose() {
        this.setState({showModalPortfolio: false});
        this.setState({showModalTalent: false});
        this.setState({showModalProposal: false});
        console.log(this.state);
      }
      handleCountry(event) {
        
        this.setState({ country: event.value},this.redoService);
     }
      handleModalShow(type, id) {

        S.putter(`putClicks`, {
          idUser:this.props.app.state.userLogged.idUser||null,
          idClicked:id,
          type:type
        }, (res) => { },
      (error) => { console.log(error);});
      
        this.setState({ typeModal: type, idModal: id });
        this.setState({showModalPortfolio: type=="portfolioSheet"});
        this.setState({showModalTalent: type=="talentSheet"});
        this.setState({showModalProposal: type=="proposalSheet"});
        console.log(type, id , this.state);
      }

      handleDelete(i) {
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        },this.redoService);
        console.log(this.state.tags);
       
    }

    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }),this.redoService);
      
    }

    handleLiveKeywords(event) {
     // this.setState({liveKeywords:  });
     console.log(event)
    }
    redoService(){
      let      kwy = [];
      this.state.tags.forEach((value,index,array)=>{
        kwy.push(array[index].text);
      });
      console.log(this.state.country,kwy);
        S.getter(`getProposalById`, { keywords: kwy, country:this.state.country }, (res) => {  
          const portfolios = res.data.proposalList;
          console.log(res);
            this.setState({ proposals: portfolios });
        },
        (error) => { 
        console.log("Error do Proposal", error);
              this.setState({ error: {message:error,error:true} });
        });
    }
    
    componentDidMount() {
        
        S.getter(`getProposalById`, { }, (res) => {  
               const portfolios = res.data.proposalList;
                console.log(res);
                 this.setState({ proposals: portfolios });
         },
       (error) => { 
        console.log("Error do Portfolio", error);
              this.setState({ error: {message:error,error:true} });
        });
        S.getter(`getKeywords`, {type:"all" }, (res) => {  
            const keywords = res.data.keywords;
             
             let suggest=[];
             keywords.forEach(element => {
                suggest.push({ id: element, text: element });
             });
             console.log(suggest);
              this.setState({ suggestions: suggest });
      },
    (error) => { 
     console.log("Error do Keywords", error);
           this.setState({ error: {message:error,error:true} });
     });
     console.log("finish Mounting");
        
    }
    
  
    render() {
        function renderFriend(option) {
            const imgStyle = {
                borderRadius: '50%',
                verticalAlign: 'middle',
                marginRight: 10,
            };
        
            return (<span><img alt="" style={imgStyle} width="40" height="40" src={option.photo} /><span>{option.name}</span></span>);
        } 
      const { tags, suggestions } = this.state;
      let countries=[];
      countries.push({name:"Select...",value:""});
      for (var index in countryJson) {
          countries.push({name:countryJson[index],value:index,photo:getImageLanguage(index.toLowerCase())});
      }
      console.log(countries);
      return (
          <>
            <Row style={{margin: 0}}>

                <Col sm={2} className="Header-Sections" style={{marginTop: 0}}>
               
                <div className="Portfolios-Page-Title">
                    <Translate id="proposals" ></Translate>
                </div>
                </Col>
                <Col sm={5} className="Header-Sections">
                <ReactTags tags={tags}
                    
                    inputFieldPosition="top"
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters}
                    placeholder="Keywords" 
                    allowDragDrop={false}
                    handleInputChange={this.handleLiveKeywords}
                    />
                    
                    </Col><Col sm={5} className="Header-Sections">
                    <SelectSearch renderOption={renderFriend} options={countries} value={this.state.country} name="country" onChange={(event)=>{this.handleCountry(event)}} style={{height: "36px"}} />
                </Col>
                <Col sm={12}>
                    <hr className="Hr-Sections"/>
                </Col>
                 
                 { this.state.proposals.map((portfolio, i) => {
                      return (  
                      <CardProposal data={portfolio} parent={this}/>
                      );
                  })}                  
                
            </Row>
    <CardsModalProposal parent={this} closer={this.handleModalClose}/>
         </>     
);} }

export default withLocalize(ProposalsAreaView);
