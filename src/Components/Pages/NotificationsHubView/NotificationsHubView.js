//place for all the portfolios


import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Container, Row, Table } from 'react-bootstrap';
import { Carousel, Image} from 'react-bootstrap';

import {  Link } from "react-router-dom";
import { withLocalize, Translate } from "react-localize-redux";
import isCookieValid from '../../../cookies.js';
import ServicesAPI from '../../../serviceAPI.js';

import { withCookies } from 'react-cookie';
import PleaseLogin from '../../Elements/PleaseLogin/PleaseLogin.js';

var S = new ServicesAPI();

class NotificationHubView extends React.Component {
    state = {
        notifications:[],
        error:false,
        redirect:false,
        message:[],
        user:{}
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
            <Row style={{margin: 0}}>
            <Table striped bordered hover className="Notifications-Message-Table">
                <thead>
                    <tr>
                    <th><Translate id="message origin"></Translate></th>
                    <th><Translate id="message"></Translate></th>
                    <th><Translate id="actions"></Translate></th>
                    </tr>
                </thead>
                <tbody>

                {this.state.message.map(val =>{return(
                      <tr style={(val.viewed==0)?{backgroundColor:"#49c5b6"}:{}}>
                      <td>  <Link style={{textDecoration: "none"}}variant="link" to={"/Profile/"+val.idUser}>
                     <Image className="HomeCarousel-Profile-Image" src={S.baseURL()+"public/anexes/profiles/"+((val.fileName!="")?val.fileName:"default_user_pic.jpg")} style={{height: "32px",width: "32px"}} roundedCircle/>{val.nameUser}
                     </Link>
                      </td>                  
                      <td>{val.valueText}</td>
                      <td>reply, {(val.viewed==0)?"mark as viewed":"V viewed"}</td>
                      </tr>

                      );})}


                    
                </tbody>
            </Table>
            </Row>
        );
        
    }

}

export default withCookies(withLocalize(NotificationHubView));
