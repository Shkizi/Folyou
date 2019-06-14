import React from 'react'
import CardProposal from '../../../Components/Elements/Cards/CardProposal/CardProposal'
import CardPortfolio from '../../Elements/Cards/CardPortfolio/CardPortfolio'
import CardTalent from '../../Elements/Cards/CardTalent/CardTalent'
import { Card, Image, Row, Button, Col, Table } from 'react-bootstrap';
import { withLocalize, Translate } from "react-localize-redux";
import getImageLanguage from "../../../Resources/Translations/compilerLanguageImages.js"
import CardsModalProposal from '../../Elements/CardsModal/Types/CardsModalProposal/CardsModalProposal';
import CardsModalTalent from '../../Elements/CardsModal/Types/CardsModalTalent/CardsModalTalent';
import CardsModalPortfolio from '../../Elements/CardsModal/Types/CardsModalPorfolio/CardsModalPortfolio.jsx'
import MessageModal from '../../Elements/CardsModal/Types/MessageModal/MessageModal'

import { FiFilePlus } from "react-icons/fi";
import ReactTooltip from 'react-tooltip'
import './Profile.css'
import { Link } from "react-router-dom";
import ServicesAPI from '../../../serviceAPI.js';
import { MdAdd } from "react-icons/md";
import { MdCheck } from "react-icons/md";
import { FiMail } from "react-icons/fi";






import Recommended from '../../../Resources/Images/Recommended.png'
import clickToRecommend from '../../../Resources/Images/Recommend.png'


var S = new ServicesAPI();




class ProfileView extends React.Component {
    constructor(props, context) {
        super(props, context);
       
        this.state =  {
        user: {},
        error:{},
        recommendNumber:0,
        showRender:false,
        pageContent: 'Projects',
        portfolios:[],
        talents:[],
        proposals:[],
        portTrending:[],
        propTrending:[],
        dashboardTable:[],
        showModalPortfolio: false,
        showModalTalent: false,
        showModalProposal: false,
        showModalMessage: false,
        typeModal: null,
        idModal: null,
        recommendBadge: Recommended,
        recomendedUser: false,
    };
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleModalShow = this.handleModalShow.bind(this);

    this.handleRecommendUserClick = this.handleRecommendUserClick.bind(this);
    this.pageContentDashboard = this.pageContentDashboard.bind(this);
    this.pageContentProjects= this.pageContentProjects.bind(this);
    this.pageContentProposals= this.pageContentProposals.bind(this);
    this.pageContentTalents= this.pageContentTalents.bind(this);
    this.pageContentSettings= this.pageContentSettings.bind(this);
    
  }
      handleModalClose() {
        this.setState({showModalPortfolio: false});
        this.setState({showModalTalent: false});
        this.setState({showModalProposal: false});
        this.setState({showModalMessage: false});
        this.setState({UserMessage:false});
       
        console.log(this.state);
      }
      redoRecommend(){
        S.getter(`getRecomendNumberByIdUser`, {
            idUser:this.props.match.params.id, 
            
          }, (res) => { 
              console.log("RES RECOMMEND:",res);
              this.setState({recommendNumber:res.data.number});
          },  (error) => { 
            console.log("Error: Number Recommend", error);
            this.setState({ error: {message:error,error:true} });
        });  
      }
      handleRecommendUserClick() {
        const data = new FormData();
        let item = {idUser:this.props.match.params.id, idUser1:this.props.app.state.userLogged.idUser||null}
        for ( var key in item ) {
            data.append(key, item[key]);
         }
        if(this.state.recomendedUser == false){
            
            S.postter("postRecomend",data,(res)=>{
                this.setState({recomendedUser: true});
                this.redoRecommend();
            },  (error) => { 
                console.log("Error: Number Recommend", error);
                this.setState({ error: {message:error,error:true} });
            });  
        
        
    }
        else {
            S.postter("postDelRecomend",data,(res)=>{
                this.setState({recomendedUser: false});
                this.redoRecommend();
            },  (error) => { 
                console.log("Error: Number Recommend", error);
                this.setState({ error: {message:error,error:true} });
            });  
        }
      }
    
