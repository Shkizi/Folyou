//place for all the portfolios


import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Container, Row, Table } from 'react-bootstrap';
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
        message:{}
      }
      
    //request example
    componentDidMount() {
        const {cookies}= this.props.cookies;
        if(isCookieValid(cookies,"folyou_userId")){
            
            S.getNotificationsByUserId(cookies["folyou_userId"])
            .then(res => {
                if(!res.data.error){
            const notifications = res.data.notifications;
            console.log(res);
            this.setState({ notifications });
                }else{
                   var error=true;
                    var message=res.data.error;
                    this.setState( {error} );
                    this.setState( {message} );
                }
            });
        }else{ 
            var error=true;
            var message="pleaseLogin";
            this.setState( {error} );
            this.setState( {message} );
        }
        
    }
  
    render() {
        const {cookies}= this.props.cookies;
        
     /*   
           return (!isCookieValid(cookies,"folyou_userId"))?(<PleaseLogin/>):(
        <Row style={{margin: 0}}>
        <Table responsive>
            <thead>
                <tr>
                <th>#</th>
                </tr>
            </thead>
            <tbody>
           
                <tr>
                <td>SSSS</td>
                </tr>
            </tbody>
            </Table>
        </Row> */

        return (
            <Row style={{margin: 0}}>
            <Table striped bordered hover className="Notifications-Message-Table">
                <thead>
                    <tr>
                    <th><Translate id="message origin"></Translate></th>
                    <th><Translate id="message"></Translate></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Jacob</td>
                    <td>{"aaaaaaaaaaaaac".substring(0,15)+(("aaa" > 2)?"...":"")}</td>

                    </tr>
                    <tr>
                    <td>Mark</td>
                    <td>{"bbbbbbbbbbbbbbbbb".substring(0,5)+(("aaa" > 2)?"...":"")}</td>

                    </tr>
                    <tr>
                    <td>Larry</td>
                    <td>{"ccccccccccccccccccccc".substring(0,2)+(("aaa" > 2)?"...":"")}</td>
                    </tr>
                </tbody>
            </Table>
            </Row>
        );
        
    }

}

export default withCookies(withLocalize(NotificationHubView));
