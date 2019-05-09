import React from 'react'
import CardProposal from '../../../Components/Elements/Cards/CardProposal/CardProposal'
import CardPortfolio from '../../Elements/Cards/CardPortfolio/CardPortfolio'
import CardTalent from '../../Elements/Cards/CardTalent/CardTalent'
import { Card, Image, Row, Button, Col } from 'react-bootstrap';
import { withLocalize, Translate } from "react-localize-redux";
import getImageLanguage from "../../../Resources/Translations/compilerLanguageImages.js"

import './Profile.css'
import ServicesAPI from '../../../serviceAPI.js';
var S = new ServicesAPI();




class ProfileView extends React.Component {
    state = {
        user: {},
        error:{},
        showRender:false,
        pageContent: 'Projects',
        portfolios:[],
        proposals:[],
        talents:[]
      }
    //request example
    componentDidMount() {
        S.getter(`getPortfolioByIdUser`, {
            idUser:this.props.match.params.id, 
            limit:3000,
          }, (res) => {  
            const portfolios = res.data.portfolioList;
            console.log(res);
              this.setState({ portfolios: portfolios });
        },
        (error) => { 
        console.log("Error: Portfolio", error);
            this.setState({ error: {message:error,error:true} });
        });
        S.getter(`getProposalByIdUser`, {

            idUser:this.props.match.params.id, 
            limit:3000,
          }, (res) => {  
            const proposals = res.data.proposalList;
            console.log(res);
              this.setState({ proposals: proposals });
          },
          (error) => { 
              console.log("Error: Proposal", error);
              this.setState({ error: {message:error,error:true} });
          });
          S.getter(`getTalentByIdUser`, {
            limit:3000,
            idUser:this.props.match.params.id,
          }, (res) => {  
            const talents = res.data.talentList;
            console.log(res);
              this.setState({ talents: talents });
          },
          (error) => { 
              console.log("Error: Talent", error);
              this.setState({ error: {message:error,error:true} });
          });
        S.serviceAPI().get(`getUserById`, 
          { params: {
                idUser: this.props.match.params.id
            }})
        .then(res => {
            if(!res.data.error){
        const user = res.data.user;
        console.log(res);
        this.setState({ user });
       
            }else{
                const error={message:res.data.error,error:true};
                this.setState( error );
            }
            this.setState({ showRender:true });
            
        })
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
                                <Col m={12} l={12} xl={12}>
                                <Row>
                                <Card.Text className="C-Portfolio-Username"><b>{this.state.user.nameUser}</b></Card.Text>
                                </Row>
                                <Row>
                                <Image src={getImageLanguage(this.state.user.countryUser)} className="Modal-Portfolio-Avatar" roundedCircle />
                                <Card.Text className="Profile-Header-RegionCountry">
                                {"" + this.state.user.regionUser}
                                </Card.Text>
                                </Row>
                                </Col>
                            </Row>
                            </Col>
                            <Col xs={8} s={8} m={8} l={8} xl={8}>

                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                    <Row>
                        <Col m={5}>
                        <Row>
                            <Col m={6} style={{textAlign: "center", paddingRight:5}}>
                            <Button onClick={()=>{this.setState({pageContent:'Projects'})}} className="Modal-Portfolio-Button-Categories"><Translate id="projects"></Translate></Button>
                            </Col>
                            <Col m={6} style={{textAlign: "center", paddingLeft: 5, paddingRight: 5}}>
                            <Button onClick={()=>{this.setState({pageContent:'Proposals'})}} className="Modal-Portfolio-Button-Categories"><Translate id="proposals"></Translate></Button>
                            </Col>
                        </Row>
                        </Col>

                        <Col m={2}>
                        <Row>
                            <Col style={{textAlign: "center", paddingLeft: 5, paddingRight: 5}}>
                            <Button onClick={()=>{this.setState({pageContent:'Dashboards'})}} className="Modal-Portfolio-Button-Categories"><Translate id="dashboard"></Translate></Button>
                            </Col>
                        </Row>
                        </Col>

                        <Col m={5}>
                        <Row>
                            <Col m={6} style={{textAlign: "center", paddingLeft: 5, paddingRight: 5}}>
                            <Button onClick={()=>{this.setState({pageContent:'Talents'})}} className="Modal-Portfolio-Button-Categories"><Translate id="talents"></Translate></Button>
                            </Col>
                            <Col m={6} style={{textAlign: "center", paddingLeft: 5}}>
                            <Button onClick={()=>{this.setState({pageContent:'Settings'})}} className="Modal-Portfolio-Button-Categories"><Translate id="settings"></Translate></Button>
                            </Col>
                        </Row>
                        </Col>
                    </Row>




                    <Row>
                        
                        {
                        (this.state.pageContent=='Projects')?this.pageContentProjects():
                        ((this.state.pageContent=='Proposals')?this.pageContentProposals():
                        ((this.state.pageContent=='Talents')?this.pageContentTalents():
                        ((this.state.pageContent=='Dashboard')?this.pageContentDashboard():
                        ((this.state.pageContent=='Settings')?this.pageContentSettings():
                        this.pageContentDashboard()
                        ))))                       
                        }


                        

                    </Row>
            </>
        )
        }else{
            return(<></>);
        }
    }
        pageContentProjects(){
            return (<>{this.state.portfolios.map(val =>{return(
                <CardPortfolio  parent={this} data={val} />
              );})}</>
            )
        }
        pageContentProposals(){
            return (<>{this.state.proposals.map(val =>{return(
                <CardProposal  parent={this} data={val} />
              );})}</>
            )
        }
        pageContentTalents(){
            
              return (<>{this.state.talents.map(val =>{return(
                <CardTalent data={val} parent={this} />
              );})}</>
            )
        }
        pageContentDashboard(){
            
            return (<></>
          )
      }
      pageContentSettings(){
            
        return (<></>
      )
  }
    }

export default withLocalize(ProfileView);