      handleModalShow(type, id,usermes) {
        const data = new FormData();
        data.append("idUser",this.props.app.state.userLogged.idUser||null);
        data.append("idClicked",id);
        data.append("type",type);
        
    if( type!="messageModal")
        S.postter(`postClicks`, data, (res) => { },
        (error) => { console.log(error);});
        
        this.setState({ typeModal: type, idModal: id });
        this.setState({showModalPortfolio: type=="portfolioSheet"});
        this.setState({showModalTalent: type=="talentSheet"});
        this.setState({showModalProposal: type=="proposalSheet"});
        this.setState({showModalMessage: type=="messageModal"});
        this.setState({UserMessage:usermes});
        console.log(type, id , this.state);
      }
    //request example
    componentWillReceiveProps(nextProps){
        this.setState({ showRender:false });
        
        S.getter(`getRecomendBoolFromIds`, {idUser:this.props.match.params.id, idUser1:this.props.app.state.userLogged.idUser||null}, (res) => { 
            console.log("RES RECOMMEND:",res);
            this.setState({recomendedUser:res.data.answer==true});
                 
        S.getter(`getPortfolioByIdUser`, {
            idUser:this.props.match.params.id, 
            limit:3000,
          }, (res) => {  
            const portfolios = res.data.portfolioList;
            console.log(res);
              this.setState({ portfolios: portfolios });
              S.getter(`getProposalByIdUser`, {

                idUser:this.props.match.params.id, 
                limit:3000,
              }, (res) => {  
                const proposals = res.data.proposalList;
                console.log(res);
                  this.setState({ proposals: proposals });
                  S.getter(`getTalentByIdUser`, {
                    limit:3000,
                    idUser:this.props.match.params.id,
                  }, (res) => {  
                    const talents = res.data.talentList;
                    console.log(res);
                      this.setState({ talents: talents });
                      S.serviceAPI().get(`getUserById`, 
                        { params: {
                                idUser: this.props.match.params.id
                            }})
                        .then(res => {
                            if(!res.data.error){
                        const user = res.data.user;
                        console.log(res);
                        console.log(user);
                        this.setState({ user:user });
                                        S.serviceAPI().get(`getProposalByApplicationIdUser`, 
                                        { params: {
                                                idUser: this.props.match.params.id
                                            }})
                                        .then(res => {
                                            if(!res.data.error){
                                        const table = res.data.table;
                                        console.log(res);
                                        console.log(table);
                                        this.setState({ dashboardTable:table });
                                        this.setState({pageContent:'Projects'});
                                            }else{
                                        const error={message:res.data.error,error:true};
                                        this.setState( error );
                                    }
                                    this.setState({ showRender:true });
                                    
                                })
                            }else{
                        const error={message:res.data.error,error:true};
                        this.setState( error );
                    }
                    this.setState({ showRender:false });
                    
                })
                  },
                  (error) => { 
                      console.log("Error: Talent", error);
                      this.setState({ error: {message:error,error:true} });
                  });
              },
              (error) => { 
                  console.log("Error: Proposal", error);
                  this.setState({ error: {message:error,error:true} });
              });
        },
        (error) => { 
        console.log("Error: Portfolio", error);
            this.setState({ error: {message:error,error:true} });
        });},
        (error) => { 
        console.log("Error: Rec", error);
            this.setState({ error: {message:error,error:true} });
        });
    }
    componentDidMount() {
        

                S.getter(`getRecomendBoolFromIds`, {idUser:this.props.match.params.id, idUser1:this.props.app.state.userLogged.idUser||null}, (res) => { 
              console.log("RES RECOMMEND:",res);
              this.setState({recomendedUser:res.data.answer==true});
        
        S.getter(`getRecomendNumberByIdUser`, {
            idUser:this.props.match.params.id, 
            
          }, (res) => { 
              console.log("RES RECOMMEND:",res);
              this.setState({recommendNumber:res.data.number});
        S.getter(`getPortfolioByIdUser`, {
            idUser:this.props.match.params.id, 
            limit:3000,
          }, (res) => {  
            const portfolios = res.data.portfolioList;
            console.log(res);
              this.setState({ portfolios: portfolios });
              S.getter(`getProposalByIdUser`, {

                idUser:this.props.match.params.id, 
                limit:3000,
              }, (res) => {  
                const proposals = res.data.proposalList;
                console.log(res);
                  this.setState({ proposals: proposals });
                  S.getter(`getTalentByIdUser`, {
                    limit:3000,
                    idUser:this.props.match.params.id,
                  }, (res) => {  
                    const talents = res.data.talentList;
                    console.log(res);
                      this.setState({ talents: talents });
                      S.serviceAPI().get(`getUserById`, 
                  { params: {
                        idUser: this.props.match.params.id
                    }})
                .then(res => {
                    if(!res.data.error){
                const user = res.data.user;
                console.log(res);
                console.log(user);
                this.setState({ user:user });
                                         S.serviceAPI().get(`getProposalByApplicationIdUser`, 
                                                { params: {
                                                        idUser: this.props.match.params.id
                                                    }})
                                                .then(res => {
                                                    if(!res.data.error){
                                                const table = res.data.table;
                                                console.log(res);
                                                console.log(table);
                                                this.setState({ applicationTable:table });
                                                this.setState({pageContent:'Projects'});
                                                    }else{
                                                const error={message:res.data.error,error:true};
                                                this.setState( error );
                                            }
                                            this.setState({ showRender:true });
                                            
                                        })
                
                    }else{
                        const error={message:res.data.error,error:true};
                        this.setState( error );
                    }
                    this.setState({ showRender:false });
                    
                })
                  },
                  (error) => { 
                      console.log("Error: Talent", error);
                      this.setState({ error: {message:error,error:true} });
                  });
              },
              (error) => { 
                  console.log("Error: Proposal", error);
                  this.setState({ error: {message:error,error:true} });
              });
        },
        (error) => { 
        console.log("Error: Portfolio", error);
            this.setState({ error: {message:error,error:true} });
        });
    },
    (error) => { 
        console.log("Error: Number Recommend", error);
        this.setState({ error: {message:error,error:true} });
    });  
},
(error) => { 
console.log("Error: Recommended", error);
    this.setState({ error: {message:error,error:true} });
});
    }
    empty(){
        return(<></>);
    }
    render() {
        if(this.state.showRender){
        return (
            <>
                <Card className="Profile-Header-Card">
                    <Card.Body style={{paddingTop: "5px"}}>
                        <Row>
                            <Col xs={2} s={2} m={2} l={2} xl={2}>
                                <Image src={S.baseURL()+"public/anexes/profiles/"+this.state.user.anexes.fileName} className="Profile-Avatar"  />
                            </Col>
                            <Col xs={2} s={2} m={2} l={2} xl={2}>
                                <Row>
                                <Card.Text className="C-Portfolio-Username"><b>{this.state.user.nameUser}</b></Card.Text>
                                </Row>
                                <Row>
                                <Image src={getImageLanguage(this.state.user.countryUser)} className="Modal-Portfolio-Avatar" roundedCircle />
                                <Card.Text className="Profile-Header-RegionCountry">
                                {this.state.user.regionUser}
                                </Card.Text>
                                
                                <Card.Text className="Profile-Statistics">
                                <Translate id="recommended by"></Translate> {" "+this.state.recommendNumber}
                                </Card.Text>
                                </Row>
                            </Col>
                            <Col xs={8} s={8} m={8} l={8} xl={8}>
                                <Card.Text className="Profile-Header-Text">
                                {"" + this.state.user.descriptionUser}
                                </Card.Text>
                                { (this.state.recomendedUser == true)?this.pageImageBadges(): <div></div>}
                                {(this.props.match.params.id!=this.props.app.state.userLogged.idUser)?this.diferentProfile():this.empty()}
                                
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                   
                    <Row>

                        <Col m={5}>
                        <Row>
                            <Col m={6} style={{textAlign: "center", paddingRight:5}}>
                            <Button onClick={()=>{this.setState({pageContent:'Projects'})}} className="Profile-Button-Categories">
                            <Translate id="projects"></Translate>
                            <Link to={"/CreateProject/"}>
                            <FiFilePlus className="Profile-Create-Sign"/>
                            </Link>
                            </Button>
                            </Col>
                            <Col m={6} style={{textAlign: "center", paddingLeft: 5, paddingRight: 5}}>
                            <Button onClick={()=>{this.setState({pageContent:'Proposals'})}} className="Profile-Button-Categories">
                            <Translate id="proposals"></Translate>
                            <Link to={"/CreateProposal/"}>
                            <FiFilePlus className="Profile-Create-Sign"/>
                            </Link>
                            </Button>
                            </Col>
                        </Row>
                        </Col>

                        <Col m={2}>
                        <Row>
                            <Col style={{textAlign: "center", paddingLeft: 5, paddingRight: 5}}>
                            <Button onClick={()=>{this.setState({pageContent:'Dashboards'})}} className="Profile-Button-Categories"><Translate id="dashboard"></Translate></Button>
                            </Col>
                        </Row>
                        </Col>

                        <Col m={5}>
                        <Row>
                            <Col m={6} style={{textAlign: "center", paddingLeft: 5, paddingRight: 5}}>
                            <Button onClick={()=>{this.setState({pageContent:'Talents'})}} className="Profile-Button-Categories">
                            <Translate id="talents"></Translate>
                            <Link to={"/CreateTalent/"}>
                            <FiFilePlus className="Profile-Create-Sign"/>
                            </Link>
                            </Button>
                            </Col>
                            <Col m={6} style={{textAlign: "center", paddingLeft: 5}}>
                            <Button onClick={()=>{this.setState({pageContent:'Settings'})}} className="Profile-Button-Categories"><Translate id="settings"></Translate></Button>
                            </Col>
                        </Row>
                        </Col>
                    </Row>




                    <Row>
                        
                        {(this.state.showRender)?(
                        (this.state.pageContent=='Projects')?this.pageContentProjects():
                        ((this.state.pageContent=='Proposals')?this.pageContentProposals():
                        ((this.state.pageContent=='Talents')?this.pageContentTalents():
                        ((this.state.pageContent=='Dashboard')?this.pageContentDashboard():
                        ((this.state.pageContent=='Settings')?this.pageContentSettings():
                        this.pageContentDashboard()
                        ))))):this.empty() 
                        }


                        

                    </Row>
                    <CardsModalPortfolio parent={this} closer={this.handleModalClose}/>
                    <CardsModalProposal parent={this} closer={this.handleModalClose}/>
                    <CardsModalTalent parent={this} closer={this.handleModalClose}/>
                    <MessageModal app={this.props.app} parent={this} closer={this.handleModalClose}/>
              
            </>
        )
        }else{
            return(<></>);
        }
    }
    diferentProfile(){
        return (<><Button className="Profile-Send-Message" onClick={() => {this.handleModalShow("messageModal", this.user,true)}}><FiMail/></Button>
                                <Button className="Profile-Recommend-User" onChange={this.state.recomendedUser} onClick={()=>{this.handleRecommendUserClick()}}>
                                 
                                 { (this.state.recomendedUser == false)?this.buttonRecommendUser(): this.buttonUserRecommended()}
                                </Button></>);
    }
        pageContentProjects(){
            return (<>{this.state.portfolios.map(val =>{return(
                <CardPortfolio  parent={this} data={val}app={this.props.app} />
              );})}</>
            )
        }
        pageContentProposals(){
            return (<>{this.state.proposals.map(val =>{return(
                <CardProposal  parent={this} data={val} app={this.props.app}/>
              );})}</>
            )
        }
        pageContentTalents(){
              return (<>{this.state.talents.map(val =>{return(
                <CardTalent data={val} parent={this} app={this.props.app}/>
              );})}</>
            )
        }
        pageContentDashboard(){
            
            return (<>

                <Table responsive="sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Proposal Name</th>
                        <th>Current State</th>
                        <th>Last Change</th>
                        <th>Details</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.dashboardTable.map((val) =>{return(
                        <tr>
                            <td>0</td>
                            <td>{val.nameProposal}</td>
                            <td>{""+val.valueProposalState+" , "+val.value}</td>
                            <td>{val.createdTimestamp}</td>
                            <td>{val.descriptionProposal}</td>
                        </tr>)})}
                    </tbody>
                </Table>
            </>
          )
      }

      pageImageBadges() {
          return (
        <Image className="Profile-Badges" src={this.state.recommendBadge}/>
          )
      }

      buttonRecommendUser() {
          return (
              <>
            <MdAdd style={{height: "20px", width:"20px"}}/><Translate id="recommend user"></Translate>
            </>
          )
      }

      buttonUserRecommended() {
        return (
            <>
          <MdCheck style={{height: "20px", width:"20px"}}/><Translate id="user recommended"></Translate>
          </>
        )
    }

      pageContentSettings(){
            
        return (<></>
      )
  }
    }

export default withLocalize(ProfileView);
