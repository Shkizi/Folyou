import React from 'react'
import CardProposal from '../../../Components/Elements/Cards/CardProposal/CardProposal'
import CardPortfolio from '../../Elements/Cards/CardPortfolio/CardPortfolio'
import CardTalent from '../../Elements/Cards/CardTalent/CardTalent'
import { Card, Image, Row, Button, Col, Table, Form } from 'react-bootstrap';
import { withLocalize, Translate } from "react-localize-redux";
import getImageLanguage from "../../../Resources/Translations/compilerLanguageImages.js"
import CardsModalProposal from '../../Elements/CardsModal/Types/CardsModalProposal/CardsModalProposal';
import CardsModalTalent from '../../Elements/CardsModal/Types/CardsModalTalent/CardsModalTalent';
import CardsModalPortfolio from '../../Elements/CardsModal/Types/CardsModalPorfolio/CardsModalPortfolio.jsx'
import MessageModal from '../../Elements/CardsModal/Types/MessageModal/MessageModal'
import { GitHub,  Facebook, StackOverflow, LinkedIn, Instagram, Youtube,  Twitch, Twitter } from 'react-profiles';
import { FiFilePlus } from "react-icons/fi";
import ReactTooltip from 'react-tooltip'
import SelectSearch from 'react-select-search'
import './Profile.css'
import { Link } from "react-router-dom";
import ServicesAPI from '../../../serviceAPI.js';
import { MdAdd } from "react-icons/md";
import { MdCheck } from "react-icons/md";
import { FiMail } from "react-icons/fi";






import Recommended from '../../../Resources/Images/Recommended.png'
import clickToRecommend from '../../../Resources/Images/Recommend.png'

