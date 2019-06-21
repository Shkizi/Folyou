import React from 'react'
import { Modal, Image, Card, Row, Button , Col} from 'react-bootstrap';
import { Translate } from "react-localize-redux";
import './CardsModalPorfolio.css';
import {  Link } from "react-router-dom";
import getImageLanguage from "../../../../../Resources/Translations/compilerLanguageImages.js"
import { IoIosHeart } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
import { getIconForExtension } from 'font-awesome-filetypes'


import { FiFileText, FiMail } from "react-icons/fi";
import { isNull } from 'util';
import ServicesAPI from "../../../../../serviceAPI";
var S = new ServicesAPI();
class CardsModalPortfolio extends React.Component {

  constructor(props, context) {
    super(props, context);
   
    this.state = {
      data: {},
      like: false
    };
    

    this.handleLikeClick = this.handleLikeClick.bind(this)
  }

  handleLikeClick() {
    if(this.state.like == false) {
      this.setState({like: true});
    } else {
      this.setState({like: false});
    }
  }

  fullHeart () {
    return(
      <IoIosHeart className="Modal-Portfolio-Like" onClick={() => {this.handleLikeClick()}}/>
    )
  }

  emptyHeart() {
    return (
      <div>
      <IoIosHeartEmpty className="Modal-Portfolio-Like" onClick={() => {this.handleLikeClick()}}/>
      <div className="Modal-Portfolio-Like-Text"><Translate id="like"></Translate></div>
      </div>
    )
  }
  
  render() {

  
   

    if( this.props.parent.state.showModalPortfolio){
      let data = {};
      
      if (!(typeof this.props.parent.state.portTrending ==="undefined")&&this.props.parent.state.portTrending.length > 0){
       this.props.parent.state.portTrending.forEach((valuePort,indexPort,arrayPort)=>{
          if (this.props.parent.state.portTrending[indexPort].idSheet == this.props.parent.state.idModal){
          data = this.props.parent.state.portTrending[indexPort];
            }
        });
      } if (!(typeof this.props.parent.state.portfolios ==="undefined")&&this.props.parent.state.portfolios.length > 0){
        this.props.parent.state.portfolios.forEach((valuePort,indexPort,arrayPort)=>{
          if (this.props.parent.state.portfolios[indexPort].idSheet == this.props.parent.state.idModal){
          data = this.props.parent.state.portfolios[indexPort];
         
            }
        });
      }
      else{data = {};}
      console.log(data);
        return (   
          <Modal
            show={this.props.parent.state.showModalPortfolio} 
            onHide={this.props.closer} 
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
                <Row style={{padding: "16px"}}>
                  <Link style={{textDecoration: "none"}}variant="link" to={"/Profile/"+data.idUser}>
                    <Row style={{paddingLeft: "16px", paddingTop: "16px"}}>
                    <Image src={(data.avatarUser=="")?"https://www.w3schools.com/howto/img_avatar.png":S.baseURL()+"public/anexes/profiles/"+((data.avatarUser!="")?data.avatarUser:"default_user_pic.jpg")} className="Modal-Portfolio-Avatar" roundedCircle />
                    <div className="Modal-Portfolio-Username">{data.nameUser}</div>
                    </Row>
                  </Link>
                 
                  {(this.props.app.state.userLogged.idUser==data.idUser  && this.props.app.state.userLogged.set!=false)?
                  <Link variant="primary" to={"/EditProject/"+data.idSheet}>
                    <Button className="Modal-Portfolio-Config"><Translate id="edit project"/></Button>
                  </Link>
                  :
                  <></>}
                  
                </Row>
            </Modal.Header>
            <Modal.Body  style={{padding: 0}}>
            <Card style={{backgroundColor: "inherit"}}>
              <Card.Body>
                <Row  style={{padding: "16px"}}>
                  <Image src={getImageLanguage(data.countrySheet)} className="Modal-Portfolio-Avatar-Country" roundedCircle/>
                  <div className="Modal-Portfolio-User-Location">{data.regionSheet}</div>
                  <div className="Modal-Portfolio-Sheet-Category"><b><Translate id="category"></Translate></b>{"  " + data.valueCategory}</div>
                </Row>
                <Row>
                  <div className="Modal-Portfolio-Image-Container">
                    <Image src={S.baseURL()+"public/anexes/sheets/"+data.defaultImageSheet} className="Modal-Portfolio-Project-Image" />
                      <div className="Modal-Portfolio-Like" style={{alignContent: "center"}}>
                        {(this.state.like == false)? this.emptyHeart() : this.fullHeart()}
                      </div>
                </div>
                </Row>
                <div className="Modal-Portfolio-SheetName">{data.nameSheet}</div> 
                <div className="Modal-Portfolio-Keywords"><b><Translate id="keywords"></Translate></b>{": " + data.keywords.join(", ")}</div>
              </Card.Body>
            </Card>

              <Card className="Modal-Portfolio-Description-Area">
                <div><b><Translate id="description"></Translate></b></div>
                <div className="Modal-Portfolio-Description">{data.descriptionSheet}</div>
              </Card>

              <Card>
                
              <div className="Modal-Portfolio-Anexes-Container">
                  <div style={{marginBottom: "2%", fontWeight: "bold"}}><Translate id="anexes"></Translate></div>
                  <div className="Modal-Portfolio-Anexes" dangerouslySetInnerHTML={{__html: getIconForExtension('foobar.pdf'.split('.').pop())}} />
                  </div>
              </Card>

          

            </Modal.Body>
            <Modal.Footer>
              <Row>
               
                <Col>
                {(this.props.app.state.userLogged.idUser!=data.idUser  && this.props.app.state.userLogged.set!=false)?this.sendMessage(data):<></>}
                   
                </Col>
              </Row>
            </Modal.Footer>
            </Modal>
        );
      }else{
      return(<></>);
    } 
    }
    sendMessage(data){
      return(
      <Button className={"Modal-Proposal-Button-Message"} onClick={(event)=>{handleMessage(event,this, data)}}><FiMail/> <Translate id="send a message"></Translate></Button>
      );
    }
    
}
function handleMessage(event,card,data) {
  var data= data;
   var parent = card.props.parent;
  event.stopPropagation();
  parent.handleModalShow("messageModalSheet",data.idSheet);
  
}
  export default (CardsModalPortfolio);
  