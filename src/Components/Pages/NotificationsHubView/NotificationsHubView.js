//place for all the portfolios


import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Container, Row, Table } from 'react-bootstrap';
import { Carousel, Image} from 'react-bootstrap';
import MessageModal from '../../Elements/CardsModal/Types/MessageModal/MessageModal.jsx'
import {  Link } from "react-router-dom";
import { withLocalize, Translate } from "react-localize-redux";
import isCookieValid from '../../../cookies.js';
import ServicesAPI from '../../../serviceAPI.js';

import './NotificationsHubView.css';

import { withCookies } from 'react-cookie';
import PleaseLogin from '../../Elements/PleaseLogin/PleaseLogin.js';

var S = new ServicesAPI();

class NotificationHubView extends React.Component {
    constructor(props, context) {
        super(props, context);
   
    this.state = {
        notifications:[],
        error:false,
        redirect:false,
        message:[],
        user:{},
        showModalPortfolio: false,
        showModalTalent: false,
        showModalProposal: false,
        showModalMessage:false,
        typeModal: null,
        idModal: null,
        UserMessage:false
      }
      this.handleReply=this.handleReply.bind(this);
      this.handleViewing=this.handleViewing.bind(this);
      this.redoServices=this.redoServices.bind(this);
      this.handleModalClose = this.handleModalClose.bind(this);
      this.handleShowModal = this.handleShowModal.bind(this);
    }
    handleShowModal(){
        this.setState({UserMessage:true},()=>{
            this.setState({showModalMessage:true});
            });
    }
    handleModalClose() {
        this.setState({showModalPortfolio: false});
        this.setState({showModalTalent: false});
        this.setState({showModalProposal: false});
        this.setState({showModalMessage: false});
        console.log(this.state);
        this.redoServices();
      }
      handleReply(idUser){
          let data ={idUser:idUser}
        S.getter(`getUserById`, data ,(res)=>{
            this.setState({user:res.data.user},()=>{
                this.handleShowModal();
            });
        },(error) => { console.log(error);});
        
      }
    handleViewing(idMessage){
        let data = new FormData();
        data.append("idMessage",idMessage);
        S.postter(`postViewedMessage`, data, (res) => { 
            this.props.app.state.notificationModule.notify("VIEW SUCCESS","br",2,2);
            this.redoServices();
        },
        (error) => { console.log(error);});
    }
    redoServices(){
        let th = this;
        S.getter(`getMessagesToUser`, {
            idUser:th.props.app.state.userLogged.idUser|null, 
            
          }, (res) => { 
              console.log("RES Message:",res);
              th.setState({message:res.data.messages});
            },
            (error) => { 
                console.log("Error: Mesage", error);
                th.setState({ error: {message:error,error:true} });
            });       
    }
    //request example
    componentDidMount() {
        let th = this;
        S.getter(`getMessagesToUser`, {
            idUser:th.props.app.state.userLogged.idUser|null, 
            
          }, (res) => { 
              console.log("RES Message:",res);
              th.setState({message:res.data.messages});
            },
            (error) => { 
                console.log("Error: Mesage", error);
                th.setState({ error: {message:error,error:true} });
            });
            
        setInterval(function() {
            S.getter(`getMessagesToUser`, {
            idUser:th.props.app.state.userLogged.idUser|null, 
            
          }, (res) => { 
              console.log("RES Message:",res);
              th.setState({message:res.data.messages});
            },
            (error) => { 
                console.log("Error: Mesage", error);
                th.setState({ error: {message:error,error:true} });
            });
        }, 60 * 1000/2);
        
    }
  
    render() {
        const {cookies}= this.props.cookies;
        return (
            <>
            <Row style={{margin: 0}}>
            <Table striped bordered hover className="Notifications-Message-Table">
                <thead>
                    <tr>
                    <th><Translate id="message origin"></Translate></th>
                    <th><Translate id="message receiver"></Translate></th>
                    <th><Translate id="message"></Translate></th>
                    <th><Translate id="actions"></Translate></th>
                    </tr>
                </thead>
                <tbody>

                {this.state.message.map(val =>{return(
                      <tr style={(val.viewed==0 && val.SECidUser == this.props.app.state.userLogged.idUser)?{backgroundColor:"#49c5b6"}:{}}>
                      <td>  <Link style={{textDecoration: "none"}}variant="link" to={"/Profile/"+val.idUser}>
                     <Image className="HomeCarousel-Profile-Image" src={S.baseURL()+"public/anexes/profiles/"+((val.fileName!="")?val.fileName:"default_user_pic.jpg")} style={{height: "32px",width: "32px"}} roundedCircle/>{val.nameUser}
                     </Link>
                      </td>   
                      <td>  <Link style={{textDecoration: "none"}}variant="link" to={"/Profile/"+val.SECidUser}>
                     <Image className="HomeCarousel-Profile-Image" src={S.baseURL()+"public/anexes/profiles/"+((val.fileName!="")?val.SECfileName:"default_user_pic.jpg")} style={{height: "32px",width: "32px"}} roundedCircle/>{val.SECnameUser}
                     </Link>
                      </td>                  
                      <td>{val.valueText}</td>
                      <td>{(val.SECidUser == this.props.app.state.userLogged.idUser)?
                                ((val.viewed==0)?
                                    (()=>{return(<>
                                                    <button className="Message-Reply-Button" onClick={()=>{this.handleReply(val.idUser)}}><Translate id="Reply"></Translate></button>
                                                    <button className="Message-Reply-Button" onClick={()=>{this.handleViewing(val.idMessage)}}><Translate id="View"></Translate></button>
                                                </>)})()//self executing
                                    :(()=>{return(<>
                                        <button className="Message-Reply-Button" onClick={()=>{this.handleReply(val.idUser)}}><Translate id="Reply"></Translate></button>
                                        <button className="Message-Viewed-Button" disabled><Translate id="Viewed"></Translate></button>
                                    </>)})()//self executing
                                    
                                )
                                :((val.viewed==0)?
                                    (()=>{return(<b><Translate id = "Not Read"></Translate></b>)})()//self executing
                                    :(()=>{return(<b><Translate id = "Read"></Translate></b>)})()//self executing
                                )
                            }</td>
                      </tr>

                      );})}
                </tbody>
            </Table>
            </Row>
            <MessageModal app={this.props.app} parent={this} closer={this.handleModalClose}/>
            </>
        );
        
    }

}

export default withCookies(withLocalize(NotificationHubView));