var countryJson = require("../../../Resources/Translations/countries.json");

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
        description: "",
        region: "",
        atualPassword: "",
        newPassword: "",
        changeUsername: "",
        repeatNewPassword: "",
        newProfileImageLoadedName: "",
        facebook: "",
        instagram: "",
        twitter: "",
        twitch: "",
        youtube: "",
        newProfileImageLoaded: null,
        country: "",
        linkedin: "",
        github: "",
        stackoverflow: "",
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

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleRegion = this.handleRegion.bind(this);
    this.handleCountry = this.handleCountry.bind(this);
    this.handleDescription = this.handleDescription.bind(this);


    this.handleAtualPassword = this.handleAtualPassword.bind(this);
    this.handleNewPassword = this.handleNewPassword.bind(this);
    this.handleRepeatNewPassword = this.handleRepeatNewPassword.bind(this);
    this.handleNewProfileImageLoadedName = this.handleNewProfileImageLoadedName.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);


    this.handleFacebook = this.handleFacebook.bind(this);
    this.handleInstagram = this.handleInstagram.bind(this);
    this.handleTwitter = this.handleTwitter.bind(this);
    this.handleTwitch = this.handleTwitch.bind(this);
    this.handleYoutube = this.handleYoutube.bind(this);
    this.handleLinkedin = this.handleLinkedin.bind(this);
    this.handleStackoverflow = this.handleStackoverflow.bind(this);
    this.handleGithub = this.handleGithub.bind(this);


    
  } 
  handleSubmit(event){
    event.preventDefault();
    let data= {emailUser:this.state.user.emailUser, passwordUser:this.state.atualPassword};
     
    S.getter(`getUserLogin`, data, (res) => {  
      const result = res.data;
      console.log(res);
      if(result.verified==true){
        let data = new FormData();
        const item ={ nameUser:this.state.changeUsername,
          descriptionUser:this.state.description,
          regionUser:this.state.region,
          countryUser:this.state.country,
          idProfileFacebook:this.state.facebook,
          idProfileGithub:this.state.github,
          idProfileInstagram:this.state.instagram,
          idProfileLinkedin:this.state.linkedin,
          idProfileTwitch:this.state.twitch,
          idProfileTwitter:this.state.twitter,
          idProfileStackOverflow:this.state.stackoverflow,
          idProfileYoutube:this.state.youtube,
          passwordUser:this.state.newPassword,
        idUser:this.state.user.idUser}
      
        for ( var key in item ) {
          data.append(key, item[key]);
        }
        S.postter(`postUpdateUser`, data, (res) => {
          if(this.state.newProfileImageLoadedName!=""){
            data=new FormData();
            data.append("file",this.state.newProfileImageLoaded);
            data.append("idUser",this.state.user.idUser);
            S.postter(`postUploadImageUser`, data, (res) => {
            this.props.app.state.notificationModule.notify("UPDATE SUCCESS","br",2,2);  
              },
        (error) => { 
            console.log("Error: User", error);
            this.setState({ error: {message:error,error:true} });
        });
          }else{
            this.props.app.state.notificationModule.notify("UPDATE SUCCESS","br",2,2);  
          }
          
        },
        (error) => { 
            console.log("Error: User", error);
            this.setState({ error: {message:error,error:true} });
        });
      }
      
    },
    (error) => { 
        console.log("Error: User", error);
        this.setState({ error: {message:error,error:true} });
    });
   

  }
     handleNewProfileImageLoadedName (event) {
        this.setState({ newProfileImageLoadedName: event.target.files[0].name});
        this.setState({ newProfileImageLoaded: event.target.files[0]});

     }
     
      handleChangeUsername (event) {
        this.setState({ changeUsername: event.target.value});
      }

      handleCountry(event) {
        this.setState({ country: event.value});
     }

      handleRegion(event) {
        this.setState({ region: event.target.value});
      }

      handleDescription(event) {
        this.setState({ description: event.target.value});
      }

      handleFacebook(event) {
        this.setState({ facebook: event.target.value});
      }

      handleInstagram(event) {
        this.setState({ instagram: event.target.value});
      }

      handleYoutube(event) {
        this.setState({ youtube: event.target.value});
      }

      handleTwitter(event) {
        this.setState({ twitter: event.target.value});
      }

      handleTwitch(event) {
        this.setState({ twitch: event.target.value});
      }

      handleLinkedin(event) {
        this.setState({ linkedin: event.target.value});
      }

      handleGithub(event) {
        this.setState({ github: event.target.value});
      }

      handleStackoverflow(event) {
        this.setState({ stackoverflow: event.target.value});
      }

      handleAtualPassword(event) {
        this.setState({ atualPassword: event.target.value});
      }  

      handleNewPassword(event) {
        this.setState({ newPassword: event.target.value});
      }

      handleRepeatNewPassword (event) {
        this.setState({ repeatNewPassword: event.target.value});
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
         
        S.postter(`postClicks`, data, (res) => { },
      (error) => { console.log(error);});
        
        this.setState({ typeModal: type, idModal: id });
        this.setState({showModalPortfolio: type=="portfolioSheet"});
        this.setState({showModalTalent: type=="talentSheet"});
        this.setState({showModalProposal: type=="proposalSheet"});
        if(type=="messageModal"){
        this.setState({showModalMessage: type=="messageModal" });
        }else if(type=="messageModalSheet"){
          this.setState({showModalMessage: type=="messageModalSheet" });
          }else if(type=="messageModalTalent"){
            this.setState({showModalMessage: type=="messageModalTalent" });
            }else {
              this.setState({showModalMessage: type=="messageModalProposal" });
              }
              this.setState({UserMessage:usermes});
        
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
                        this.setState({ changeUsername:user.nameUser });
                        this.setState({description :user.descriptionUser });
                        this.setState({ region:user.regionUser });
                        this.setState({ country:user.countryUser.toUpperCase() });
                        this.setState({ facebook:user.idProfileFacebook });
                        this.setState({ github:user.idProfileGithub });
                        this.setState({ instagram:user.idProfileInstagram });
                        this.setState({ linkedin:user.idProfileLinkedIn });
                        this.setState({ twitch:user.idProfileTwitch });
                        this.setState({ twitter:user.idProfileTwitter });
                        this.setState({ stackoverflow:user.idProfileStackOverflow });
                        this.setState({ youtube :user.idProfileYoutube });
                        
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
                    <Card.Body style={{paddingTop: "15px"}}>
                        <Row style={{position: "relative"}}>
                            <Col xs={12} sm={12} md={12} lg={12} xl={2} className="Profile-Card-Column" >
                                <Image src={S.baseURL()+"public/anexes/profiles/"+((this.state.user.anexes.fileName!="")?this.state.user.anexes.fileName:"default_user_pic.jpg")} className="Profile-Avatar"  />
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={3} className="Profile-Card-Column">
                                <Row>
                                <Card.Text className="C-Portfolio-Username"><b>{this.state.user.nameUser}</b></Card.Text>
                                </Row>
                                <Row>
                                <Image src={getImageLanguage(this.state.user.countryUser)} className="Modal-Portfolio-Avatar" roundedCircle />
                                <Card.Text className="Profile-Header-RegionCountry">
                                {this.state.user.regionUser}
                                </Card.Text>
                                
                                <Row  style={{bottom: 0, position: "absolute", width: "100%"}}>
                                    <Col sm={8}>
                                    <Card.Text style={{left: 0}}>
                                    <Translate id="recommended by"></Translate> {" "+this.state.recommendNumber}
                                    </Card.Text>
                                    </Col>
                                    </Row>
                                </Row>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={7} className="Profile-Card-Column">
                                <Card.Text className="Profile-Header-Text">
                                {"" + this.state.user.descriptionUser}
                                </Card.Text>
                                <Row style={{marginLeft: "-7.5px"}}>
                                       
                                        {(this.state.user.idProfileInstagram!="" && this.state.user.idProfileInstagram !=null)? <Col sm={1} ><Instagram link={this.state.user.idProfileInstagram} /> </Col>:<></>}
                                        
                                        {(this.state.user.idProfileFacebook!="" && this.state.user.idProfileFacebook !=null)? <Col sm={1} ><Facebook link={this.state.user.idProfileFacebook} /> </Col>:<></>}
                                        
                                        {(this.state.user.idProfileYoutube!="" && this.state.user.idProfileYoutube !=null)? <Col sm={1} ><Youtube link={this.state.user.idProfileYoutube} /> </Col>:<></>}
                                        
                                        {(this.state.user.idProfileTwitch!="" && this.state.user.idProfileTwitch !=null)? <Col sm={1} ><Twitch link={this.state.user.idProfileTwitch} /> </Col>:<></>}
                                        
                                        {(this.state.user.idProfileTwitter!="" && this.state.user.idProfileTwitter !=null)? <Col sm={1} ><Twitter link={this.state.user.idProfileTwitter} />     </Col>:<></>}
                                        
                                        <Col  sm={7} style={{paddingLeft: "0px"}}>
                                            {(this.props.match.params.id!=this.props.app.state.userLogged.idUser && this.props.app.state.userLogged.set!=false)?this.diferentProfile():this.empty()}
                                        </Col>
                                </Row>
                                  {/*Big ones */}
                                <Row>
                                    <Col sm={5} style={{marginTop: "1%"}}>
                                        {(this.state.user.idProfileGithub!="" && this.state.user.idProfileGithub !=null)?<GitHub username={this.state.user.idProfileGithub} />:<></>}
                                    </Col>
                                    <Col sm={7} style={{marginTop: "1%", marginLeft: "-30px"}}>
                                    {(this.state.user.idProfileLinkedIn!="" && this.state.user.idProfileLinkedIn !=null)?
                                        <LinkedIn username={this.state.user.idProfileLinkedIn} 
                                            organization={(this.state.user.linkedInOrganization!=null && this.state.user.linkedInOrganization!="")?this.state.user.linkedInOrganization:undefined}
                                            role={(this.state.user.linkedInRole!=null && this.state.user.linkedInRole!="")?this.state.user.linkedInRole:undefined} />
                                        :<></>}
                                    </Col>
                                </Row>    

                                {/*Stack Overflow*/}
                                <Row>
                                <Col sm={12} style={{marginTop: "1%"}}>
                                {(this.state.user.idProfileStackOverflow!="" && this.state.user.idProfileStackOverflow !=null)?<StackOverflow userid={this.state.user.idProfileStackOverflow} />:<></>}
                                </Col>
                                </Row>
                              
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                   
                {(this.props.match.params.id==this.props.app.state.userLogged.idUser && this.props.app.state.userLogged.set!=false)?
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
                  :


                  <Row>
                        <Col m={4}>
                            <Row>
                              <Col m={12} style={{textAlign: "center", paddingRight:5}}>
                              <Button onClick={()=>{this.setState({pageContent:'Projects'})}} className="Profile-Button-Categories">
                              <Translate id="projects"></Translate>
                              </Button>
                              </Col>
                           </Row>
                        </Col>
                        <Col m={4}>
                          <Row>
                            <Col m={12} style={{textAlign: "center", paddingLeft: 5, paddingRight: 5}}>
                                <Button onClick={()=>{this.setState({pageContent:'Proposals'})}} className="Profile-Button-Categories">
                                <Translate id="proposals"></Translate>
                                </Button>
                            </Col>
                          </Row>
                        </Col>

                        <Col m={4}>
                        <Row>
                            <Col m={12} style={{textAlign: "center", paddingLeft: 5, paddingRight: 5}}>
                            <Button onClick={()=>{this.setState({pageContent:'Talents'})}} className="Profile-Button-Categories">
                            <Translate id="talents"></Translate>
                            </Button>
                            </Col>
                        </Row>
                        </Col>
                    </Row>
                  }


                        {(this.state.showRender)?(
                        (this.state.pageContent=='Projects')?this.pageContentProjects():
                        ((this.state.pageContent=='Proposals')?this.pageContentProposals():
                        ((this.state.pageContent=='Talents')?this.pageContentTalents():
                        ((this.state.pageContent=='Dashboard')?this.pageContentDashboard():
                        ((this.state.pageContent=='Settings')?this.pageContentSettings():
                        this.pageContentDashboard()
                        ))))):this.empty() 
                        }


                        

                    <CardsModalPortfolio parent={this} closer={this.handleModalClose} app={this.props.app}/>
                    <CardsModalProposal parent={this} closer={this.handleModalClose} app={this.props.app}/>
                    <CardsModalTalent parent={this} closer={this.handleModalClose} app={this.props.app}/>
                    <MessageModal app={this.props.app} parent={this} closer={this.handleModalClose}/>
              
            </>
        )
        }else{
            return(<></>);
        }
    }
    diferentProfile(){
        return (<Row>
        <Col sm={2} style={{paddingLeft: 0, paddingRight: 0, marginLeft: "20px"}}>
        <Button className="Profile-Send-Message" onClick={() => {this.handleModalShow("messageModal", this.user,true)}}><FiMail/></Button>
        </Col>
        <Col sm={4} style={{paddingLeft: 0, paddingRight: 0, marginLeft: "-30px"}}>
        <Button className="Profile-Recommend-User" onChange={this.state.recomendedUser} onClick={()=>{this.handleRecommendUserClick()}}>
         { (this.state.recomendedUser == false)?this.buttonRecommendUser(): this.buttonUserRecommended()} </Button>
         </Col>
         <Col sm={2} style={{marginLeft: "-30px"}}>
         {(this.state.recomendedUser == true)?this.pageImageBadges(): <div></div>}
         </Col>

                                </Row>);
    }
        pageContentProjects(){
            return (<Row>{this.state.portfolios.map(val =>{return(
                <CardPortfolio  parent={this} data={val}app={this.props.app} />
              );})}</Row>
            )
        }
        pageContentProposals(){
            return (<Row>{this.state.proposals.map(val =>{return(
                
                <CardProposal  parent={this} data={val} app={this.props.app}/>
              );})}</Row>
            )
        }
        pageContentTalents(){
              return (<Row>{this.state.talents.map(val =>{return(
                <CardTalent data={val} parent={this} app={this.props.app}/>
              );})}</Row>
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
        function renderFriend(option) {
            const imgStyle = {
                borderRadius: '50%',
                verticalAlign: 'middle',
                marginRight: 10,
            };
        
            return (<span><img alt="" style={imgStyle} width="40" height="40" src={option.photo} /><span>{option.name}</span></span>);
        } 
            let countries=[];
     
            for (var index in countryJson) {
                countries.push({name:countryJson[index],value:index,photo:getImageLanguage(index.toLowerCase())});
            }  
        return ( <form onSubmit={this.handleSubmit}>


            <div>
           
                <Col sm={12} style={{fontWeight: "bold", textAlign: "center", marginTop: "2%"}} >
                                <Form.Label><Translate id="profile settings"></Translate></Form.Label>
                </Col>

                <Col sm={12} className="Profile-Content-Settings-Col">        
                                <Form.Label  style={{marginBottom: "0%"}}><Translate id="change profile image"></Translate></Form.Label>
                                <Col sm={12} className="Profile-Content-Settings-Col" style={{marginLeft: "-1%"}}>
                                <div class="fileUpload btn">
                                    <span>Upload</span>
                                    <input id="uploadBtn" type="file" class="upload"  onChange={(event)=>{this.handleNewProfileImageLoadedName(event)}}   />
                                </div>
                                <input id="uploadFile"  disabled="disabled" value={this.state.newProfileImageLoadedName} />
                                </Col>
                </Col>

                <Col sm={12} className="Profile-Content-Settings-Col">
                                <Form.Label><Translate id="change name"></Translate></Form.Label>
                                <Form.Control type="text" value={this.state.changeUsername} onChange={(event)=>{this.handleChangeUsername(event)}} />
                </Col>
                <Col sm={12}>
                                <Form.Label><Translate id="country"></Translate></Form.Label>
                                <SelectSearch renderOption={renderFriend} options={countries} value={this.state.country} name="country" onChange={(event)=>{this.handleCountry(event)}} style={{height: "36px"}} />
                                
                </Col>
                <Col sm={12}>
                                <Form.Label><Translate id="region"></Translate></Form.Label>
                                <Form.Control type="text" value={this.state.region} onChange={(event)=>{this.handleRegion(event)}} />
                </Col>
                <Col sm={12} className="Profile-Content-Settings-Col" >
                                <Form.Label><Translate id="description"></Translate></Form.Label>
                                <Form.Control as="textarea" rows="15" maxlength="2000" value={this.state.description} onChange={(event)=>{this.handleDescription(event)}} />
                </Col>

                <Col sm={12} className="Profile-Content-Settings-Col" >
                                <Form.Label>Facebook</Form.Label>
                                <Form.Control type="text" value={this.state.facebook} onChange={(event)=>{this.handleFacebook(event)}} />
                </Col>
                <Col sm={12} className="Profile-Content-Settings-Col">
                                <Form.Label>Instagram</Form.Label>
                                <Form.Control type="text" value={this.state.instagram} onChange={(event)=>{this.handleInstagram(event)}} />
                </Col>
                <Col sm={12} className="Profile-Content-Settings-Col">
                                <Form.Label>Youtube</Form.Label>
                                <Form.Control type="text" value={this.state.youtube} onChange={(event)=>{this.handleYoutube(event)}} />
                </Col>
                <Col sm={12} className="Profile-Content-Settings-Col">
                                <Form.Label>Twitter</Form.Label>
                                <Form.Control type="text" value={this.state.twitter} onChange={(event)=>{this.handleTwitter(event)}} />
                </Col>
                <Col sm={12} className="Profile-Content-Settings-Col">
                                <Form.Label>Twitch</Form.Label>
                                <Form.Control type="text" value={this.state.twitch} onChange={(event)=>{this.handleTwitch(event)}} />
                </Col>

            </div>
            <div style={{marginTop: "2%", marginBottom: "2%"}}>
                <Col sm={12} style={{fontWeight: "bold", textAlign: "center"}} >
                                <Form.Label><Translate id="change password"></Translate></Form.Label>
                </Col>
                <Col sm={12} className="Profile-Content-Settings-Col">
                                <Form.Label><Translate id="atual password"></Translate></Form.Label>
                                <Form.Control type="password" value={this.state.atualPassword} onChange={(event)=>{this.handleAtualPassword(event)}} />
                </Col>
                <Col sm={12} className="Profile-Content-Settings-Col" >
                                <Form.Label><Translate id="new password"></Translate></Form.Label>
                                <Form.Control type="password" value={this.state.newPassword} onChange={(event)=>{this.handleNewPassword(event)}} />
                </Col>
            </div>
            <div>
            <Col className="Profile-Content-Settings-Col">
                <button className="Profile-Save-Changes-Button">
                    <Translate id="save changes"></Translate>
                </button>
            </Col>
            </div>
          </form>
      )
  }
    }

export default withLocalize(ProfileView);

