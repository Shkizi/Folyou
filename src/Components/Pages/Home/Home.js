import React from 'react'
import { Link } from "react-router-dom";
import CardProposal from '../../../Components/Elements/Cards/CardProposal/CardProposal'
import CardPortfolio from '../../Elements/Cards/CardPortfolio/CardPortfolio'
import { Container, Row, Col, Button} from 'react-bootstrap';
import { withLocalize, Translate } from "react-localize-redux";
import CardTalent from '../../Elements/Cards/CardTalent/CardTalent';
import HomeCarousel from '../../Elements/Carousel/HomeCarousel/HomeCarousel'

import { IoIosArrowForward } from "react-icons/io";
import './Home.css'
import ServicesAPI from '../../../serviceAPI.js';
import CardsModalProposal from '../../Elements/CardsModal/Types/CardsModalProposal/CardsModalProposal';
import CardsModalTalent from '../../Elements/CardsModal/Types/CardsModalTalent/CardsModalTalent';
import CardsModalPortfolio from '../../Elements/CardsModal/Types/CardsModalPorfolio/CardsModalPortfolio.jsx'
import MessageModal from '../../Elements/CardsModal/Types/MessageModal/MessageModal.jsx'


var S = new ServicesAPI();



class Home extends React.Component { 
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
      showModalMessage:false,
      typeModal: null,
      idModal: null,
    };
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleModalShow = this.handleModalShow.bind(this);

  }
  
  handleModalClose() {
    this.setState({showModalPortfolio: false});
    this.setState({showModalTalent: false});
    this.setState({showModalProposal: false});
    this.setState({showModalMessage: false});
    console.log(this.state);
  }

  handleModalShow(type, id) {
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
    
  }

  componentDidMount() {
        S.getter(`getPortfolioByIdRecent`, {
          limit:4,
        }, (res) => {  
          const portfolios = res.data.portfolioList;
          console.log(res);
            this.setState({ portfolios: portfolios });
      },
      (error) => { 
      console.log("Error: Portfolio", error);
          this.setState({ error: {message:error,error:true} });
      });
      S.getter(`getProposalByIdRecent`, {
        limit:4,
      }, (res) => {  
        const proposals = res.data.proposalList;
        console.log(res);
          this.setState({ proposals: proposals });
      },
      (error) => { 
          console.log("Error: Proposal", error);
          this.setState({ error: {message:error,error:true} });
      });
      S.getter(`getTalentByIdRecent`, {
        limit:4,
      }, (res) => {  
        const talents = res.data.talentList;
        console.log(res);
          this.setState({ talents: talents });
      },
      (error) => { 
          console.log("Error: Talent", error);
          this.setState({ error: {message:error,error:true} });
      });
      S.getter(`getTrendingProposal`, {
        limit:4,
      }, (res) => {  
        const proposalList = res.data.proposalList;
        console.log(res);
          this.setState({ propTrending: proposalList });
      },
      (error) => { 
          console.log("Error: Talent", error);
          this.setState({ error: {message:error,error:true} });
      });
      S.getter(`getTrendingPortfolio`, {
        limit:4,
      }, (res) => {  
        const portfolioList = res.data.portfolioList;
        console.log(res);
          this.setState({ portTrending: portfolioList });
      },
      (error) => { 
          console.log("Error: Talent", error);
          this.setState({ error: {message:error,error:true} });
      });


      console.log("finish Mounting");
  }

 

  render() {
    return ( 
        <>
        
          {/* HOME CAROUSEL SECTION */}
                    <Row style={{margin: 0}}>
                      <Col sm={12} className="Header-Sections">
                        <HomeCarousel parent={this} app={this.props.app}/>
                      </Col>
                    </Row>
        

          {/* TRENDING SECTION */}

                    <Row style={{margin: 0}}>
                     <Col sm={12} className="Header-Sections">
                         <h1 style={{marginTop: "auto", marginBottom:"auto"}}><Translate id="trending"></Translate></h1>
                         </Col>
                      <Col sm={12}>
                      <hr className="Hr-Sections"/>
                      <Row>
                      {this.state.portTrending.map(val =>{return(
                        <CardPortfolio data={val} parent={this} app={this.props.app}  />
                      );})}
                      {this.state.propTrending.map(val =>{return(
                        <CardProposal data={val} parent={this} app={this.props.app}  />
                      );})}
                      </Row>
                      </Col>
                    </Row>

         {/* PROJECT SECTION */}

         <Row style={{margin: 0, marginTop: "3%"}}>
                     <Col sm={12} className="Header-Sections">
                    
                        <b style={{fontFamily: "inherit",
                        fontWeight: "500",
                        color: "inherit",
                        fontSize:"26px",
                       }}><Translate id="latest projects" ></Translate> 
                        <Link to = {"/Portfolios"} className="Button-View-All-Text">

                       <Button className="Button-View-All">
                          
                            <Translate id="see more"></Translate>
                          <IoIosArrowForward style={{ color: "#49c5b6"}}></IoIosArrowForward>
                      </Button>
                      </Link>

                       </b>
                     
                      </Col>
                      <Col sm={12}>
                      <hr className="Hr-Sections"/>
                      <Row>
                      {this.state.portfolios.map(val =>{return(
                        <CardPortfolio parent={this} data={val} app={this.props.app}  />
                      );})}
                      </Row>
                      </Col>
                    </Row>

        {/* PROPONENT SECTION*/}

        <Row style={{margin: 0, marginTop: "3%"}}>
                     <Col sm={12} className="Header-Sections">
                     <b style={{fontFamily: "inherit",
                        fontWeight: "500",
                        color: "inherit",
                        fontSize:"26px",
                       }}><Translate id="latest proposals" ></Translate> 
                       
                       <Link to = {"/Proposals"} className="Button-View-All-Text">
                       <Button className="Button-View-All">
                            <Translate id="see more"></Translate>
                           <IoIosArrowForward style={{color: "#49c5b6"}}></IoIosArrowForward>
                      </Button>
                      </Link>
                       </b>
                       </Col>
                      <Col sm={12}>
                      <hr className="Hr-Sections"/>
                      <Row>
                      {this.state.proposals.map(val =>{return(
                        <CardProposal  parent={this} data={val} app={this.props.app}  />
                      );})}
                      </Row>
                      </Col>
                    </Row>

        {/* TALENT SECTION */}

        <Row style={{margin: 0, marginTop: "3%"}}>
                     <Col sm={12} className="Header-Sections">
                     <b style={{fontFamily: "inherit",
                        fontWeight: "500",
                        color: "inherit",
                        fontSize:"26px",
                       }}><Translate id="latest rising stars" ></Translate> 
                       <Link to = {"/Talents"} className="Button-View-All-Text">
                       <Button className="Button-View-All">
                           <Translate id="see more"></Translate>
                           <IoIosArrowForward style={{color: "#49c5b6"}}></IoIosArrowForward>
                      </Button>
                      </Link>
                       </b>
                                           </Col>
                      <Col sm={12}>
                      <hr className="Hr-Sections"/>
                      <Row>
                      {this.state.talents.map(val =>{return(
                        <CardTalent data={val} parent={this} app={this.props.app}  />
                      );})}
                      </Row>
                      </Col>
                    </Row>

              <CardsModalPortfolio parent={this} closer={this.handleModalClose} app={this.props.app}/>
              <CardsModalProposal parent={this} closer={this.handleModalClose} app={this.props.app}/>
              <CardsModalTalent parent={this} closer={this.handleModalClose} app={this.props.app}/>
              <MessageModal app={this.props.app} parent={this} closer={this.handleModalClose}/>
                    

              
        </>
 );} }


 //<CardsModalTalent parent={this} closer={this.handleModalClose}/>
 //<CardsModalProposal parent={this} closer={this.handleModalClose}/>
export default withLocalize(Home);
