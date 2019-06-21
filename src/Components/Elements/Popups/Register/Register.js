import React from 'react'
import { Modal, Button, Row, Form, Col, Image  } from 'react-bootstrap';
import './Register.css'
import logo from '../../../../Resources/Images/Logo_black_white.png'
import { Link } from "react-router-dom";
import ServicesAPI from '../../../../serviceAPI.js';
import { withLocalize, Translate } from "react-localize-redux";
import getImageLanguage from "../../../../Resources/Translations/compilerLanguageImages.js";
import ReactTooltip from 'react-tooltip';
import SelectSearch from 'react-select-search';
var countryJson = require("../../../../Resources/Translations/countries.json");

var S = new ServicesAPI();

class Register extends React.Component {
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
    description:"",
    atualPassword: "",
    newPassword: "",
    changeUsername: "",
    repeatNewPassword: "",
    newProfileImageLoadedName: "",
    newProfileImageLoaded: null,
    country: "",
    showModalPortfolio: false,
    showModalTalent: false,
    showModalProposal: false,
    showModalMessage: false,
    typeModal: null,
    email:"",
    idModal: null,
    
    };
    this.handleNewPassword = this.handleNewPassword.bind(this);
    this.handleRepeatNewPassword = this.handleRepeatNewPassword.bind(this);
    this.handleCountry = this.handleCountry.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleRegion = this.handleRegion.bind(this);
this.handleDescription = this.handleDescription.bind(this);
  }
  handleCountry(event) {
    this.setState({ country: event.value});
 }
 handleEmail (event) {
  this.setState({ email: event.target.value});
}
 handleChangeUsername (event) {
  this.setState({ changeUsername: event.target.value});
}

handleNewPassword(event) {
  this.setState({ newPassword: event.target.value});
}

handleRegion(event) {
  this.setState({ region: event.target.value});
}

handleDescription(event) {
  this.setState({ description: event.target.value});
}
handleRepeatNewPassword (event) {
  this.setState({ repeatNewPassword: event.target.value});
}
handleSubmit(event){
  event.preventDefault();
  
  let data = new FormData();
  const item ={ nameUser:this.state.changeUsername,
    emailUser:this.state.email,
    passwordUser:this.newPassword,
    countryUser:this.state.country,
    regionUser:this.state.region,
    descriptionUser:this.state.description}
for ( var key in item ) {
  data.append(key, item[key]);
}

  S.postter(`postCreateUser`, data, (res) => {  
      this.props.app.state.notificationModule.notify("CREATION SUCCESS","br",2,2);
      let data= {emailUser:this.state.email, passwordUser:this.state.newPassword};
      const { cookies } = this.props;
    S.getter(`getUserLogin`, data, (res) => {  
      const result = res.data;
      console.log(res);
      result.user["set"]=result.verified;
      this.setState({ result: result });
      this.props.app.setState({userLogged:result.user});
      cookies.set('folyou_session', result.session, { path: '/' });
      this.props.closer();
      this.props.app.state.notificationModule.notify("LOGIN SUCCESS","br",2,2);
    },
    (error) => { 
        console.log("Error: User", error);
        this.setState({ error: {message:error,error:true} });
    });
  },
  (error) => { 
      console.log("Error: User", error);
      this.setState({ error: {message:error,error:true} });
  });
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
        let countries=[];
 
        for (var index in countryJson) {
            countries.push({name:countryJson[index],value:index,photo:getImageLanguage(index.toLowerCase())});
        }  
      return (
         <Modal size="lg"
         show={this.props.parent.state.showRegister} 
         onHide={this.props.closer} 
         centered={true}>
            <Modal.Header className="Register-Modal-Header" closeButton>
            </Modal.Header>

            <Modal.Body style={{paddingBottom: "50px"}}>
            
              <Row className="Register-Modal-Row">
              <Col sm={6} style={{paddingLeft: 0}}></Col>
              <Col sm={4} style={{paddingRight: 0}}><p className="Register-Text-Member ml-auto">Are you a member?
              </p></Col>
              <Col sm={2} style={{paddingRight: 0, paddingLeft: 0}}>
              <Button className="Register-Button-LoginNow" variant="link" onClick={ () => {this.props.closer();  this.props.parent.props.parent.handleLoginPopUpShow()}}>Login Now
              </Button>
              </Col>
              </Row>
              <form onSubmit={this.handleSubmit}>
            
        <>


            <div>
           
                <Col sm={12} style={{fontWeight: "bold", textAlign: "center", marginTop: "2%"}} >
                                <Form.Label><Translate id="profile settings"></Translate></Form.Label>
                </Col>

                <Col sm={12} className="Profile-Content-Settings-Col">
                                <Form.Label><Translate id="email"></Translate></Form.Label>
                                <Form.Control type="text" value={this.state.email} onChange={(event)=>{this.handleEmail(event)}} />
                </Col>
                <Col sm={12} className="Profile-Content-Settings-Col">
                                <Form.Label><Translate id="name"></Translate></Form.Label>
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

                

            </div>
            <div style={{marginTop: "2%", marginBottom: "2%"}}>
                <Col sm={12} style={{fontWeight: "bold", textAlign: "center"}} >
                                <Form.Label><Translate id="password"></Translate></Form.Label>
                </Col>
               
                <Col sm={12} className="Profile-Content-Settings-Col" >
                                <Form.Label><Translate id="password"></Translate></Form.Label>
                                <Form.Control type="password" value={this.state.newPassword} onChange={(event)=>{this.handleNewPassword(event)}} />
                </Col>
                <Col sm={12} className="Profile-Content-Settings-Col">
                                <Form.Label><Translate id="repeat password"></Translate></Form.Label>
                                <Form.Control type="password" value={this.state.repeatNewPassword} onChange={(event)=>{this.handleRepeatNewPassword(event)}} />
                </Col>
            </div>
            
          </>
      
              <Row> <Button  className="Register-Button-Create">CREATE YOUR ACCOUNT</Button></Row>
              </form>
            </Modal.Body>
            </Modal>
      );
    }
  }
  
export default Register